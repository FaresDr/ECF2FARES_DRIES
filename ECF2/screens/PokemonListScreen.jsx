import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPoke } from "../store/data";
import { StyleSheet, Text, View, TextInput, ScrollView,Image, Pressable } from 'react-native'
import PokeItem from "./PokeItem";
import { useNavigation } from '@react-navigation/native'



const PokeList = () => {
    const pokemon = useSelector(state => state.pokemon.pokemons)
  
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    console.log(pokemon);
    const navigation = useNavigation()
  
    useEffect(() => {       
        dispatch(fetchPoke())       
                 
    },[])

    console.log(useSelector(state=> state.pokemon.pokedex));


    return (
        <View>
              
        {pokemon? <ScrollView style={styles.container_secondary}>
            <Pressable onPress={()=> navigation.navigate("Pokedex")}>       
            <Text style={styles.text}>Accueil     
            <Image style={styles.tinyLogo} source={require('../assets/5a38400bb45730.3526330915136358517387.png')}/>
            </Text>
            </Pressable>  
            <TextInput
        style={styles.input}
        onChangeText={text => setSearch(text)}
        value={search}
      />
            <View style={styles.container}>
            
          {pokemon.map((pokemon,i) => <PokeItem pokemon={pokemon} key={i}/>)}
          </View>
    </ScrollView> : <View><ActivityIndicator size="small" color="#0000ff" /></View> }
    </View>
        
    );
}
 
const styles = StyleSheet.create({    
    container :{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor:'#CC0000'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignContent:'center',
    padding:50

},
container_secondary:{
  
    fontSize:'25',
    backgroundColor:'#CC0000',
    marginStart :'50'
    
},
text:{
    color:'white',
    fontSize:25,
    textAlign:'center',

    height :75,
    margin :10
},
input:{
    backgroundColor:'white',
    fontSize:25,
    textAlign:'center',

    
}

  })
export default PokeList;