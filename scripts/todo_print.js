import { dispatchAction } from "./todo_app.js";


export const clearList = () => {
    document.querySelector('.alt_todo_lst').innerHTML = '';
}

const howManyNotDone = (arr) => {
    let left = 0;
    arr.forEach( cur => cur.status ? left = left : left ++)
    document.querySelector('.how-many-todo').textContent = `You have ${left} left`
}

export const renderList = arr => {

    clearList()
    howManyNotDone(arr)

    arr.forEach( cur => {
        const newEl = document.createElement('div')
        const textEl = document.createElement('label') 
        const buttonOuter = document.createElement('div')
        const buttonInner = document.createElement('div')
        const buttonLabel = document.createElement('label')
        const checkboxEl = document.createElement('input')

        newEl.className = 'alt_todo_items'
        checkboxEl.setAttribute('type', 'checkbox') // change input to checkbox type
        checkboxEl.setAttribute('id', `${cur.id}`)
        checkboxEl.setAttribute('name', `${cur.id}`) 
        newEl.appendChild(checkboxEl)
        checkboxEl.checked = cur.status // set checkbox to cur status (done, !done)
        checkboxEl.addEventListener('change', () => {
            dispatchAction( {
                type: 'isDone',
                payload: cur.id
            })
        })
        textEl.innerHTML = cur.todo 
        textEl.setAttribute( 'for', `${cur.id}`)
        newEl.appendChild(textEl)
        buttonOuter.className = 'outer';
        buttonInner.className = 'inner';
        buttonLabel.innerHTML = 'Remove'
        buttonInner.appendChild(buttonLabel)
        buttonOuter.appendChild(buttonInner)
        newEl.appendChild(buttonOuter)

        buttonOuter.addEventListener('click', () => { 
            dispatchAction( {
                type: 'removeTodo',
                payload: cur.id
            })
        })
        
        document.querySelector('.alt_todo_lst').appendChild(newEl)
        // if( !filters.hideCompleted  || ( !cur.status  )){
        //     document.querySelector('.alt_todo_lst').appendChild(newEl)
        // } 
                  
    })
}