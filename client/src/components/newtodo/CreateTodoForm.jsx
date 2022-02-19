import React, { useState } from 'react';
import { useTodos } from '../../hooks/todos-helpers';
import '../../stylesheets/todo_form.css';

const CreateTodoForm = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const { createTodo } = useTodos();

    const submit = async (e) => {
        e.preventDefault();

        if(title === '' || category === '') return alert('All fields must be specified');
        const ownerName = window.localStorage.getItem('username');

        const res = await createTodo({ ownerName, title, category, isCompleted: false });
        if(res) return alert('Todo creado satisfactoriamente')

        alert('An error has occured');
    }

    return (
        <>
            <button onClick={() => window.location.href = '/user'}>Go back</button>
            <form className='form' onSubmit={(e) => submit(e)}>
                <fieldset>
                    <legend>Add new todo</legend>
                    <p className='paragraph'>
                        <label htmlFor="todoTitle" className='label'>Todo's title <abbr title="required" aria-label="required">*</abbr></label>
                        <input type="text" id="todoTitle" name="todoTitle" placeholder="Go shopping" onChange={(e) => setTitle(e.target.value)}/>
                    </p>
                    <p className='paragraph'>
                        <label htmlFor="categorySelect" className='label'>Todo's category <abbr title="required" aria-label="required">*</abbr></label>
                        <select name="categorySelect" id="categorySelect" onChange={(e) => setCategory(e.target.value)}>
                            <option value="household">Household</option>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                    </p>
                    
                    <button type="submit">Enviar</button>
                </fieldset>
            </form>
        </>
    );
};

export default CreateTodoForm;
