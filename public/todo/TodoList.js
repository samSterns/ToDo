import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        
        todos.forEach(todo => {
            // const props = { todo: todo, onUpdate: onUpdate, onRemove: onRemove };

            const todoItem = new TodoItem({ todo, onUpdate, onRemove });
            const todoItemDOM = todoItem.renderDOM();
            list.appendChild(todoItemDOM);
        });



        
    }
    renderHTML() {
        return /*html*/`
            <ul class="todos"></ul>
        `;
    }
}

export default TodoList;