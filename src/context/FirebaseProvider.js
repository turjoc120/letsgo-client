import React, { createContext } from 'react';
import useFirebase from '../customHooks/useFirebase';

export const FirebaseContext = createContext(null);

const FirebaseProvider = ({children}) => {

    const firebase = useFirebase();
    
    return (
       <FirebaseContext.Provider value={firebase}>
           {children}
       </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;