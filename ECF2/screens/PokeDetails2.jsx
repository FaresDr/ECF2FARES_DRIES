import { StyleSheet, Text, View,Image,ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPokebyID } from '../store/data'

export default function PokeDetails2({route}) {
    const pokemon = route.params.evolution
   

    
    const [poke, setChange] = useState()
    const [changement, setChangement] = useState(false)
    const dispatch = useDispatch({})

    
 
    

    useEffect(() => {
        console.log(pokemon.name);
      
            dispatch(fetchPokebyID(pokemon.url)).then(response => setChange(response.payload))
        
        console.log('poke = ');
        console.log(pokemon);
        
        setTimeout(() => {
            setChangement(true)
          }, 200);
        
    }, [poke])
  return (
    <View>
          
            
    {poke? <Pressable style={{marginTop: cardGap,
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
    borderRadius: 25,}} onPress={()=> navigation.navigate("PokeDetail" , {poke : poke})}>
        

   
    <Image
        style={styles.tinyLogo}
        source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke?.id}.png`,
        }}
    />
    <Text>{poke?.name.charAt(0).toUpperCase() + poke?.name.slice(1)}</Text>
    
    </Pressable>   
     : <View><ActivityIndicator size="small" color="#0000ff" /></View> }
 
   </View>

  )
}

const styles = StyleSheet.create({
    tinyLogo: {
    width: 150,
    height: 150,
  },})