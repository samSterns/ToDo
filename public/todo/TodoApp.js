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

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());
        
        const list = new TodoList({ todos: [] });
        main.appendChild(list.renderDOM());
        
        console.log('trying');
        const newTodo = new AddTodo({ 
            onAdd: async todo => {
                loading.update({ loading: true });

                try {

                    const saved = await addTodo(todo);
                    console.log(saved);
                
                    const todos = this.state.todos;
                    
                    todos.push(saved);
                    list.update({ todos: todos });
                    loading.update({ loading: false });
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
        try {
            // get the types when this component first loads:
            const todos = await getTodos();
            // store on "this.state" so we can get 
            // them back for add, remove, and update:
            this.state.todos = todos;
    
            // pass the loaded todos to the component:
            list.update({ todos });
        }
        catch (err) {
            // display error
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