import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '@/shared/Colors';
import { firestoreDb } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { doc, setDoc } from 'firebase/firestore';

export default function CreateAgent() {

  const navigation = useNavigation();

  // ✅ Hooks INSIDE component
  const [agentName, setAgentName] = useState<string>('');
  const [instruction, setInstruction] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {user} = useUser();
  const router= useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Create Agent'
    })
  }, [])

  const CreateNewAgent =async () => {
    if (!agentName.trim() || !instruction.trim()) {
      Alert.alert('Please enter all details')
      return;
    }
    const agentId = Date.now().toString()
    await setDoc(doc(firestoreDb,'agents',agentId),{
      agentName:agentName,
      agentId:agentId,
      prompt:instruction,
      userEmail:user?.primaryEmailAddress?.emailAddress
    });
    Alert.alert("Confirmation",'Agent Created succesfully!',
      [
        {
          text:'ok',
          onPress:()=>console.log('ok'),
          style:'cancel'
        },{
          text:'Try Now',
          onPress:()=>router.push({
            pathname:'/chat',
            params:{
              agentName:agentName,
              initialText:'',
              agentPrompt:'instruction',
              agentId:agentId,
            }
          })
        }

      ]
    );
    setAgentName('');
    setInstruction('')
  }

  return (
    <View style={{ padding: 20 }}>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#D3D3D3',
          backgroundColor: Colors.WHITE
        }}>
          <Text style={{ fontSize: 30 }}>🤖</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Agent / Assistant Name</Text>
        <TextInput
          placeholder="Agent name"
          style={styles.input}
          value={agentName}
          onChangeText={setAgentName}
        />
      </View>

      <View style={{ paddingTop: 15 }}>
        <Text>Instruction</Text>
        <TextInput
          placeholder="Ex. You are a professional physics teacher"
          style={[styles.input, { height: 170, textAlignVertical: 'top' }]}
          multiline
          value={instruction}
          onChangeText={setInstruction}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.BLACK,
          marginTop: 15,
          borderRadius: 15
        }}
        onPress={CreateNewAgent}
      >
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
          fontSize: 18
        }}>
          Create Agent
        </Text>
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginTop: 5
  }
})
