import { StyleSheet, Text, View, Image, Pressable, Button, Alert } from 'react-native'
import React, { useEffect,useState } from 'react'
import { fetchPokeEvolution, addPoke,fetchPokeEvolutionChain,fetchPokebyID, addEvolution, clearEvolution } from "../store/data";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

export default function PokeDetails({route}) {
   
    const evolution = useSelector(state =>state.pokemon.evolutionChain)
    const PokeEvolution = useSelector(state =>state.pokemon.evolutionDetails)
    const Version = useSelector(state => state.pokemon.pokeEvolution)
    const Poke=route.params.poke
    let Url1=""
    let Url2=""
    let Url3=""
    
    const navigation = useNavigation()
    
    
    const dispatch = useDispatch()
    function Evolve(){
        dispatch(clearEvolution()) 
        dispatch(fetchPokeEvolution(evolution))
        
        if(PokeEvolution==""){
            console.log("En attente")
        }else{
       console.log(PokeEvolution);
            Url1 = PokeEvolution.chain.species.url
            if( PokeEvolution.chain.evolves_to[0].species.url != undefined){
            Url2 = PokeEvolution.chain.evolves_to[0].species.url
            }else{
                Url2= Url1
            }if(PokeEvolution.chain.evolves_to[0].evolves_to[0].species.url !=undefined){
            Url3 = PokeEvolution.chain.evolves_to[0].evolves_to[0].species.url
            }else{
                Url3 = Url1
            }
            
            
           
           
            dispatch(clearEvolution())
            navigation.navigate("PokeEvolution",{Url1:Url1,Url2:Url2,Url3:Url3})
        
            
        }
       
    }
    
    useEffect(() => {        
        dispatch(fetchPokeEvolutionChain(Poke.species.url))     
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
                <Button title='Voir les évolutions' onPress={()=> Evolve()}></Button>
                
                
                
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