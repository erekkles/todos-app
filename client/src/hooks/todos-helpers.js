import React, { useContext, createContext } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';
import axios from 'axios';

const api = axios.create({ withCredentials: true });

const todosContext = createContext();

const TodosProvider = ({ children }) => {
    const useTodos = useProviderTodos();
    return <todosContext.Provider value={useTodos}>{ children }</todosContext.Provider>
};

export const useTodos = () => {
    return useContext(todosContext);
}

function useProviderTodos() {
    const { svBaseUrl } = useContext(GlobalContext);

    const getTodos = async (ownerName, controller, fn) => {   

        const permission = { headers: { 'Authorization': window.localStorage.getItem('ACCESS_TOKEN') }};
        
        try {
            const res = await api.post(`${svBaseUrl}/api/todos/getTodos`, { ownerName }, {...permission, signal: controller.signal });
            fn(res.data);
        } catch (error) {
            console.info(error)
        }
    }

    const saveTodoStatus = async (data) => {

        const permission = { headers: { 'Authorization': window.localStorage.getItem('ACCESS_TOKEN') }};

        const { title, ownerName } = data;

        try {
            const res = await api.patch(`${svBaseUrl}/api/todos/changeStatus`, { ownerName, title }, permission);
            if(res && res.status === 200) return true;
        } catch (error) {
            return false;            
        }
    }

    const createTodo = async (todo) => {

        const permission = { headers: { 'Authorization': window.localStorage.getItem('ACCESS_TOKEN') }};

        try {
            const { ownerName, title, category, isCompleted } = todo;
            
            const res = await api.post(`${svBaseUrl}/api/todos/createTodo`, { ownerName, title, description: category, isCompleted }, permission);

            if(res && res.status === 200) return true;
        } catch (error) {
            return false;        
        }
    }

    return {
        getTodos,
        saveTodoStatus,
        createTodo
    }
}

export default TodosProvider;