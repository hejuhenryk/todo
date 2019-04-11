import {  dispatchAction } from './todo_app.js'
import { renderList } from './todo_print.js';

export const getSavedTodos = () => {
    let arr
    const todosJSON = localStorage.getItem(`todos`);
    if (todosJSON !== null){
        arr = JSON.parse(todosJSON);
    } else {
        arr = [];
    }
    dispatchAction( {
        type: 'replace',
        payload: arr
    })
}

export const saveTodos = (arr) => {
    localStorage.setItem('todos', JSON.stringify(arr))
}

let subscribers = []

const subscrib = subcriber => {
    subscribers.push(subcriber)
}

export const informAll = (about) => {
    subscribers.forEach(subcriber => { 
        subcriber(about)
    });
}

subscrib(renderList)
