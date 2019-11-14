import Component from '../Component.js';


class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        console.log(this.props)
        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', async () => {
            todo.inactive = !todo.inactive;
            await onUpdate(todo);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const confirmed = confirm(`Are you sure you want to remove "${todo.task}"?`);
            if (confirmed) {
                onRemove(todo);
            }
        });
    }

    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
            <div>
                <button class="inactive-button">Make ${todo.inactive ? 'Active' : 'Inactive'}</button>
                <ul class="todos">${JSON.stringify(this.props.todo)}</ul>        
                <button class="remove-button">🗑</button>
            </div>
        `;
    }
}

export default TodoItem;