import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

export default function ChatList({ data = [] }) {
    return (
        <View className="flex-1 ">
            <FlatList
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={data}
                renderItem={({ item, index }) => <ChatItem isBorder={(data?.length - 1 !== index)} item={item} index={index} />}
            />
        </View>
    );
}
