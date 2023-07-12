import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet,View, Animated,SafeAreaView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import imagePath from '../constants/imagePath';

const Mapcomponent= (props) => {
    
    const mapmarker = () =>{
        return  props.data.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{
                    latitude: parseInt(marker.lat),
                    longitude: parseInt(marker.lang),
                }}
                image={imagePath.pinkloc}
            />
        ))
        

    }

    return (
        <View style={props.style}>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        showsUserLocation={false}  
                        zoomEnabled={true}  
                        zoomControlEnabled={false}  
                        initialRegion={{
                            latitude: props.currentLatitude,
                            longitude: props.currentLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        customMapStyle={mapStyle}>
                        {mapmarker()}
                    </MapView>
                </View>
            </SafeAreaView>
        </View>
    )
}
const mapStyle = [
    
];
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});


export default Mapcomponent;