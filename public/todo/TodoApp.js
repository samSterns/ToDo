import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('.main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());
        
        const list = new TodoList({ todos: [] });
        main.appendChild(list.renderDOM());
       
        const newTodo = new AddTodo({ 
            onAdd: async todo => {
                loading.update({ loading: true });

                try {
                    const saved = await addTodo(todo);

                    const todos = this.state.todos;
                    todos.push(saved);
                    list.update({ todos: todos });
                    // loading.update({ loading: false });
                }
                catch (err) {
                    console.log('loading of todo list failed', err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
          
        });
        dom.appendChild(newTodo.renderDOM());

        const todoList = new TodoList({ 
            todos: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const updated = await updateTodo(todo);
                    
                    // part 2: integrate back into our list
                    const todos = this.state.todos;
                    // find the index of this todo:
                    const index = todos.indexOf(todo);
                    // replace with updated object from server:
                    todos.splice(index, 1, updated);

                    // part 3: tell component to update
                    todoList.update({ todos });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            onRemove: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    await removeTodo(todo.id);
                    
                    // part 2: integrate back into our list
                    const todos = this.state.todos;        
                    // find the index of this todo:
                    const index = todos.indexOf(todo);
                    // remove from the list
                    todos.splice(index, 1);
    
                    // part 3: tell component to update
                    todoList.update({ todos });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(todoList.renderDOM());

        try {
            const todos = await getTodos();
            this.state.todos = todos;
            list.update({ todos });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }
    
    renderHTML() {
        return /*html*/`
        <div>
        <p class="error"></p>
        <main class="main"></main>
        </div>
        `;
    }
    
}

export default TodoApp;