import { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

import { MapaComponent} from './Mapa.jsx'

import * as db from '../services/db.js'
import * as localizacao from "../services/localizacao.js"


export default function  Home() {

    const [local, setLocal] = useState(null)
    const [lugares, setLugares] = useState([])

     useFocusEffect(

  useCallback(() => {

    (async () => {

    await getLugares()

      const local1 = await localizacao.retornarLocalizacaoAtual()

      setLocal(local1)

      

    })();
  }, [])
);

    
   
    
    const marcarLocalização = async () => {

        let local = await localizacao.retornarLocalizacaoAtual()
        

        if(local){

            try{
                
                await db.adicionarLugar(local.coords.latitude, local.coords.longitude)

                await getLugares()

                console.log('Residência adicionada com sucesso!')
            }
            catch(error){
                
                console.log(error, 'Erro ao marcar residência')
            }

        }

        
    }

    const getLugares = async () => {

        let arrayLugares = await db.retornarLugares()

        setLugares(arrayLugares)

    }

    if(!local) {

        

    return (

        <View >

            <Text>Carregando Localização...</Text>

        </View>
    )
    }
   

        return (

        <View style={styles.container} >

            <View style = {styles.containerMap}>
        <MapaComponent

        array = {lugares} 
        latitude = {local.coords.latitude} 
        longitude = {local.coords.longitude}
        />
        </View>
        

        <TouchableOpacity style = {styles.botao} onPress={marcarLocalização}>
            <Text style = {{color: 'white'}}>Marcar Localização da Casa</Text>
        </TouchableOpacity>
        
        
        </View>
    );
        
    }

    const styles = StyleSheet.create({



  containerMap: { 
        
        width: "100%",
        height: "100%",
    },
  botao: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1, 
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


    

    

