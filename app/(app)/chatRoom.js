import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MessageList from '../../components/MessageList'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontAwesome } from '@expo/vector-icons'
import { getRoomId } from '../../utils/common'
import { AuthContext } from '../../context/authContext'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

export default function ChatRoom() {
    const router = useRouter()
    const { values } = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const scrollRef = useRef(null)
    const inputRef = useRef(null)
    const user = useLocalSearchParams()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        createRoomHandler()
        const roomId = getRoomId(values?.user?.userId, user?.userId)

        const docRef = doc(db, "rooms", roomId)
        const messageRef = collection(docRef, "messages")
        const q = query(messageRef, orderBy('createdAt', "asc"))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => doc.data())
            setMessages([...allMessages])
        })
        const keyboardOpen = Keyboard.addListener("keyboardDidShow", updatScrollToEnd)
        return () => {
            keyboardOpen.remove()
            unsub()
        }
    }, [])


    const createRoomHandler = async () => {
        const roomId = getRoomId(values?.user?.userId, user?.userId)
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }
    const messageHandler = async () => {
  
        if (!message) {
            alert("Please enter a message")
        } else {
            try {
                //close the keyboard
                inputRef.current?.clear()

                Keyboard.dismiss()
                const roomId = getRoomId(values?.user?.userId, user?.userId)
                const docRef = doc(db, "rooms", roomId)
                const messageRef = collection(docRef, "messages")

                const newDoc = await addDoc(messageRef, {
                    userId: values?.user?.userId,
                    text: message,
                    url: values?.user?.url,
                    senderName: values?.user?.username,
                    createdAt: Timestamp.fromDate(new Date())
                })

                setMessage("")

            } catch (error) {
                console.log(error, "error")

            }
        }
    }
    useEffect(() => {
        updatScrollToEnd()
    }, [messages])

    function updatScrollToEnd() {
        if (scrollRef?.current) {
            setTimeout(() => {
                scrollRef.current.scrollToEnd({ animated: true })
            }, 100);
        }
    }
    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            {/* //header  */}
            <ChatRoomHeader router={router} user={user} />
            <View className="border-b border-neutral-300"></View>
            <View className="flex-1 bg-white">
                <View className="flex-1">
                    <MessageList scrollRef={scrollRef} messages={messages} currentUser={values?.user} />
                </View>
                {/* //input box  */}
                <View className="border mx-2 border-neutral-500 rounded-full p-2 flex-row" style={{ marginBottom: hp(1.5), gap: hp(2) }}>
                    <TextInput ref={inputRef} onChangeText={value => setMessage(value)} style={{ fontSize: hp(2) }} className="flex-1 px-3 " placeholder='Type somthing...' />
                    <TouchableOpacity onPress={messageHandler}>
                        <View className="bg-neutral-200 w-8 h-8 flex justify-center items-center rounded-full">
                            <Text>
                                <FontAwesome name='send' color={"#808080"} size={hp(2)} />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}