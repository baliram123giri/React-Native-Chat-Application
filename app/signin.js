import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/authContext'



export default function Signin() {
    const [showPass, setShowPass] = useState(true)
    const { login } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({ email: "", password: "" })
    const router = useRouter()

    function showPasswordHandler() {
        setShowPass(!showPass)
    }

    function signupHandler() {
        router.push("/signup")
    }

    //sign handlers for
    async function onSubmit() {
        if (!values?.password || !values?.email) {
            alert("Please enter your email and password!")
        } else {
            setLoading(true)
            const res = await login(values)
            setLoading(false)
            if (!res.success) {
                alert(res.msg)
            }
        }
    }
    return (
        <View className="flex-1">
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="gap-12 flex-1">
                <View className="items-center">
                    <Image resizeMode='contain' style={{ height: hp(25) }} source={require('../assets/login.png')} />
                </View>
                <View style={{ gap: hp(2) }} >
                    {/* //sign in  */}
                    <Text style={{ fontSize: hp(4) }} className="tracking-wider font-bold text-center text-neutral-800">Sign In</Text>
                    {/* //inputs  */}
                    <View style={{ height: hp(7) }} className="rounded-full px-4  py-0 flex  flex-row items-center bg-neutral-100">
                        <Octicons name="mail" size={hp(2.7)} color={"gray"} />
                        <TextInput onChangeText={(value) => setValues({ ...values, email: value })} placeholder='Email Address' className="h-full flex-1 px-3 " />
                    </View>
                    {/* //inputs  */}
                    <View style={{ height: hp(7) }} className="rounded-full px-4  py-0 flex  flex-row items-center bg-neutral-100">
                        <Octicons name="lock" size={hp(3)} color={"gray"} />
                        <TextInput onChangeText={(value) => setValues({ ...values, password: value })} secureTextEntry={showPass} placeholder='Password' className="h-full flex-1 px-3 " />
                        <Octicons onPress={showPasswordHandler} name={showPass ? "eye" : "eye-closed"} size={hp(3)} color={"gray"} />
                    </View>
                    <Text style={{ fontSize: hp(1.8) }} className="text-right text-blue-700">Forget Password ?</Text>

                    {/* //sign in button  */}
                    <TouchableOpacity onPress={onSubmit} className="bg-indigo-500 items-center justify-center  rounded-full" style={{ height: hp(6.5) }}>
                        <Text className="text-white text-center font-semibold" style={{ fontSize: hp(2.8) }}>{loading ? "Loading..." : "Sign In"}</Text>
                    </TouchableOpacity>

                    <View style={{ gap: hp(0.4) }} className="flex-row justify-center">
                        <Text style={{ fontSize: hp(1.8) }} className="text-neutral-500 font-semibold">Don't have an account?</Text>
                        <Text onPress={signupHandler} style={{ fontSize: hp(1.8) }} className="text-indigo-500 font-semibold">Sign Up</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}