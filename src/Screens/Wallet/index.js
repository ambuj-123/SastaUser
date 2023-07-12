import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Redeem from '../../assets/img/redeem.svg';
import Frontaerrow from '../../assets/img/frontaerrow.svg';
import Gpay from '../../assets/img/gpay.svg';



const Wallet = ({ navigation,route }) => {
    const submitfun = () =>{
        
    }
    return (
        <>
            <HeaderComp text={'My Wallet'} navigation={navigation} type={'3'}/>
            <View  style={{...StylesGloble.container, paddingTop:hp('1%'),paddingLeft:10,paddingRight:10}}>
            {/* <ScrollView  nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}> */}
                <ImageBackground style={{width:'100%',height:220}} source={imagePath.Balance}>
                    <View style={{width:'100%',alignItems:"center"}}>
                        <Text style={{fontSize:12,marginTop:60,fontWeight:"400",color:"#FFFFFF"}}>Main balance</Text>
                        <Text style={{fontSize:25,marginTop:5,fontWeight:"900",color:"#FFFFFF"}}>₹14,235.34</Text>
                    </View> 
                       
                    <View style={{width:"100%",height:1,backgroundColor:"#FFFFFF40",marginTop:26}}></View>
                    <View style={{...StylesGloble.oneline,marginTop:15,position:"relative",}}>
                        <View style={{...StylesGloble.oneline,marginLeft:25}}>
                        <Redeem  width={20} height={18}/>
                            <Text style={{fontSize:12,fontWeight:"400",color:"#FFFFFF",marginLeft:10}}>Redeem Voucher</Text>
                        </View>
                        <View style={{position:"absolute",top:3,right:30}}>
                        <Frontaerrow  width={6} height={12}/>
                        </View>
                    </View>
                </ImageBackground>
                
                    <View style={{...StylesGloble.oneline,marginTop:-5}}>
                        <View >
                            <Text style={{fontSize:16,fontWeight:"500",color:"#000000"}}>Add money to SASTA App</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{ navigation.navigate('Category')}} style={{marginLeft:"auto"}}>
                            <Text style={{fontSize:14,fontWeight:"500",color:"#9DC45A"}}>How It works</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"100%",height:'auto',marginTop:15,borderColor:"#C4C4C450",borderRadius:8,borderWidth:1}}>
                        <View style={{padding:10}}>
                            <View style={{width:"100%",backgroundColor:"#9DC45A10",borderRadius:10,paddingVertical:15}}>
                                <Text style={{fontSize:16,marginLeft:10,color:'#000000'}}>₹1000</Text>
                            </View>
                            <View style={{...StylesGloble.oneline,marginTop:15,}}>
                                <View style={{...StylesGloble.outerborderwei2}}>
                                    <Text style={{fontSize:12,color:"#000000",marginLeft:5}}>₹10</Text>
                                </View>
                                <View style={{...StylesGloble.outerborderwei,marginLeft:15}}>
                                    <Text style={{fontSize:12,color:"#000000",marginLeft:5}}>₹500</Text>
                                </View>
                                <View style={{...StylesGloble.outerborderwei,backgroundColor:"#9DC45A",marginLeft:15}}>
                                    <Text style={{fontSize:12,color:"#ffffff",marginLeft:5}}>₹1000</Text>
                                </View>
                            </View>
                            <View style={{marginTop:25}}>
                                <ButtonField label={'Top Up'} submitfun={submitfun}/>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{...StylesGloble.oneline,marginTop:15,marginLeft:5}}>
                        <View  style={{marginLeft:5}}>
                            <Text style={{...StylesGloble.listheading}}>Recent Activity</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft:"auto"}}>
                            <Text style={{...StylesGloble.listviewallfont}}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                    <View style={{...StylesGloble.oneline,marginTop:25}}>
                        <View style={{alignItems:"flex-start",width:'20%'}}>
                        <Gpay  width={66} height={65}/>
                        </View>
                        <View style={{alignItems:"center",width:'60%',justifyContent:"center"}}>
                            <Text style={{fontSize:16,fontWeight:"500",color:"#000000"}}>Cash deposit failure</Text>
                            <Text style={{fontSize:14,fontWeight:"300",color:"#9D9D9D"}}>07/04/2023 at 06:20pm</Text>
                        </View>
                        <View style={{alignItems:"flex-end",width:'20%',justifyContent:"center"}} >
                        <Text style={{fontSize:18,fontWeight:"600",color:"#000000"}}>₹500</Text>
                        </View>
                    </View>
                    <View style={{...StylesGloble.oneline,marginTop:25}}>
                        <View style={{alignItems:"flex-start",width:'20%'}}>
                        <Gpay  width={66} height={65}/>
                        </View>
                        <View style={{alignItems:"center",width:'60%',justifyContent:"center"}}>
                            <Text style={{fontSize:16,fontWeight:"500",color:"#000000"}}>Cash deposit failure</Text>
                            <Text style={{fontSize:12,fontWeight:"300",color:"#9D9D9D"}}>07/04/2023 at 06:20pm</Text>
                        </View>
                        <View style={{alignItems:"flex-end",width:'20%',justifyContent:"center"}} >
                        <Text style={{fontSize:18,fontWeight:"600",color:"#000000"}}>₹500</Text>
                        </View>
                    </View>
                    <View style={{...StylesGloble.oneline,marginTop:25,paddingBottom:20}}>
                        <View style={{alignItems:"flex-start",width:'20%'}}>
                        <Gpay  width={66} height={65}/>
                        </View>
                        <View style={{alignItems:"center",width:'60%',justifyContent:"center"}}>
                            <Text style={{fontSize:16,fontWeight:"500",color:"#000000"}}>Cash deposit failure</Text>
                            <Text style={{fontSize:12,fontWeight:"300",color:"#9D9D9D"}}>07/04/2023 at 06:20pm</Text>
                        </View>
                        <View style={{alignItems:"flex-end",width:'20%',justifyContent:"center"}} >
                        <Text style={{fontSize:18,fontWeight:"600",color:"#000000"}}>₹500</Text>
                        </View>
                    </View>
                    </ScrollView>
                {/* </ScrollView> */}
            </View>

        </>
    );
};



export default Wallet;