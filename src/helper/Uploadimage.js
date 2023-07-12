import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,TouchableOpacity,Modal,Image,Platform,PermissionsAndroid,ImageBackground} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../constants/imagePath';
import ApiDataService from "../services/Apiservice.service";

const ImagePicker = require('react-native-image-picker');

const Uploadimage= (props) => {
    const ImageUploadincamera = async () =>{
       const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs access to your camera' +'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let options = {
                base64: true,
                allowsEditing: false,
                includeBase64: true
        
            };
            ImagePicker.launchCamera(options, res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker')
                }
                else if (res.error) {
                    console.log('ImagePicker Error: ', res.error)
                }
                else if (res.customButton) {
                    console.log('User tapped custom button: ', res.customButton)
                }
                else {
                  
                    addinserverfun(res);
                }
            });
    
        } 
        else {
            console.log('Camera permission denied');
        }
            
        
  }
  const ImageUploadingallery = async () =>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message:'App needs access to your camera' + 'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let options = {
                base64: true,
                allowsEditing: false,
                includeBase64: true
        
            };
            ImagePicker.launchImageLibrary(options, res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker')
                }
                else if (res.error) {
                    console.log('ImagePicker Error: ', res.error)
                }
                else if (res.customButton) {
                    console.log('User tapped custom button: ', res.customButton)
                }
                else {
                    addinserverfun(res);
                }
            });
        } 
        else {
            console.log('Camera permission denied');
        }
       
    }
    const addinserverfun = async (source) =>{
        props.closeimagepopup(2,source);
    }

    return<View >
           <Modal  animationType="slide" transparent={true} visible={true}>
                <View style={{   height: '100%',  marginTop: 'auto',position:"relative", backgroundColor:'#0e0e0e61',zIndex:999999}}>
                    <TouchableOpacity style={{position: 'absolute',bottom: 0,width:'100%',height:"100%"}} onPress={() =>{
                         props.closeimagepopup(1,'') }}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{position: 'absolute',bottom: 0,left:0,right:0,borderTopRadius:50,height:160,backgroundColor:"#000000"}}>  
                        <ImageBackground style={{height:160,width:"100%",borderTopRadius:50,backgroundColor:"#000000"}} source={imagePath.Uploadimgback} >
                            <View style={StylesFirst.photoview}>
                                <View style={StylesFirst.photosec}> 
                                    <TouchableOpacity onPress={() =>{
                                            ImageUploadingallery();
                                        }}>
                                        <Image style={StylesFirst.photoicon}   source={imagePath.Gallery}/>
                                    </TouchableOpacity>
                                    <Text style={StylesFirst.phottext}>Select Photo</Text>
                                </View>
                                <View style={StylesFirst.photosec}>
                                    <TouchableOpacity onPress={() =>{
                                        ImageUploadincamera();
                                    }}>
                                        <Image style={StylesFirst.photoicon}   source={imagePath.camera}/>
                                    </TouchableOpacity>
                                    <Text style={StylesFirst.phottext}>Camera</Text>
                                </View>
                            </View>
                        </ImageBackground> 
                    </View>
                    
                </View>
            </Modal>
       
    </View>;
  
}

export const StylesFirst = StyleSheet.create({
    footerdv:{
        width:"100%",
        height:60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        flexDirection: 'row', 
        alignItems:'center', 
    },
    bottomButtons: {
        width:"20%",
        alignItems:'center', 
    },
    footerText: {
        color:'#000000',
        fontWeight:'bold',
        alignItems:'center',
        fontFamily:'Poppins-Regular',fontSize:18,
    },
    photoview:{
        flexDirection: 'row-reverse', 
        paddingTop:35,
        paddingBottom:25,
    },
    photosec:{
        width:"50%",
        height:"100%",
        alignItems:"center"
    },
    photoicon:{
        width :60,
        height :60,
    },
    phottext:{
        alignItems:"center",
        fontFamily:'Poppins-Regular',
        color:"#FFFFFF"
    },
})

export default Uploadimage