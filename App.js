
import { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList} from 'react-native'
import {  NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import * as db from './src/services/db.js'
import * as localizacao from "./src/services/localizacao.js"

import Home from './src/components/Home'
import Residencias from './src/components/Lugares.jsx'

const Tab = createBottomTabNavigator()

export default function App() {


  useEffect(() => {

    (async () => {

      let banco = await db.iniciarBanco()
      
        if(banco){
          console.log('Banco iniciado...')
        }else
        {
          console.log('Falha ao inciar o banco')
        }
      
      let  validLocalizacao = await localizacao.pedirPermissaoLocalizacao()

      

    })()

  }, [])


  return (

    <View style={styles.container}>
      
      
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name = "Home" component = {Home} />
          <Tab.Screen name = "Rota" component = {Residencias} />
        </Tab.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  }
  
});
