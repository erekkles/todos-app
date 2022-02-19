import React, {useContext, createContext } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';
import axios from 'axios';

const api = axios.create({ withCredentials: true });

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProviderAuth();
    return <authContext.Provider value={auth}>{ children }</authContext.Provider>
};

export const useAuth = () => {
    return useContext(authContext);
}

function useProviderAuth() {
    const { svBaseUrl } = useContext(GlobalContext)

    const signin = async (user) => {
        const { username, password } = user;

        if((username === '' && password === '') || (username === null && password === null)) return alert('No information provided');

        try {
            const res = await api.post(`${svBaseUrl}/api/users/login`, user);

            if(res.status !== 200) return alert('Not logged in!')

            alert('Logged in!')
            // store token received on response's authorization header on localstorage
            if(!window.localStorage.getItem('ACCESS_TOKEN')) window.localStorage.setItem('ACCESS_TOKEN', res.headers.authorization);
            window.location.href = '/user';
        } catch (error) {
            console.error(error.message);
            alert('Wrong credentials')
        }

        return username;
    }

    const signup = async (user) => {
        const { username, password } = user;

        if((username === '' && password === '') || (username === null && password === null)) return alert('No information provided');

        try {
            const res = await api.post(`${svBaseUrl}/api/users/signup`, user);

            if(res.status !== 200) return alert('An error happened')

            alert('Registered!')
        } catch (error) {
            console.error(error.message);
            alert('Wrong credentials')
        }

    }

    
    const isAuth = fn => async (controller) => {
        const token = window.localStorage.getItem('ACCESS_TOKEN');
        
        try {
            const auth = await api.post(`${svBaseUrl}/api/users/isauth`, null, { 
                headers: { 'Authorization': token }, 
                signal: controller.signal 
            });

            if(auth.status === 200) return fn();
        } catch (error) {
            if(error.message.includes('401')) {
                logout();            
            }
        }
    }
    
    const logout = () => {
        window.localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/';
    }
    
    return {
        signin, 
        signup,
        logout,
        isAuth
    }
}

export default AuthProvider;