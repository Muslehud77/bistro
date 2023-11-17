import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import Swal from 'sweetalert2';


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

const createUser = (email,password)=>{
    setLoading(true)
   return createUserWithEmailAndPassword(auth, email, password);
}
const login = (email,password)=>{
    setLoading(true)
   return signInWithEmailAndPassword(auth, email, password);
}
const logout = ()=>{
    setLoading(true)
    return signOut(auth).then(()=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Logged Out`,
          showConfirmButton: false,
          timer: 1500,
        });
    })
}

const googleLogin =()=>{
   return signInWithPopup(auth, googleProvider);
}

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        console.log('Current user', currentUser)
        setLoading(false)
    })
    return ()=> {
        return unsubscribe()
    } 
},[])
   
const info = {
    user,loading,createUser,login,logout,googleLogin
}


    return (
        <AuthContext.Provider value={info}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;