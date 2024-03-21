import { StyleSheet, Text, View, Image, Pressable, Button, Alert,ActivityIndicator,ImageBackground } from 'react-native'
import React, { useEffect,useState } from 'react'
import { fetchPokeEvolution, addPoke,fetchPokeEvolutionChain,fetchPokebyID, addEvolution, clearEvolution } from "../store/data";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

export default function PokeDetails({route}) {
   
    const evolution = useSelector(state =>state.pokemon.evolutionChain)
    const PokeEvolution = useSelector(state =>state.pokemon.evolutionDetails)
   
    const Poke=route.params.poke

    let Url1=""
    let Url2=""
    let Url3=""
    
    const [changement, setChangement] = useState(false)

    
    
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
       if( PokeEvolution.chain.evolves_to[0] != undefined){
       Url2 = PokeEvolution.chain.evolves_to[0].species.url
       }else{
           Url2= Url1
       }if(PokeEvolution.chain.evolves_to[0].evolves_to[0] !=undefined){
       Url3 = PokeEvolution.chain.evolves_to[0].evolves_to[0].species.url
       }else{
           Url3 = Url1
       }
           
           
            
            navigation.navigate("PokeEvolution",{Url1:Url1,Url2:Url2,Url3:Url3})       
            
        }
       
    }
    
    useEffect(() => {  
        dispatch(clearEvolution()) 
        dispatch(fetchPokeEvolutionChain(Poke.species.url))     
        setTimeout(() => {
            setChangement(true)
          }, 1500);
       }, [changement])
   
    
   
  return (
    <View style={{backgroundColor:'#CC0000'}}>
        
        <Pressable style={{
            margin: 10,
            
            height: 420,
            backgroundColor: 'white',
            borderRadius: 30,
            shadowOpacity: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#3B4CCA',
            borderWidth: 25,
            borderRadius: 25,}}>
         <Image
                style={styles.Logo}
                source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Poke.id}.png`,
                }}
            /></Pressable>
    
                <Pressable style={{
            margin: 10,
            
            height: 260,
            backgroundColor: 'white',
            borderRadius: 30,
            shadowOpacity: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#3B4CCA',
            borderWidth: 8,
            borderRadius: 25,}}>
                <Text style={styles.Infos}>{Poke.name.charAt(0).toUpperCase() + Poke.name.slice(1)}</Text>
                <Text style={styles.Infos}>{Poke.id}</Text>
                {Poke.stats.map((stat,i) =>{return(<Text style={styles.Infos} key={i}>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} : {stat.base_stat}</Text>)})}
                </Pressable>
                
                <Button title='Ajouter au pokédex' onPress={()=> (dispatch(addPoke(Poke)))}></Button>
                {evolution ?  <Button title='Voir les évolutions' onPress={()=> Evolve()}></Button> : <Text></Text> }
                
                
                
    </View>
  
     
  )
}

const styles = StyleSheet.create({
    Logo: {
        width: 400,
        height: 400,
        alignContent:'center'

        
    },
    Infos:{
        textAlign:'left',
        color :'black',
       
        fontSize:20,
        fontWeight:'bold'
    }
        
    
})