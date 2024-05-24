import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";


// import { addTodo } from "./store/todoSlice";
import {fetchTodos, addNewTodo}  from "./store/todoSlice";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

import './App.css'

const App =() => {
    const [text, setText] = useState('');
    const {loading, error} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();

    const handleAction = () => {
        if (text.trim().length){
            dispatch(addNewTodo(text));
            setText('');
        }
    }

    useEffect(()=>{
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div className="App">
            <NewTodoForm
            value={text}
            updateText={setText}
            handleAction={handleAction}
            />
            {loading && <h2>Loading...</h2>}
            {error && <h2>An error: {error}</h2>}
            <TodoList/>
        </div>
    )
}


export default App;