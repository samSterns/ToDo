// Load Environment Variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
client.connect();

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

app.get('/api/todos', async(req, res) => {

    try {
        const result = await client.query(`
            SELECT *
            FROM todos
        `);

        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.post('/api/todos', async(req, res) => {
    const todos = req.body;

    try {
        const result = await client.query(`
        INSERT INTO todos (task, complete)
        VALUES ($1, $2)
        RETURNING *; 
        `,
        [todos.task, todos.complete]);

        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.put('/api/todos/:id', async(req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        const result = await client.query(`     
        UPDATE todos
        SET    task = $2,
               complete = $3
        WHERE  id = $1
        RETURNING *;
    `, [id, todo.task, todo.complete]);

        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/todos/:id', async(req, res) => {
 
    const id = 0; 

    try {
        const result = await client.query(`
         
            DELETE FROM todos
            WHERE  id = $1
            RETURNING *;
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});