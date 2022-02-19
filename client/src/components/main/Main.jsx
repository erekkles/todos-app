import React from 'react';
import { useAuth } from '../../hooks/auth-helpers';
import Categories from './Categories';
import Searchbar from './Searchbar';
import TodosList from './TodosList';
import '../../stylesheets/main.css';

const Main = () => {
    const { logout } = useAuth();

    return (
        <>
            <div id="main">
                <label className='toggler_label' htmlFor="toggler_input">Toggle</label>
                <input type='checkbox' className='toggler_input' id='toggler_input'/>
                
                <div className='main_wrapper'>
                    <aside className='main_wrapper-aside'>
                        <div>
                            <Searchbar />
                            <Categories />
                        </div>
                        <button onClick={() => logout()}>Cerrar sesión</button>
                    </aside>

                    <main className='main_wrapper-content'>
                        {
                            <TodosList />
                        }
                        <button onClick={() => window.location.href = '/create'}>Add new todo</button>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Main
