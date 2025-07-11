import { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'

import { ItemLugar } from './VisitaItem.jsx'

import * as db from '../services/db.js'


export default function  Lugares() {

    
    const [lugares, setLugares] = useState([])

     useFocusEffect(
  useCallback(() => {
    (async () => {
      let arrayLugares = await db.retornarLugares();
      setLugares(arrayLugares);
    })();
  }, [])
);

         const apagarLugar = async (id) => {
         
                try{
         
                 await db.apagarLugar(id)
                 
                  let arrayLugares = await db.retornarLugares()

                  setLugares(arrayLugares)
         
                }
                catch(error) {
                 
                 console.log(error, 'Erro ao apagar lugar, filho')
                }
                 
             }
         


        return (

        <View style={styles.container} >

            <View style={styles.listContainer}>
                <FlatList
                    data={lugares}
                    renderItem={({ item }) => (
                        <ItemLugar
                            apagar={apagarLugar}
                            item={item} 
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

        </View>
    );
        
    }

    const styles = StyleSheet.create({

  container: {
        flex: 1,
        
    },
  listContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});


    

    

