import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokebyID } from "../store/data";
import { StyleSheet, Text, Image, View,Dimensions,ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native'






const PokeItem = (props) => {
    const pokemon = props.pokemon
    const [poke, setChange] = useState()

    const dispatch = useDispatch({})
    const navigation = useNavigation()
    

    useEffect(() => {
        dispatch(fetchPokebyID(pokemon.url)).then(response => setChange(response.payload))
    }, [])

    const cardGap = 16;

    const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;




    return (
        <View>
          
            
            {pokemon? <Pressable style={{marginTop: cardGap,
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
        
        
            
      
        
    );


}






const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    logo: {
        width: 66,
        height: 58,
    },
 
   
});

export default PokeItem;