import React, { useState } from 'react';
import '../../stylesheets/login_form.css';


const Login = ({ populateFormData }) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        
        <fieldset>
            <legend>Inicio de sesión</legend>
            <p className="paragraph">
                <label htmlFor="userLogin" className="label">Nombre de usuario <abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" id="userLogin" name="userLogin" placeholder="John Doe" onChange={(e) => setUsername(e.target.value)}/>
            </p>
            <p className="paragraph">
                <label htmlFor="passwordLogin" className="label">Contraseña <abbr title="required" aria-label="required">*</abbr></label>
                <input type="password" name="passwordLogin" id="passwordLogin" onChange={(e) => setPassword(e.target.value)}/>
            </p>
            
            <button type="submit" onClick={() => populateFormData('LOGIN', { username, password })}>Enviar</button>
        </fieldset>
        
    )
}

export default Login;
