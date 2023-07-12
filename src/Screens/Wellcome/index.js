//import liraries
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import imagePath from './../../constants/imagePath';
import { View, Text, StyleSheet,ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StylesGloble } from './../../helper/Globlecss';
import WhiteButtonField  from './../../helper/WhiteButtonField';
import Welllogo from '../../assets/img/Welllogo.svg'

const Wellcome = ({ navigation,route }) => {
    const submitfun = () =>{
        navigation.navigate('Addmobile')
    }
    return (
        <ImageBackground style={{flex: 1 , width:wp('100%'),height:hp('100%'),position:"relative"}} source={imagePath.welbg} >
            <View style={{...StylesGloble.ScreenHorigental,...StylesGloble.wellcomeouter,...StylesGloble.centerclass}}>
                <View style={{...StylesGloble.widthheight100,marginBottom:50}}>
                    <Welllogo width={69} height={77} fill={"#9DC45A"}/>
                </View>
                <Text style={{...StylesGloble.fontmedium}}>Welcome to</Text>
                <Text style={{...StylesGloble.fontmedium,marginTop:8}}>our grocery savings</Text>
                <Text style={{...StylesGloble.fontmedium,marginTop:8}}>platform</Text>
                <Text style={{...StylesGloble.fontsmallsimple,marginTop:10,color:"#000000",fontSize:14}}>The smart way to shop for groceries.</Text>
                <View style={{marginTop:55,marginBottom:50,width:wp('80%')}}>
                    <WhiteButtonField label={'Get Start'} submitfun={submitfun}/>
                </View>
            </View>
        </ImageBackground>
    );
};



export default Wellcome;