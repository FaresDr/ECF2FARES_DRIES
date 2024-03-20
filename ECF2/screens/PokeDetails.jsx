import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native'
import React, { useEffect,useState } from 'react'
import { fetchPokeEvolution, addPoke,fetchPokeEvolutionChain } from "../store/data";
import { useSelector, useDispatch } from "react-redux";
import PokeItem from './PokeItem';

export default function PokeDetails({route}) {
    const evolution = useSelector(state => state.pokemon.evolutionDetails)
    const Poke=route.params.poke
    
    console.log(Poke.id);
    console.log(Poke.stats);

        console.log(useSelector(state =>state.pokemon.pokedex))
  
    const dispatch = useDispatch()
    useEffect(() => {
        const essai = dispatch(fetchPokeEvolutionChain(Poke.species.url))
        console.log('essai = ');
        console.log(essai);     
      
        
    
    
  
    
    


       
    
        
      
    }, [])
   
    
   
  return (
    <View>
         <Image
                style={styles.tinyLogo}
                source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Poke.id}.png`,
                }}
            />
                <Text>{Poke.name.charAt(0).toUpperCase() + Poke.name.slice(1)}</Text>
                <Text>{Poke.id}</Text>
                {Poke.stats.map((stat,i) =>{return(<Text key={i}>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} : {stat.base_stat}</Text>)})}
                <Button title='Ajouter au pokédex' onPress={()=> (dispatch(addPoke(Poke)))}></Button>
                
                
                
    </View>
  
     
  )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 400,
        height: 400,
        alignContent:'center'
    },
})