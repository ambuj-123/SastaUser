import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, TouchableOpacity,} from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import Orderplaced from '../../assets/img/orderplaced.svg'

const Orderconfirm = ({ navigation,route }) => {
    const orderId = route.params.orderId;
    const submitfun = () =>{
        navigation.navigate('Trackorder',{orderId:orderId});
    }
    return (
        <View style={{...StylesGloble.container,alignItems:"center",paddingLeft:10,paddingRight:10}}>
            <Orderplaced style={{marginTop:90}}/>
            <Text style={{fontSize:25,marginTop:25,fontWeight:"700",color:"#000000"}}>Order Placed Successfully</Text>
            <Text style={{fontSize:14,fontWeight:"400",marginTop:15,color:"#9D9D9D"}}>Lorem Ipsum has been the industry's standard</Text>
            <Text style={{fontSize:14,fontWeight:"400",marginLeft:15,color:"#9D9D9D"}}>dummy text ever since the 1500s.</Text>
            <View style={{marginTop:hp('3%'),width:wp('90%')}}>
                <ButtonField label={'Track Order'} submitfun={submitfun}/>
            </View>
            <TouchableOpacity style={{marginTop:hp('3%')}} onPress={()=>navigation.navigate('Home') }>
                <Text style={{fontSize:16,marginTop:5,fontWeight:"400",color:"#000000"}}>Back to home</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Orderconfirm;