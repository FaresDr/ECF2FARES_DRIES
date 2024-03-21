import { StyleSheet, Text, View,ScrollView,Image,Pressable,Dimensions,Button } from 'react-native'
import { useEffect, useState } from "react";
import React from 'react'
import { fetchPoke,clearPokedex } from "../store/data";
import PokeItem from './PokeItem'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native'

export default function PokedexScreen() {
    const pokedex = useSelector(state => state.pokemon.pokedex)
  
    const dispatch = useDispatch()
  
    
    // useEffect(() => {       
    //     dispatch(fetchPoke())       
                 
    // },[])
    const navigation = useNavigation()
    const cardGap = 16;
    

    const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
  return (
    <View>
      <View>
        <Button title='Vider le pokédex' onPress={()=> (dispatch(clearPokedex()))}></Button>
              
              {pokedex? <ScrollView style={styles.container_secondary}>
                
               
                  <View style={styles.container}>
                  
                {pokedex.map((pokedex,i) => <View><Pressable style={{marginTop: cardGap,
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
            borderRadius: 25,}} onPress={()=> navigation.navigate("PokeDetail" , {poke : pokedex})}><Image
                style={styles.tinyLogo}
                source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedex?.id}.png`,
                }}
            /><View><Text>{pokedex.name}</Text></View></Pressable></View>)}
                </View>
          </ScrollView> : <View><ActivityIndicator size="small" color="#0000ff" /></View> }
          </View>
    </View>
  )
}

const styles = StyleSheet.create({tinyLogo: {
    width: 50,
    height: 50,
},
container :{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor:'#CC0000'
},})