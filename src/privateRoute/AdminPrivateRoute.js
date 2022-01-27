import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import CircularLoader from '../customComponent/circularLoader/CircularLoader';
import { FirebaseContext } from '../context/FirebaseProvider';

const AdminPrivateRoute = ({children}) => {
    const {admin, adminIsLoading} = useContext(FirebaseContext);
    const location = useLocation();
    console.log(admin);

    if(adminIsLoading) {
        return <CircularLoader/>
    }

    if(!admin.isAdmin) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children;
};

export default AdminPrivateRoute;