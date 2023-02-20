const form = document.querySelector('form');
        const input = document.getElementById('input');
        const todoBody = document.getElementById('todoList');
        const deleteButton = document.getElementById('delete');
        
        
const addTodo = async (url, data) => {

    const body = {
        todo: data.value,
    }


    const res = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return res;
}


form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addTodo('http://localhost:3000/todo', input);
})


const showTodos = async (url) => {


    const res = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const todos = await res.json();

    for (let i = 0; i < todos.length; i++) {
        const innerHtml = `
        <li>${todos[i]}</li>
        <!--<button class="delete" id="${i}" type="submit">Löschen</button>-->
        `;

        todoBody.innerHTML += innerHtml;    
    }
    

    return await res;
}
showTodos('http://localhost:3000/todo');

const deleteTodos = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE',
        mode:"cors",
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

deleteButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteTodos('http://localhost:3000/todo');
})