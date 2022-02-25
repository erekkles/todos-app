import React, { useState } from 'react';
import { useTodos } from '../../hooks/todos-helpers';
import { useAuth } from '../../hooks/auth-helpers';
import '../../stylesheets/todo_card.css';

const Todo = ({ todo }) => {
    
    const { title, isCompleted } = todo;
    const [isCompletedStatus, setIsCompletedStatus] = useState(isCompleted);
    const { saveTodoStatus } = useTodos();
    const { logout } = useAuth();

    const checkTodo = async (e) => {
        const ownerName = window.localStorage.getItem('username');

        setIsCompletedStatus(!isCompletedStatus);
        const statusStored = await saveTodoStatus({ownerName, title});

        if(statusStored) return alert('Status stored!')
        
        logout();
    }

    return (
        <li className='card_wrapper'>
            <div className='card_wrapper-information'>
                <div className={`information_checkbox ${isCompletedStatus ? `checked` : ``}`} onClick={(e) => checkTodo(e)}></div>
                <p className={`information_title ${isCompletedStatus ? `text_disabled` : ``}`}>{ title }</p>
            </div>
        </li>
    )
}

export default Todo
