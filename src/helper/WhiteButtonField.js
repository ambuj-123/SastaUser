import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet,Text, Animated,ImageBackground, Touchable,TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


const WhiteButtonField= (props) => {
   
    
 
    return (
        <TouchableOpacity onPress={props.submitfun}>
            <LinearGradient colors={['#FFFFFF' ,'#FFFFFF']} start={{x: 0.09, y: 0.5}} end={{x: 1.5, y: 2.0}}
                    style={{...styles.cardViewStyle}}>
                <Text style={{...styles.buttontext}}>{props.label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )}

const styles = StyleSheet.create({
    imageOverlay: {
        width: "100%", 
        padding:25,
        borderRadius:8,
        zIndex:555,
        overflow:"hidden"
    },
    buttontext:{
        fontSize:16,
        color:"#000000",
        textAlign:"center",
        fontWeight:"600",
        padding:14,
        borderRadius:8
    },
    cardViewStyle:{
        borderRadius:50,
        zIndex:555,
        overflow:"hidden"
    }
})

export default WhiteButtonField;