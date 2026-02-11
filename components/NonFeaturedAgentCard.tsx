import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Agent } from './Home/AgentCard'
import Colors from '@/shared/Colors'
type Props ={
    agent:Agent
}
export default function NonFeaturedAgentCard({agent}: Props) {
  return (
      <View style={{
          backgroundColor:Colors.WHITE,
          borderRadius:15,
          minHeight:180,
          overflow:'hidden'
      }}>
        <View style={{
         padding:10
      }}>
      {/*@ts-ignore*/ }
      <Image source={agent.image} style={{
      width:120,
      height:100,
      resizeMode:'contain'
      }}/>
      </View>
       <View
      style={{
          padding:20
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
   </View>
    )
  }
const styles = StyleSheet.create({})