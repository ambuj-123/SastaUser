import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, StyleSheet, View, Animated, Easing, Image, TouchableOpacity } from 'react-native';
import Password from '../assets/img/password.svg';
import Eyeicon from '../assets/img/eyeicon.svg';
import Closeeyeicon from '../assets/img/closeeyeicon.svg';

const TextField = (props) => {

    const { label, errorText, value, style, type, onBlur, Placeholder, onFocus, ...restOfProps } = props
    const [isFocused, setIsFocused] = useState(false);
    const [securetext, setsecuretext] = useState(false);


    const inputRef = useRef(null)
    const focusAnim = useRef(new Animated.Value(0)).current

    let keypadtype = 'default';
    let multilineobj = false;
    useEffect(() => {

        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value])

    let color = '#B9C4CA'
    if (errorText) {
        color = '#B00020'
    }
    return (
        <View style={{ position: "relative" }} >
            <View style={{ ...styles.newlable }}>
                <Password />
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
            <View style={{ position: "absolute", top: 23, right: 5 }}>
                <TouchableOpacity onPress={() => {
                    if (securetext == true) {
                        setsecuretext(false)
                    } else {
                        setsecuretext(true)
                    }
                }} style={{ zIndex: 999999 }} >
                    {
                        (securetext == false) ? (
                            <View style={{ ...styles.newlableto }} >
                                <Eyeicon />
                            </View>
                        ) : (
                            <View style={{ ...styles.newlableto }} >
                                <Closeeyeicon />
                            </View>
                          )
                    }
                </TouchableOpacity>
            </View>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 14,
        backgroundColor: "#F5F5F5",
        paddingLeft: 50,
        borderRadius: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: "#000000"
    },
    labelContainer: {
        position: 'absolute',
        top: -10,
        left: -15
    },
    borderview: {
        borderColor: "#CC0076",
        borderWidth: 1,
    },
    label: {
        fontFamily: 'Poppins-Regular',
        backgroundColor: "rgba(17, 17, 17, 0)",
        fontSize: 16,
        marginTop: -7,
        color: "#ffffff"
    },
    error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: '#B00020',
        fontFamily: 'Poppins-Regular',
    },
    newlable: {
        zIndex: 999,
        position: 'absolute',
        top: 16,
        left: 14
    },
    newlableto: {
        zIndex: 999,
        position: 'absolute',
        top: 0,
        right: 5
    }
})

export default TextField