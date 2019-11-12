import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const todos = this.props.todos;
        console.log(todos, 'hi dirt');
        todos.forEach(todo => {
            const props = { todo: todo };
            const todoItem = new TodoItem(props);
            const todoItemDOM = todoItem.renderDOM();
            list.appendChild(todoItemDOM);
        });

        // const onUpdate = this.props.onUpdate;
        // const onRemove = this.props.onRemove;

        
    }
    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default TodoList;
