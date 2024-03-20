import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import  store  from './store/store'
import PokemonListScreen from './screens/PokemonListScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokeDetails from './screens/PokeDetails'
import PokedexScreen from './screens/PokedexScreen'

const Stack = createNativeStackNavigator()

export default function () {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='PokeList' component={PokemonListScreen} />
        <Stack.Screen name='PokeDetail' component={PokeDetails} />       
        <Stack.Screen name='Pokedex' component={PokedexScreen} />       
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({})