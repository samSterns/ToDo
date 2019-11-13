import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        
        const newTask = form.querySelector('input');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const newTodo = newTask.value;

            const todos = {
                task: newTodo,
                complete: false,
            };
console.log(todos);
            try {
                await onAdd(todos);
                // this only runs if no error:
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