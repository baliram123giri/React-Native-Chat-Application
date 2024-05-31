import { View, Text } from 'react-native'
import React from 'react'
import { MenuOption } from 'react-native-popup-menu'

export default function CustomMenu({ value, action, text, icon }) {
    return (
        <MenuOption onSelect={action}  >
            <View className="flex-row justify-between items-center px-2 py-1">
                <Text>
                    {text}
                </Text>
                <Text>
                    {icon}
                </Text>
            </View>
        </MenuOption>
    )
}