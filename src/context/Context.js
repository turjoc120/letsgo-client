import React from 'react';
import FirebaseProvider from './FirebaseProvider';
import OrderDataProvider from './OrderDataProvider';

const Context = ({children}) => {
    return (
        <>
            <FirebaseProvider>
                <OrderDataProvider>
                    {children}
                </OrderDataProvider>
            </FirebaseProvider>
           
        </>
    );
};

export default Context;