import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,Animated,Easing, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


const TextareaFeiled= (props) => {
    const { label,errorText, value,style,type, onBlur, onFocus,...restOfProps} = props
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)
    const focusAnim = useRef(new Animated.Value(0)).current
    let securetext = false;
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
    

    return (
        <View >
            <Text style={styles.newlable}>{label}</Text>
            <TextInput
                style={[styles.input,{ borderColor: "#cc007680"}]}
                ref={inputRef}
                type={type}
                {...restOfProps}
                multiline={true}
                numberOfLines={4}
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

    const styles = StyleSheet.create({
        input: {
            padding:14,
            backgroundColor:"#EEEEEE",
           
            borderRadius: 4,
            fontFamily:'Poppins-Regular',
            fontSize: 16,
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
            fontSize: 14,
            fontWeight:"700",
            color:"#000000",
            marginBottom:5
        }
    })

export default TextareaFeiled