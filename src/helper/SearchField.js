import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,Animated,Image,Easing, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Searchicon from '../assets/img/searchicon.svg'

const SearchField= ({placeholder,value,Changevalue}) => {
    return (
        <View  style={styles.outer}>
            <Searchicon width={16} height={16}  style={styles.image}/>
            <TextInput
                style={[styles.input,{ borderColor: "#EEEEEE"}]}
                onChangeText={Changevalue}
                placeholderTextColor="#000000"
                value={value}
                placeholder={placeholder}
               
            />
        </View>
    )}

const styles = StyleSheet.create({
    outer:{
        width:"100%",
        position:"relative",
       
       
    },
    input: {
        padding:10,
        backgroundColor:"#EEEEEE",
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft:44,
        fontSize: 15,
        color:"#000000",
        borderRadius:60
    },
    
    borderview:{
        borderColor:"#EEEEEE",
        borderWidth:1,
    },
     image:{
        position:"absolute",
        top:18,
        left:20,
        zIndex:9
    }
})

export default SearchField