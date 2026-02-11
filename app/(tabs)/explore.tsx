import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateAgentBanner from '@/components/Home/CreateAgentBanner'
import AgentListComponent from '@/components/Home/AgentListComponent'
import UserCreatedAgentList from '@/components/Explore/UserCreatedAgentList'

export default function Explore() {
  return (
    <FlatList
      data={[1]} // dummy data
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}
      renderItem={null}
      ListHeaderComponent={
        <>
          <CreateAgentBanner />
          <UserCreatedAgentList />
          <Text style={styles.title}>Featured Agent</Text>
          <AgentListComponent isFeatured={true} />
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 10,
  },
})

