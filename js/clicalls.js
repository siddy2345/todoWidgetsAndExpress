import fetch from 'node-fetch';

export const showTodos = async (url) => {

    const res = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await res.json();
}

export const addTodo = async (url, data) => {

    const body = {
        todo: data,
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

export const deleteTodos = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE',
        mode:"cors",
        headers: {
            'Content-Type': 'application/json'
        }
    });

}