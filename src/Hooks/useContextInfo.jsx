import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useContextInfo = () => {
    const data = useContext(AuthContext)
    return data
};

export default useContextInfo;