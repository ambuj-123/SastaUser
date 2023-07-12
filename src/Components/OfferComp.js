import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import imagePath from '../constants/imagePath';
import { StylesGloble } from '../helper/Globlecss';

const OfferComp = (props) => {
   
    return (
        <TouchableOpacity style={{margin:5,height:150}} >
            {
                (props.item.image)?(
                    <Image style={{...StylesGloble.offerhomeimage}} imageStyle={{ borderRadius: 10}} source={{uri :props.item.image}}/>
                ):(
                    <ImageBackground style={{...StylesGloble.offerhomeimage}} imageStyle={{ borderRadius: 10}} source={imagePath.offerb1}>
                        {/* <Text style={{fontWeight:"400",color:"#666666",lineHeight:12, fontSize: 10,marginTop:15,color:"#000000"}}>{props.item.name}</Text>
                        <Text style={{fontSize:11,fontWeight:"600",marginTop:0,color:"#000000"}}>{props.item.offer}</Text> */}
                    </ImageBackground>
                )
            }
            
        </TouchableOpacity>
    );
};


export default OfferComp;
