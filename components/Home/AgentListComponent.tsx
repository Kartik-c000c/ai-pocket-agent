import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Agents } from '@/shared/AgentList'
import AgentCard from './AgentCard'
import NonFeaturedAgentCard from '../NonFeaturedAgentCard';
import {  useRouter } from 'expo-router';



export default function AgentListComponent({ isFeatured }: any) {
  const router = useRouter();
  const filteredAgents = Agents.filter(
    (agent) => agent.featured === isFeatured
  );

  return (
    <View>
      <FlatList
        data={filteredAgents}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ flex: 1, padding:5 }}
          onPress={()=>router.push({
          pathname:'/chat',
          params:{
          agentName:item.name,
          initialText:item.initialText,
          agentPrompt:item.prompt,
          agentId:item.id
      }
    }as any)}
          >
             {isFeatured ? (
              <AgentCard agent={item} />
            ) : (
              <NonFeaturedAgentCard agent={item} />
            )}
             
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
