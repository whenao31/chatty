import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,

    onAuthStateChanged, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup
} from 'firebase/auth'
import { auth } from '../services/firebase'

const provider = new GoogleAuthProvider()
const gitHubProvider = new GithubAuthProvider()

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const loginWithGitHub = () => signInWithPopup(auth, gitHubProvider)

    const loginWithGmail = () => signInWithPopup(auth, provider)

    const logout = () => signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ signup, login, user, logout, loading, loginWithGmail, loginWithGitHub }}>
            {children}
        </AuthContext.Provider>
    )
}