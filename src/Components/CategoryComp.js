import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity,StyleSheet, View,Image } from 'react-native';
import imagePath from '../constants/imagePath';
import { StylesGloble } from '../helper/Globlecss';

const CategoryComp = (props) => {
    
    return (
        <TouchableOpacity onPress={()=>{ props.gotosuncategoryfun(props.item)}} style={{...StylesGloble.catView}} >
            {
                (props.item.image != '' || props.item.image != null)?(
                    <Image   source={{uri : props.item.image}} style={{height:78,width:79}}/>
                ):(
                    <Image   source={{uri : imagePath.product_deflt_img}} style={{height:78,width:79}}/> 
                )
            }
            <View >
                <Text style={{fontSize:14,fontWeight:"500",color:"#000000",marginTop:5}}>{props.item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    Textcass: {
        fontSize: 22,
        color:"#FFFFFF",
        fontWeight:"600",
      
    },
    textview:{
        position:"absolute",
        left:50,
        top:15,
    },
    backimg:{
        width:20,
        height:20
    },
    searchview:{
        position:"absolute",
        top:15,
        right:10
    }
    
})

export default CategoryComp;
