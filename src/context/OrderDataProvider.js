import React, { createContext, useState } from 'react';

export const OrderDataContext = createContext(null);

const OrderDataProvider = ({children}) => {
    
    const [orderData, setOrderData] = useState({});

    return (
       <OrderDataContext.Provider value={{orderData, setOrderData}}>
           {children}
       </OrderDataContext.Provider>
    );
};

export default OrderDataProvider;