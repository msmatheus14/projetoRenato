import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export const MapaComponent = ({ array, latitude, longitude }) => {
    return (

    <View style={{ flex: 1 }}>  

        <MapView
            style={{ 
                flex: 1,
                width: '100%',
                height: '100%'
            }}
            
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {array.map((item) => (
                <Marker
                    key={item.id}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                />
            ))}
        </MapView>
    </View>
)
}