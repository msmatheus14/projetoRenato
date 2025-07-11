import React, { useState } from "react"
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MapaComponent } from "./Mapa";



export const ItemLugar = ({item, apagar}) => {

    const apagarLugar = async () => {

        try{
            await apagar(item.id)
    } 
    catch(error){
        console.log('error' ,error)
    }
        
    }

    

    return (

        <View style = {styles.container}>
            <Text>ID:{item.id} Latitude: {item.latitude} Longitude: {item.longitude}</Text>
            
            

            <View style = {styles.containerMap}>

                <MapaComponent
                array={[{id:item.id, latitude: item.latitude, longitude: item.longitude}]}
                latitude = {item.latitude} 
                longitude = {item.longitude}
        />

        </View>

        <TouchableOpacity style = {styles.botaoApagar} onPress={() => apagarLugar()}>
                <Text style = { styles.textoApagar}>Apagar</Text>
            </TouchableOpacity>
            
            
            
        </View>
    )

}

const styles = StyleSheet.create({


    container: {

        
        borderWidth: 2,
        borderRadius: 20,
        margin:10,
        padding: 10

    },

    botaoApagar: {

        marginTop: 15,
        width: "100%",
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'red',
        
    },

  containerMap: { 
        
        marginTop: 20,
        width: "100%",
        height: 200,
    },

    textoApagar: {
        color: 'white',
        textAlign: 'center',
    }
  
});