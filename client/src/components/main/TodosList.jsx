import React, { useState, useEffect, useContext } from 'react';
import Todo from './Todo';
import { useTodos } from '../../hooks/todos-helpers';
import { GlobalContext } from '../../providers/GlobalProvider';

const TodosList = () => {

    const { filter, search } = useContext(GlobalContext)
    const { getTodos } = useTodos();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let controller = new AbortController();

        const ownerName = window.localStorage.getItem('username');
        
        getTodos(ownerName, controller, setTodos);

        return () => controller.abort();
    }, [getTodos])

    const renderTodos = () => {        
        return todos.filter(todo => todo.title.includes(search) && (todo.description === filter || filter === 'all'))
            .map((todo, index) => <Todo todo={ todo } key={ index }/>)
    }

    return (
        <>
            <h1 className='content_title'> Bienvenido { window.localStorage.getItem('username') }! </h1>
            <ul className='content_todos-wrapper'>
                {
                    renderTodos()
                }
            </ul>
        </>
    );
};

export default TodosList;
