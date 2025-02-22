import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import axios from "axios";

export const ThemeContext = createContext(null)

const ContextApi = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const provider = new GoogleAuthProvider()
    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser)
            setLoading(false)
            const newUser = {name: currentUser.displayName, email: currentUser.email}
           const response = await axios.post('https://task-management-server-7lv2.onrender.com/add-user', newUser)
           console.log(response.data)
        })
        return () => {
            unsubscribe()
        }
    },[])

    console.log(user)
    const value = {
        signUp,
        user,
        loading,
        googleLogin,
        login
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ContextApi;