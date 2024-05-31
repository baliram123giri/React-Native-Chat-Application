import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
export default function ChatRoomHeader({ router, user }) {
    return (
        <Stack.Screen
            options={{
                title: "",
                headerShadowVisible:false,
                headerLeft: () => (
                    <View style={{ gap: hp(2) }} className="flex-1 flex-row items-center">
                        <Ionicons
                            onPress={() => router?.back()}
                            name="chevron-back"
                            size={hp(3)}
                        />
                        <View className="flex-row items-center" style={{ gap: hp(2) }}>
                            <Image placeholder={blurhash} source={user?.url} style={{ height: hp(4), width: hp(4), borderRadius: 100 }} />
                            <Text className="font-semibold" style={{ fontSize: hp(2.2) }}>{user?.username}</Text>
                        </View>
                    </View>
                ),
                headerRight: () => <View style={{gap:hp(2)}} className="flex-row ">
                    <Text>
                        <MaterialIcons name="phone" size={hp(3.5)} />
                    </Text>
                    <Text>
                        <MaterialIcons name="videocam" size={hp(3.5)} />
                    </Text>
                </View>
            }}
        />
    );
}
