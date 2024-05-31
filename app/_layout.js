import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { AuthContext, AuthContextProvider } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
    const { values } = useContext(AuthContext)
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        if (typeof values?.isAuthenticated === null) return
        const inApp = segments[0] === "(app)"
        if (values?.isAuthenticated && !inApp) {
            //redirect to the home
            router.replace("home")
        } else if (values?.isAuthenticated === false) {
            router.replace("signin")
        }
    }, [values?.isAuthenticated])

    return <Slot />
}

export default function _layout() {

    return (
        <AuthContextProvider>
            <MenuProvider>
                <MainLayout />
            </MenuProvider>
        </AuthContextProvider>
    )
}