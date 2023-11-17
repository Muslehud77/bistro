import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateForLogin = ({children}) => {

    const {user} = useContext(AuthContext)

    if(user){
        return <Navigate to={'/'}></Navigate>
    }

    return children
};

export default PrivateForLogin;