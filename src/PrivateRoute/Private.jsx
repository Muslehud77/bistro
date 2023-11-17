import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const {pathname} = useLocation()
    const {user,loading} = useContext(AuthContext)

    if(loading){
        return (
          <div className='h-screen flex justify-center items-center'>
            <progress className="progress w-56"></progress>
          </div>
        );
    }

    if(user){
        return children
    }

    return <Navigate state={pathname} to={'/login'}></Navigate>
};

export default Private;