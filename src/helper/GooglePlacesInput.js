import React, { useEffect, useRef, useState } from 'react'
import { Text,Modal,PermissionsAndroid,Image,StyleSheet,View,SafeAreaView,Dimensions, TouchableOpacity} from 'react-native'

import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API } from "../services/Apiurl";

import Blackbackaerrow from '../assets/img/blackbackaerrow.svg';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const GooglePlacesInput= (props) => {

    const placesRef = useRef();
   
    const [ currentLongitude, setCurrentLongitude ]  = useState('');
    const [currentLatitude, setCurrentLatitude ] = useState('');

    const getAddress = () => {
        console.log(placesRef.current?.getAddressText());
    };

    useEffect(() => {
        const requestLocationPermission = async () => {
        
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
           
        } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getOneTimeLocation();
                    } else {
                     
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
       
    }, []);
    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude =  JSON.stringify(position.coords.latitude);
                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);
                //addresscountry(position.coords.longitude,position.coords.latitude);
            },
            (error) => {
                console.log(error.message);
            },
           
        );
    };

   
  
    return (
        <>
            
            <TouchableOpacity style={styles.crosshight} onPress={() => {
                    props.closeaddress() }}>
                    <Blackbackaerrow width={24} height={24} />
            </TouchableOpacity>
            <View style={styles.container}>
                    
                <SafeAreaView>
                <GooglePlacesAutocomplete
                        placeholder='Search address'
                        fetchDetails={true}
                        onPress={(data,details) => {
                            props.onPress(data,details)
                        }}
                        query={{
                            key: GOOGLE_MAP_API,
                            language: 'en',
                            region: 'IN',
                        }}
                        styles={{
                            container: {
                                flex: 1,
                                height:windowHeight,
                                padding:15,
                                marginTop:-10,
                                width:windowWidth
                            },
                            textInputContainer: {
                                flexDirection: 'row',
                            },
                            textInput: {
                                backgroundColor: '#FFFFFF',
                                height: 60,
                                borderRadius: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                fontSize: 18,
                                flex: 1,
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                            poweredContainer: {
                                justifyContent: 'flex-end',
                                backgroundColor:"red",
                                alignItems: 'center',
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderColor: '#c8c7cc',
                                borderTopWidth: 0.5,
                                backgroundColor: '#edf0f1',
                                width:windowWidth,
                                padding:15,
                                height:windowHeight
                            },
                            powered: {},
                            listView: {},
                            row: {
                                zIndex:9999,
                                padding: 13,
                                height: 50,
                                color:"#000000",
                                flexDirection: 'row'
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: '#c8c7cc',
                            },
                            description: {},
                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                        }}
                    />
                   
                </SafeAreaView>
            </View>
            
        </>
    )}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#edf0f1',
        height:"100%",
        width:"100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    crosshight:{
        backgroundColor: '#ffffff',
        padding:15,
        width:"100%",
    },
    image:{
        width:25,
        height:25
    }
})

export default GooglePlacesInput