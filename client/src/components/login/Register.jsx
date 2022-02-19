import React, { useState } from 'react';
import '../../stylesheets/login_form.css';

const Register = ({ populateFormData }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return ( 

        <fieldset>
            <legend>Registro</legend>
            <p className="paragraph">
                <label htmlFor="user" className="label">Nombre de usuario <abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" id="user" name="user" placeholder="John Doe" onChange={(e) => setUsername(e.target.value)}/>
            </p>
            <p className="paragraph">
                <label htmlFor="password" className="label">Contraseña <abbr title="required" aria-label="required">*</abbr></label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </p>
            
            <button onClick={() => populateFormData('SIGNUP', { username, password })}>Enviar</button>
        </fieldset>

    )
}

export default Register
