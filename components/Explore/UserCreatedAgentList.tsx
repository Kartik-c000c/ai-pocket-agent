import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestoreDb } from '@/config/FirebaseConfig'
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { ArrowRight, Trash2 } from 'lucide-react-native'
import Colors from '@/shared/Colors'
import { useRouter } from 'expo-router'

type Agent = {
  agentName: string
  agentId: string
  prompt: string
  emoji: string
}

export default function UserCreatedAgentList() {
  const { user } = useUser()
  const [agentList, setAgentList] = useState<Agent[]>([])
  const router = useRouter()

  useEffect(() => {
    if (user) GetUserAgents()
  }, [user])

  const GetUserAgents = async () => {
    const q = query(
      collection(firestoreDb, 'agents'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
    )

    const querySnapshot = await getDocs(q)
    const agents: Agent[] = []

    querySnapshot.forEach((docSnap) => {
      agents.push({
        ...(docSnap.data() as Omit<Agent, 'agentId'>),
        agentId: docSnap.id,
      })
    })

    setAgentList(agents)
  }

  // 🔴 DELETE AGENT
  const handleDelete = (agentId: string) => {
    Alert.alert(
      'Delete Agent',
      'Are you sure you want to delete this agent?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteDoc(doc(firestoreDb, 'agents', agentId))
            setAgentList((prev) =>
              prev.filter((agent) => agent.agentId !== agentId)
            )
          },
        },
      ]
    )
  }

  return (
      <View style={{flex:1, marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>
          My Agents
        </Text>

        <FlatList
          data={agentList}
          keyExtractor={(item) => item.agentId} 
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/chat',
                  params: {
                    agentName: item.agentName,
                    initialText: '',
                    agentPrompt: item.prompt,
                    agentId: item.agentId
                  },
                })
              }
              onLongPress={() => handleDelete(item.agentId)} // 🔥 DELETE
            > 
              <Text style={styles.name}>{item.agentName}</Text>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <ArrowRight />
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No agents created yet</Text>
          }
        />
      </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: Colors.GRAY,
  },
})
