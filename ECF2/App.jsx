import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import  store  from './store/store'
import PokemonListScreen from './screens/PokemonListScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokeDetails from './screens/PokeDetails'
import PokedexScreen from './screens/PokedexScreen'
import PokeEvolution from './screens/PokeEvolution'
import PokeDetails2 from './screens/PokeDetails2'


const Stack = createNativeStackNavigator()

export default function () {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='PokeList' component={PokemonListScreen} />
        <Stack.Screen name='PokeDetail' component={PokeDetails} />       
        <Stack.Screen name='Pokedex' component={PokedexScreen} />       
        <Stack.Screen name='PokeEvolution' component={PokeEvolution} />       
        <Stack.Screen name='PokeDetail2' component={PokeDetails2} />       
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:'#CC0000'
},
})