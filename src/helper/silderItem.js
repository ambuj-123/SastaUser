
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Dimensions, View,StyleSheet,ImageBackground, TextInput ,TouchableOpacity } from 'react-native';


const width= Dimensions.get('window').width;
const height= Dimensions.get('window').height;
const SliderItem = ({item}) =>{
   
    return(
        <View style={{...styles.cardView}}>
            <ImageBackground style={styles.image} imageStyle={{ borderRadius: 6}} source={item.image}>
            </ImageBackground>
        </View>
       
    )
}
const styles = StyleSheet.create({
    cardView: {
        width : wp('100%')-25,
        height : 250,
        padding:5,
        paddingTop:15,
        shadowColor:"#000",
        alignItems:"center",
    },
    image: {
        flex:1,
        width :wp('100%')-50,
        height : 180,
        alignItems:"center",
    },
    textView: {
        color: '#2b3668', 
        

    },
    itemtitle: {
        color: '#0E1B53', 
        fontSize: 20, 
        fontFamily: 'Poppins-SemiBold',
        alignItems:"center",
        fontWeight:"600",
        paddingTop:5
    },
    itemnor: {
        color: '#0E1B53', 
        fontSize:  14, 
        fontFamily: 'Poppins-Medium',
        width:300,
        alignItems:"center",

    },
    
});

export default SliderItem;