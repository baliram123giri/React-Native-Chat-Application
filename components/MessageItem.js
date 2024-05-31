import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MessageItem({ message, currentUser }) {
    // console.log(message)
    if(currentUser?.userId === message.userId) {
        return (
            <View className="flex-row justify-end">
                <View style={{ width: wp(80) }}>
                    <Text style={{fontSize:hp(1.8)}} className="border bg-white flex self-end border-neutral-200 rounded-2xl my-2 p-2 px-3">{message?.text}</Text>
                </View>
            </View>
        )
    }
    return (
        <View className="flex-row">
            <View style={{ width: wp(80) }}>
                <Text style={{fontSize:hp(1.8)}} className="border bg-indigo-100 flex self-start border-neutral-200 rounded-2xl my-2 p-2 px-3">{message?.text}</Text>
            </View>
        </View>
    )
}