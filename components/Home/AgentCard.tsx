import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/shared/Colors'
import { useRouter } from 'expo-router'
type Props={
    agent:Agent
}
export type Agent={
    id:number,
    name:string,
    desc:string,
    image:string,
    initialText:string,
    prompt:string,
    type:string,
    featured?:boolean
}
export default function AgentCard({agent}:Props) {
  const router = useRouter();
  return (
    <View style={{
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        minHeight:200,
        overflow:'hidden'
    }}
    >
     <View
    style={{
        padding:15
    }}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>{agent.name}</Text>
       <Text 
    numberOfLines={2}
       style={{
        color:Colors.GRAY,
        marginTop:2
       }}>{agent.desc}</Text>
     </View>
    <View style={{
        position:'absolute',
        right:2,
        bottom:2
    }}>
    {/*@ts-ignore*/ }
    <Image source={agent.image} style={{
    width:120,
    height:100,
    resizeMode:'contain'
    }}/>
    </View>
 </View>
  )
}

const styles = StyleSheet.create({})