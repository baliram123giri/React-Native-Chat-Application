import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash, getRoomId } from '../utils/common'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/authContext'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import moment from 'moment';
const TimeDisplay = ({ createdDate }) => {
    if(!createdDate) return null
    // Convert Firebase timestamp to JavaScript Date
    const date = new Date(createdDate.seconds * 1000 + createdDate.nanoseconds / 1000000);
  
    // Parse the date with Moment.js
    const momentDate = moment(date);
  
    // Format to show only the time
    const formattedTime = momentDate.format('HH:mm');
    return (
        <Text>{formattedTime}</Text>
    );
  };
export default function ChatItem({ item, isBorder = true }) {
    const { values } = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const router = useRouter()
    function chatHandler() {
        router.push({ pathname: "/chatRoom", params: item })
    }
    useEffect(() => {
        const roomId = getRoomId(values?.user?.userId, item?.userId)
        const docRef = doc(db, "rooms", roomId)
        const messageRef = collection(docRef, "messages")
        const q = query(messageRef, orderBy('createdAt', "desc"))
        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => doc.data())
            setMessage(allMessages[0] ? allMessages[0] : null)
        })
        return unsub
    }, [values?.user?.userId, item?.userId])

    let lastMessage = null
    if(message){
        lastMessage =  values?.user?.userId !== item?.userId ? `you: ${message.text}` : message.text
    }


    return (
        <TouchableOpacity onPress={chatHandler} style={{ gap: hp(2) }} className={`${isBorder ? "border-b border-neutral-300" : ""} flex-row items-center  pb-3 mx-2  mt-2`}>
            <Image placeholder={blurhash} transition={500} source={item?.url} className="rounded-full" style={{ height: hp(6), width: hp(6) }} />
            {/* //name and time */}
            <View className="flex-1 justify-between flex-row items-center">
                <View>
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold ">
                        {item?.username}
                    </Text>
                   { lastMessage &&<Text style={{ fontSize: hp(1.3) }} className="font-medium text-neutral-600">
                       {lastMessage}
                    </Text>}
                </View>
                <Text style={{ fontSize: hp(1.8) }} className="font-medium text-neutral-600">
                <TimeDisplay createdDate={message?.createdAt} />
                </Text>
            </View>
        </TouchableOpacity>
    )
}