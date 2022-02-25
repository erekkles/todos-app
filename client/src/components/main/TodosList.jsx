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

    const renderTitle = () => {
        switch(filter){ 
            case 'all': return 'All tasks';
            case 'personal': return '👤 Personal';
            case 'work': return '👨‍⚖️ Work';
            case 'household': return '🏡 Home';
            case 'groceries': return '🥦 Groceries';
            case 'movies': return '🍿 Movies to watch';
            case 'gaming': return '🎮 Games to play';
            case 'restaurants': return '🍟 Places to eat';
            default: return 'Loading...';
        }
    }

    return (
        <>
            <h1 className='content_title'> { renderTitle() } </h1>
            <ul className='content_todos-wrapper'>
                {
                    renderTodos()
                }
            </ul>
        </>
    );
};

export default TodosList;
