import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth-helpers';

const ProtectedRoute = ({ component }) => {
    const [isAuthState, setIsAuthState] = useState(null);
    const { isAuth } = useAuth();

    useEffect(() => {
        let controller = new AbortController();

        /* 
        If client isn't auth, the hook will automatically send you to homepage. 
        isAuth takes the action -a function- to be performed once auth is verified, 
        returns an asynchronous function that will take in a controller whose signal will match the 
        abort method on the cleanup function. 
        */
        isAuth(() => setIsAuthState(true))(controller);

        return () => controller.abort();
    })


    return (
        <>
        {
            isAuthState
            ?
            component 
            : 
            null
        }
        </>
    );
}

export default ProtectedRoute;
