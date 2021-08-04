import { createContext, useEffect, useState } from 'react'
import app from './firebase'

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState();

    useEffect(()=>{
        app.auth().onAuthStateChanged(res=>{
            setCurrentUser(res)
            localStorage.setItem('user', res)
        })
    }, [currentUser])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}