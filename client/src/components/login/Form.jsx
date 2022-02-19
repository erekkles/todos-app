import React, { useContext, useState } from 'react';
import '../../stylesheets/login_form.css';
import Login from './Login';
import Register from './Register';
import { useAuth } from '../../hooks/auth-helpers';
import { GlobalContext } from '../../providers/GlobalProvider';

const Form = () => {

    const { signin, signup } = useAuth();
    const { saveUsername } = useContext(GlobalContext);
    const [action, setAction] = useState();
    const [data, setData] = useState({});

    const submitForm = async (e) => {
        e.preventDefault();

        switch(action) {
            default:
                alert('Operation not allowed');
                break;
            case 'LOGIN':
                const user = await signin(data)
                saveUsername(user);
                break;
            case 'SIGNUP':
                await signup(data);
                break;
        }        
    }

    const populateFormData = (action, userData) => {
        setAction(action);
        setData(userData);
    }
    
    return (
        <form className="form" onSubmit={(e) => submitForm(e)}>
            <Login populateFormData={ populateFormData } />
            <Register populateFormData={ populateFormData } />
        </form>
    )
}

export default Form
