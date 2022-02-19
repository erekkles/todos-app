import React, { useState } from 'react';

export const GlobalContext = React.createContext({});

const GlobalProvider = ({ children }) => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('')
    const svBaseUrl = 'https://todos-mernstack-app.herokuapp.com/';

    const saveUsername = (user) =>  window.localStorage.setItem('username', user);

    return (
        <GlobalContext.Provider value={{
            svBaseUrl,
            filter, 
            setFilter,
            search, 
            setSearch,
            saveUsername
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
