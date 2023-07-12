import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet,View, Animated,ImageBackground } from 'react-native'


const ImageField= (props) => {
    const {  thumbnailSource,src, style} = props
    const thumbnailAnimated = new Animated.Value(0);
    const imageAnimated = new Animated.Value(0);
    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
        }).start();
    }
    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
          toValue: 1,
        }).start();
    }
 
    return (
        <View >
            <View style={styles.container}>
                {
                    (src ==null || src ==6 || src ==undefined || src =='' )?(
                        <ImageBackground source={thumbnailSource} resizeMode="cover" style={style}></ImageBackground>
                    ):(
                        <ImageBackground source={{uri : src}}   resizeMode="cover" style={style}></ImageBackground> 
                    )
                }
            </View>
        </View>
    )}

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
})

export default ImageField;