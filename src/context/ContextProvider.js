import React, { useState } from 'react';
import AppContext from '../context/index';

const ContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState('');
    const context = {
        setLoggedIn,
        loggedIn,
    };
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}
export default ContextProvider;