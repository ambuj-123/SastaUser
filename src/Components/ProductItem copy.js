
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import imagePath from '../constants/imagePath';
import { StylesGloble } from '../helper/Globlecss';

import Addpro from '../assets/img/addpro.svg';
import { setcartData,setproductdtlData,setproductData} from '../Redux/index';
import { useSelector, useDispatch } from 'react-redux';
import Cartminus from '../assets/img/cartminus.svg';
import Cartplus from '../assets/img/cartplus.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cartcheck = (Data,id)=>{
    if(Data){
        if(Data == null){
           return 0;
        }
        else{
            if(Data == ''){
                return 0;
            }
            else{
                if(Data.length > 0){
                    let value = 0
                    for(let i=0; i < Data.length; i++){
                        if(Data[i].ProductId==id){
                            value = Data[i].cartqty;
                        }
                    }
                    return value;
                }
                else{
                    return 0;
                }
            }
        }
    }
    else{
        return 0;
    }   
       
}
const checkcartdatav = (Data) =>{
    console.log("--------------------",Data)
    if(Data){
        if(Data == null){
           return false;
        }
        else{
            if(Data == ''){
                return false;
            }
            else{
                if(Data.length > 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
    else{
        return false;
    }
}


const ProductItem = ({item,navigation}) => {
    const dispatch = useDispatch();
    const CartData = useSelector((state) => state.CartReducer.data);
    console.log("--------------------",CartData)
    const [cartcount,setcartcount] = useEffect(0); 

   
    const gotoproductdetls = (item)=>{
        dispatch(setproductdtlData(item.id));
        navigation.navigate('Poductdetils');
    }

    // const addremovefuncart = (type,item)=>{
    //     let quty = cartcount;
    //     if(type=='1'){
    //         quty = quty - 1;
    //     }
    //     else{
    //         quty = quty + 1;
    //     }
    //     if(checkcartdatav(CartData)==true){
    //         for(let j=0;j < cartalldata.length;j++){
    //             var proqrt = cartalldata[j].qty;
    //             var totalPrice = Number(cartalldata[j].qty)*Number(cartalldata[j].price);
    //             if(cartalldata[j].ProductId==item.id){
    //                 totalPrice = Number(quty)*Number(cartalldata[j].price);
    //                 proqrt = quty;
    //             }
    //             var  value = {
    //                 userId:cartalldata[j].userID,
    //                 ProductId:cartalldata[j].ProductId,
    //                 size:cartalldata[j].size,
    //                 qty:proqrt,
    //                 price:cartalldata[j].price,
    //                 totalPrice:totalPrice,
    //                 name:cartalldata[j].name,
    //                 image:cartalldata[j].image,
    //                 stock:cartalldata[j].min_stock_alert
    //             }
    //             Newprolist.push(value)
    //         }
    //         let  newcartdata = [];
    //         for(let j=0;j < Newprolist.length;j++){
    //             let  makecartdata ={
    //                 userId:Newprolist[j].userId,
    //                 ProductId:Newprolist[j].ProductId,
    //                 Size:Newprolist[j].size,
    //                 cartqty:Newprolist[j].qty
    //             } 
    //             newcartdata.push(makecartdata);
    //         }
    //         setcartcount(quty);
    //         AsyncStorage.setItem('Cartdata',JSON.stringify(newcartdata));
    //     }
    //     else{
    //         let  newcartdata = [];
    //         let  makecartdata ={
    //             userId:Newprolist[j].userId,
    //             ProductId:Newprolist[j].ProductId,
    //             Size:Newprolist[j].size,
    //             cartqty:Newprolist[j].qty
    //         } 
    //         newcartdata.push(makecartdata);
    //         AsyncStorage.setItem('Cartdata',JSON.stringify(newcartdata));
    //         setcartcount(quty);
    //     }
        
       
    // }


    return (
        <TouchableOpacity onPress={()=>{ gotoproductdetls(item)}} style={{...StylesGloble.productView,height:200}} >
            {
                (item.image != '' || item.image != null)?(
                    <Image style={{...StylesGloble.productimg}}  imageStyle={{alignItems:"center"}} source={{uri :item.image}} />
                ):(
                    <Image style={{...StylesGloble.productimg}}  imageStyle={{alignItems:"center"}} source={imagePath.meat} />                
                ) 
            }
            <View style={{...StylesGloble.productviewdata,}}>
                <Text numberOfLines={2} style={{fontSize:13,fontWeight:"500",marginTop:5,color:"#000000",width:150}}>{item.name}</Text>
                <Text style={{...StylesGloble.fontsmallsimple,color:"#000000",marginTop:0,fontSize:10}}>{item.category_id}</Text>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:0,color:"#9DC45A"}}>₹ {item.price}</Text>
            </View>
            {/* {
                (cartcount==0)?(
                    <TouchableOpacity style={{...StylesGloble.addbutton,}}>
                        <Addpro style={{...StylesGloble.productimg}}  />
                    </TouchableOpacity>
                ):( */}
                    <View style={{...StylesGloble.oneline,position:"absolute",top:40,right:-2}}>
                        <TouchableOpacity onPress={()=>{ addremovefuncart('1',item)}} style={{marginLeft:10}}>
                            <Cartminus/>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,color:"#000000",marginLeft:10}}> {cartcount}</Text>
                        <TouchableOpacity onPress={()=>{ addremovefuncart('2',item)}}  style={{marginLeft:10,right:2}}>
                            <Cartplus/>
                        </TouchableOpacity>
                    </View>
                {/* )
            } */}
        </TouchableOpacity>
    );
};


export default ProductItem;
