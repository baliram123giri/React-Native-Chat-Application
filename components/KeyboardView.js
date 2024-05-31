import { ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const ios = Platform.OS === 'ios'
export default function KeyboardView({ children }) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={ios ? "padding" : "height"}>
            <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}