import { informAll, saveTodos } from "./todo_functions.js";


export let todos = []

let filters = {
    searchText: '', 
    hideCompleted: false
}

const addTodo = (todo, arr, status = false) => {
    arr.push({
        todo: todo,
        status: status,
        id: Math.random()//uuidv4()
    })
    return arr
}

const removeTodo = (ID, arr) => {
    let index = arr.findIndex( cur => cur.id === ID)
    arr.splice(index,1)
    return arr
}

const isDone = (ID, arr) => {
    const index = arr.findIndex( cur => cur.id === ID)
    arr[index].status = !arr[index].status;
    return arr
}

const filterTodos = ( filter , arr ) => {
    const filteredTodos = arr.filter(cur => {
        return cur.todo.toLowerCase().includes(filter.toLowerCase())
    })
    return filteredTodos
}

const update = (action, Arr) => {
    // kopia
    if (action.type === "addTodo"){
        let newArr = addTodo(action.payload, Arr, false);
        saveTodos(newArr);
        return newArr
    } else if (action.type === "removeTodo") {
        let newArr = removeTodo( action.payload, Arr);
        saveTodos(newArr);
        return newArr
    } else if (action.type === "isDone") {
        let newArr = isDone( action.payload, Arr);
        saveTodos(newArr);
        return newArr
    } else if ( action.type === 'search' ) {
        return filterTodos( action.payload, Arr)
    } else if ( action.type === 'replace') {
        todos = [...action.payload]
        saveTodos(todos )
        return action.payload
    } else if ( action.type === 'hideComplited' ) {
        if ( action.payload ) return Arr.filter( cur =>  !cur.status )
        return Arr
    }
    return  null
}

export const dispatchAction = (action) => {
    const arrayToInform = update(action, todos);
    informAll(arrayToInform)
}


// addTodo('make it work', todos) 
// addTodo('make the ather thing work too', todos) 

// console.log( todos )

// isDone( todos[0].id, todos )

// console.log( todos )

// filterTodos( 'it', todos )

// console.log( filterTodos( 'it', todos ) )
