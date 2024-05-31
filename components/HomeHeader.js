
import { AntDesign, Octicons } from '@expo/vector-icons'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import CustomMenu from './CustomMenu'
import Divider from './Divider'
const ios = Platform.OS === 'ios'
export function HomeHeader() {
    const { values, logout } = useContext(AuthContext)
    const { top } = useSafeAreaInsets()

    function profileHandler() {

    }


    return <View className="flex-row justify-between pb-6 px-5 items-center shadow-md shadow-black bg-indigo-500 rounded-b-3xl" style={{ gap: hp(1), paddingTop: ios ? top : top + 10 }}>
        <View >
            <Text style={{ fontSize: hp(3.5) }} className="text-white">Chat</Text>
        </View>
        <View>
            <Menu >
                <MenuTrigger  >
                    <Image
                        style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                        source={values?.user?.url}
                        placeholder={{ blurhash }}
                        transition={500}
                    />
                </MenuTrigger>
                <MenuOptions customStyles={{
                    optionsContainer:{
                        borderRadius:12,
                        width:wp(35),
                        marginTop:hp(5),
                        marginLeft:hp(-2.2),
                        shadowOpacity:0.5,
                        backgroundColor:"white"
                    }
                }}>
                    <CustomMenu action={profileHandler} text={"Profile"} icon={<AntDesign size={hp(2.3)} name='user' />} />
                    <Divider />
                    <CustomMenu action={logout} text={"Sign Out"} icon={<AntDesign size={hp(2)} name='logout' />} />
                </MenuOptions>
            </Menu>

        </View>
    </View>
}