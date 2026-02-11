import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/shared/Colors'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'

export default function CreateAgentBanner() {
  const router=useRouter()
  return (
    <View
     style={{
       backgroundColor:'#5AE3C0',
       borderRadius:15,
       padding:5,
       marginHorizontal:8,
       display:'flex',
       flexDirection:'row'

     }}
    >
      <Image source={require('./../../assets/images/ag2.png')}
      style={{
        width:200,
        height:150,
        resizeMode:'contain'
      }}/>
      <View style={{
        padding:10,
        width:180
      }}>
        <Text style={{
            fontSize:16,
            fontWeight:'bold',
            color:Colors.BLACK,
            marginTop:20
        }}>Create Your Own Agent</Text>
      <TouchableOpacity style={{
        backgroundColor:Colors.WHITE,
        padding:5,
        borderRadius:5,
        width:100,
        marginTop:10
      }}
     //@ts-ignore
     onPress={() => router.push('/create-agent')}

      >
        <Text style={{
          fontWeight:'bold'
        }}>Create now </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})