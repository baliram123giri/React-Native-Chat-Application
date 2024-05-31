import { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import ChatList from '../../components/ChatList'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AuthContext } from '../../context/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '../../firebaseConfig'


export default function Home() {
  const [users, setUsers] = useState([1, 2, 3])
  const { values } = useContext(AuthContext)

  useEffect(() => {
    if (values?.user?.userId) {
      getUsers()
    }
  }, [values?.user?.userId])
  
  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", values?.user?.userId))
    const querySnapShot = await getDocs(q)
    let data = []
    querySnapShot.forEach(doc => {
      data.push({ ...doc.data() })
    })
    setUsers(data)
  }

  return (
    <View className="flex-1 bg-white">
      {
        users.length > 0 ? <ChatList data={users} /> : <View className="flex justify-center items-center" style={{ top: hp(40) }}>
          <ActivityIndicator size={"large"} />
        </View>
      }

    </View>
  )
}