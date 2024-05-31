import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({messages=[], scrollRef, currentUser}) {
    return (
        <ScrollView ref={scrollRef}  showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingTop:10, paddingHorizontal:10}}>
            {messages?.map((message, index)=> <MessageItem message={message} key={index} currentUser={currentUser}/>)}
        </ScrollView>
    )
}