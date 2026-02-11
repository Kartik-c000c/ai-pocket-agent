// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { firestoreDb } from '@/config/FirebaseConfig'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import { useUser } from '@clerk/clerk-expo'
// import { MessageCircle } from 'lucide-react-native'
// import Colors from '@/shared/Colors'
// import { useRouter } from 'expo-router'

// type History = {
//   agentId: number
//   agentName: string
//   agentPrompt: string
//   messages: any[]
//   lastModified: any
// }

// export default function History() {
//   const { user } = useUser()
//   const router = useRouter()
//   const [historyList, setHistoryList] = useState<History[]>([])

//   useEffect(() => {
//     if (user) {
//       GetChatHistory()
//     }
//   }, [user])

//   const GetChatHistory = async () => {
//     const q = query(
//       collection(firestoreDb, 'chats'),
//       where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
//     )

//     const querySnapshot = await getDocs(q)

//     const list: History[] = []
//     querySnapshot.forEach((doc) => {
//       // @ts-ignore
//       list.push(doc.data())
//     })

//     setHistoryList(list)
//   }
//   const OnClickHandle=(item:History)=>{
//      router.push({
//         pathname:'/chat',
//         params:{
//             agentName:item.agentName,
//             initialText:'',
//             agentPrompt:item.agentPrompt,
//             chatId:item.agentId,
//             messagesList:JSON.stringify(item.messages)
//         }
//      })
//   }

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <FlatList
//         data={historyList}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card}
//           onPress={()=>OnClickHandle(item)}
//           >
//             <MessageCircle color={Colors.PRIMARY} size={22} />

//             <View style={{ flex: 1 }}>
//               <Text style={styles.agentName}>{item.agentName}</Text>
//               <Text style={styles.message} numberOfLines={2}>
//                 {item.messages?.[item.messages.length - 1]?.content}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     gap: 10,
//     padding: 15,
//     borderWidth: 0.5,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: Colors.WHITE,
//     alignItems: 'center',
//   },
//   agentName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   message: {
//     color: Colors.GRAY,
    
//   },
// })

//---------------------------------------------------------------------------------------
// ///////////////////////////////////////
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { firestoreDb } from '@/config/FirebaseConfig'
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { MessageCircle, Trash2 } from 'lucide-react-native'
import Colors from '@/shared/Colors'
import { useRouter, useFocusEffect } from 'expo-router'

type History = {
  id: string
  agentId: number
  agentName: string
  agentPrompt: string
  messages: any[]
  updatedAt: number
}

export default function History() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [historyList, setHistoryList] = useState<History[]>([])

  /* ---------- FETCH HISTORY ---------- */
  const GetChatHistory = async () => {
    try {
      setLoading(true)

      const q = query(
        collection(firestoreDb, 'chats'),
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
      )

      const snapshot = await getDocs(q)
      const list: History[] = []

      snapshot.forEach((docSnap) => {
        const data = docSnap.data()
        list.push({
          id: docSnap.id,
          agentId: data.agentId ?? 0,
          agentName: data.agentName || 'Unnamed Agent',
          agentPrompt: data.agentPrompt || '',
          messages: data.messages || [],
          updatedAt: data.updatedAt ?? 0,
        })
      })

      // 🔥 latest chat on top (NO index needed)
      list.sort((a, b) => b.updatedAt - a.updatedAt)

      setHistoryList(list)
    } catch (err) {
      console.log('History fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  /* ---------- 🔥 AUTO REFRESH ON SCREEN FOCUS ---------- */
  useFocusEffect(
    useCallback(() => {
      if (user) {
        GetChatHistory()
      }
    }, [user])
  )

  /* ---------- OPEN CHAT ---------- */
  const onOpenChat = (item: History) => {
    router.push({
      pathname: '/chat',
      params: {
        chatId: item.id,
        agentId: item.agentId,
        agentName: item.agentName,
        agentPrompt: item.agentPrompt,
        messagesList: JSON.stringify(item.messages ?? []),
      },
    })
  }

  /* ---------- DELETE SINGLE CHAT ---------- */
  const deleteSingleChat = (item: History) => {
    Alert.alert(
      'Delete Chat',
      'This chat will be deleted permanently.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteDoc(doc(firestoreDb, 'chats', item.id))
            setHistoryList((prev) =>
              prev.filter((chat) => chat.id !== item.id)
            )
          },
        },
      ]
    )
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={historyList}
        refreshing={loading}
        onRefresh={GetChatHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onOpenChat(item)}
            onLongPress={() => deleteSingleChat(item)}
          >
            <MessageCircle color={Colors.PRIMARY} size={22} />

            <View style={{ flex: 1 }}>
              <Text style={styles.agentName}>{item.agentName}</Text>
              <Text style={styles.message} numberOfLines={2}>
                {item.messages.length
                  ? item.messages[item.messages.length - 1]?.content
                  : 'No messages yet'}
              </Text>
            </View>

            <TouchableOpacity onPress={() => deleteSingleChat(item)}>
              <Trash2 size={18} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  agentName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: Colors.GRAY,
  },
})
