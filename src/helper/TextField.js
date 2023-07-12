import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,Animated,Easing,Image, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Emailicon from '../assets/img/emailicon.svg';
import Phicon from '../assets/img/phicon.svg';
import Password from '../assets/img/password.svg';
import Nameicon from '../assets/img/nameicon.svg';


const TextField= (props) => {

   
    const { label,errorText, value,style,type, onBlur,Placeholder, onFocus,...restOfProps} = props
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)
    const focusAnim = useRef(new Animated.Value(0)).current
    let securetext = false;
    let keypadtype='default';
    let multilineobj = true;
    let icon =require('../assets/images/emailicon.png');

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value])

    let color =  '#B9C4CA'
    if (errorText) {
        color = '#B00020'
    }


    if (type=='email') {
        securetext = false;
        keypadtype='email-address';
        multilineobj = false;
        icon =require('../assets/images/emailicon.png');
    }
    else if (type=='phone') {
        securetext = false;
        keypadtype='phone-pad';
        multilineobj = false;
        icon =require('../assets/images/phicon.png');
    }
    else if (type=='number') {
        securetext = false;
        keypadtype='numeric';
        multilineobj = false;
        icon =require('../assets/images/password.png');
    }
    else if (type=='password') {
        securetext = true;
        keypadtype='default';
        multilineobj = false;
    }
    else{
        securetext = false;
        keypadtype='default';
        multilineobj = true;
    }
    if(Placeholder=="Name")
    {
        icon =require('../assets/images/nameicon.png');
    }
    
    return (
        <View style={{position:"relative"}}>
            <View style={{...styles.newlable}}>
            {
                (Placeholder=="Name")?(
                    <Nameicon width={24} height={24} />
                ):(
                    newicontype(type)
                )
                
            }
            </View>
           
            <TextInput
                style={[styles.input]}
                ref={inputRef}
                multiline={multilineobj}
                keyboardType={keypadtype}
                placeholder={Placeholder}
                placeholderTextColor="#817878"
                type={type}
                {...restOfProps}
                secureTextEntry={securetext}
                value={value}
                onBlur={(event) => {
                    setIsFocused(false)
                    onBlur?.(event)
                }}
                onFocus={(event) => {
                    setIsFocused(true)
                    onFocus?.(event)
                }}
            />
           
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    )}
    const newicontype = (type)=>{
        return(
            <>
            {
                (type=='email')?(
                    <Emailicon width={24} height={24} />
                ):(type=='phone')?(
                    <Phicon width={24} height={24} />
                ):(type=='number')?(
                    <Emailicon width={24} height={24} />
                ):(type=='password')?(
                    <Password width={24} height={24} />
                ):(
                    <Emailicon width={24} height={24} />
                )
            }
               
          </>
        )
    }

const styles = StyleSheet.create({
    input: {
        padding:14,
        backgroundColor:"#F5F5F5",
        paddingLeft:50,
        borderRadius: 4,
        fontSize: 14,
        color:"#000000"
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
        zIndex:999,
        position:'absolute',
        top:16,
        left:14
    },
})

export default TextField