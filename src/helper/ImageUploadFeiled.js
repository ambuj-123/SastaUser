import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,Image,Easing, TouchableWithoutFeedback} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../constants/imagePath';


const ImageUploadFeiled= (props) => {
    const { label,errorText, value,style,type,uploadimgvideofun,...restOfProps} = props
   
    const imageshowfun = () =>{
        if(label=='Image')
        {
            return imagePath.uploadimg;
        }
        else{
            return imagePath.uploadVideo;
        }
    }
   
    return (
        <View >
            <Text style={styles.newlable}>{label}</Text>
            <TouchableOpacity onPress={()=>uploadimgvideofun(label)} style={styles.input}>
                <Image  style={styles.image} source={imageshowfun()} />
            </TouchableOpacity>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    )}

const styles = StyleSheet.create({
    input: {
        height:200,
        width:"100%",
        backgroundColor:"#222222",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#cc007680",
        fontFamily:'Poppins-Regular',
        fontSize: 16,
        color:"#ffffff",
        alignItems:"center",
        justifyContent:"center"
    },
    labelContainer: {
        position: 'absolute',
      
        top:-10,
        left:-15

    },
    borderview:{
        borderColor:"#CC0076",
        borderWidth:1,
    },
    label: {
        fontFamily:'Poppins-Regular',
        backgroundColor:"rgba(17, 17, 17, 0)",
        fontSize: 16,
        marginTop:-7,
        color:"#ffffff"
    },
    error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: '#B00020',
        fontFamily:'Poppins-Regular',
    },
    newlable:{
        fontSize: 14,
        color:"#ffffff",
        marginBottom:5
    }
})

export default ImageUploadFeiled