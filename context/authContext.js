import { createContext, useEffect, useReducer } from "react";
import { UPDATE_IS_AUTHENTICATED, UPDATE_USER_INFO, initialState, reducer } from "./reducer";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [values, dispatch] = useReducer(reducer, initialState)
    const updateUserData = async (id) => {
        const docRef = doc(db, "users", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            let data = docSnap.data()
            dispatch({ type: UPDATE_USER_INFO, payload: data })
        }
    }
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: UPDATE_IS_AUTHENTICATED, payload: true })
                updateUserData(user?.uid)
            } else {
                dispatch({ type: UPDATE_IS_AUTHENTICATED, payload: false })
                dispatch({ type: UPDATE_USER_INFO, payload: null })
            }
        })
        return unsub
    }, [])
    const register = async (values) => {
        try {
            const { password, email, username, url } = values
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                url,
                userId: response?.user?.uid
            })
            return { success: true, data: response.user }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }
    const login = async (values) => {
        try {
            const { password, email } = values
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true, data: response.user }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }


    const logout = async () => {
        await signOut(auth)
    }
    return <AuthContext.Provider value={{ values, dispatch, register, logout, login }}>{children}</AuthContext.Provider>
}