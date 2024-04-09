import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateOutlet = () => {
    const {user} = useAuth();
    const location = useLocation();
    return (
        user.email?<Outlet/> : <Navigate to="/" state={{from:location}} replace/>
    );
};

export default PrivateOutlet;