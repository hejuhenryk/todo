import {getSavedTodos} from './todo_functions.js'
import {renderList, clearList} from './todo_print.js'
import {todos, dispatchAction} from './todo_app.js'

function inint(){
    getSavedTodos();
    renderList(todos)
 }

// funcja oczekujaca na dzialania 
let setUpEventListeners = function(){
    // nowy element
    document.querySelector('.new_todo').addEventListener('submit', e => {
        e.preventDefault();
        dispatchAction( {
            type: 'addTodo',
            payload: e.target.elements.newTodo.value
        } )
        e.target.elements.newTodo.value = '';

        // addTodo(e.target.elements.newTodo.value)
        // clearList()
        // renderList()
        // e.target.elements.newTodo.value = ''
    })
    // wyszukiwanie 
    document.querySelector('.search').addEventListener('input', e => {
        dispatchAction( {
            type: 'search',
            payload: e.target.value
        } )
        // todo_app.filters.searchText = e.target.value
        // todo_app.renderPs(todo_app.filterTodo())
    })
    //ukryj zrobione
    document.querySelector('#hide_complited').addEventListener('change', (e) => {
         dispatchAction( {
            type: 'hideComplited',
            payload: e.target.checked
        } )
        // todo_app.filters.hideCompleted = !todo_app.filters.hideCompleted
        // todo_app.renderPs(todo_app.filterTodo())
    })}
        
inint();
setUpEventListeners();