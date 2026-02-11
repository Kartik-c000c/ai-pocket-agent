import { StyleSheet, Text, TouchableOpacity, View,Image,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { HeaderTitle } from '@react-navigation/elements';
import Colors from '@/shared/Colors';
import { SettingsIcon } from 'lucide-react-native';
import AgentListComponent from '@/components/Home/AgentListComponent';
import CreateAgentBanner from '@/components/Home/CreateAgentBanner';



export default function Home() {
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: () => (
             <Text style={{
                fontWeight:'bold',
                fontSize:18,
             }}>AI Pocket Agent</Text>
            ),
            headerTitleAlign:'center',
            headerLeft:() => (
                <TouchableOpacity style={{
                    marginLeft:15,
                    display:'flex',
                    flexDirection:'row',
                    gap:6,
                    backgroundColor:'#5AE3C0',
                    padding: 5,
                    paddingHorizontal:10,
                    borderRadius:5
                }}>
                    
                    
                    <Image 
                     source={require('./../../assets/images/diamond.png')}
                     style={{
                        width:20,
                        height:20
                     }}
                    />
                    <Text style={{
                        color:Colors.BLACK,
                        fontWeight:'bold',
                    }}>Pro</Text>
                </TouchableOpacity>
            ),
            headerRight:() =>(
                <SettingsIcon style={{
                    marginRight:15,

                }}/>
            )
        })
    },[])
  return (
    <FlatList
    data={[]}
    renderItem={null}
    ListHeaderComponent={()=>(
    <View>
      <AgentListComponent isFeatured={true}/>
      <CreateAgentBanner/>
      <AgentListComponent isFeatured={false}/>
    

    </View>)}
  />
  )
}

const styles = StyleSheet.create({})