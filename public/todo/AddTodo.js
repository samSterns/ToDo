import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;     
        const newTask = form.querySelector('input');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const newTodo = newTask.value;

            const todo = {
                task: newTodo,
                complete: false,
            };

            try {
                await onAdd(todo);
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {

        return /*html*/`
            <form class="add-todo-form">
                <input>
                <button>Add ToDO</button>
        
            </form>
        `;
    }
}

export default AddTodo;