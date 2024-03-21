import { StyleSheet, Text, View,ScrollView,Pressable,Dimensions,Image,Button } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addEvolution,addPoke,fetchPokebyID,clearEvolution } from '../store/data';
import PokeItem from "./PokeItem";
import { useNavigation } from '@react-navigation/native'

export default function PokeEvolution({route}) {

    const evolution = useSelector(state => state.pokemon.pokeEvolution)
   
    const Url1=route.params.Url1
    const Url2=route.params.Url2
    const Url3=route.params.Url3
    
    const [poke1, setPoke1] = useState({})
    const [poke2, setPoke2] = useState({})
    const [poke3, setPoke3] = useState({})
    const [changement, setChangement] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(clearEvolution())  
        dispatch(fetchPokebyID(Url1)).then(response => setPoke1(response.payload))
        dispatch(fetchPokebyID(Url2)).then(response => setPoke2(response.payload))
        dispatch(fetchPokebyID(Url3)).then(response => setPoke3(response.payload))    
        setTimeout(() => {
            setChangement(true)
            console.log(Url1);
    console.log(poke1.name);
    console.log(poke2.name);
    console.log(poke3.name);
    dispatch(addEvolution(poke1))
    dispatch(addEvolution(poke2))
    dispatch(addEvolution(poke3))
    
          }, 1500);
        
    }, [changement])

   function test(){
  
    
    
 
   
   }
   
  
    const navigation = useNavigation()
    const cardGap = 16;
 

    const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
    
  return (
    <View>

      {evolution? <ScrollView style={styles.container_secondary}>
                
               
                <View style={styles.container}>
                
              {evolution.map((evolution,i) => <View key={i}><Pressable style={{marginTop: cardGap,
          margin: 10,
          width: cardWidth,
          height: 180,
          backgroundColor: 'white',
          borderRadius: 30,
          shadowOpacity: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#3B4CCA',
          borderWidth: 5,
          borderRadius: 25,}} onPress={()=> navigation.navigate("PokeList")}><Image
              style={styles.tinyLogo}
              source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id}.png`,
              }}
          /><View><Text>{evolution.name}</Text></View></Pressable></View>)}
             </View>
        </ScrollView> :     <ActivityIndicator size="large" color="#00ff00" /> }
       
        </View>

)
}

const styles = StyleSheet.create({tinyLogo: {
  width: 150,
  height: 150,
},
container :{
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  backgroundColor:'#CC0000'
},})