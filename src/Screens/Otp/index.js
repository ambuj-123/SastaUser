//import liraries
import React, { useEffect, useRef, useContext,useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PermissionsAndroid,Platform,View, Text, StyleSheet,ScrollView,Image, TouchableOpacity } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPTextView from 'react-native-otp-textinput';
import Sclogo from '../../assets/img/sclogo.svg';
import LoadingPage  from './../../helper/LoadingPage';
import ApiDataService from "./../../services/Apiservice.service";
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setUserData,sethomeData} from './../../Redux/index';

const Otp = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const otpInput = useRef(null);
    const [Loading,setLoading ]= useState(false);
    const [mobile,setmobile ]= useState(route.params.mobile);
    const [otp,setotp ]= useState(route.params.otp);



    
    const submitfun = async() =>{
       
        try {
            let body = {
                otp:otpInput.current,
                mobile : mobile,
                type : "user",
                action : "verify_otp"
            }
       
            let otp = otpInput.current;
            let formData = new FormData();
            for (let key in body) {
                formData.append(key, body[key]);
            }
            setLoading(true);
            ApiDataService.Uploadapi('otp/verify-otp',formData).then(response => {
                setLoading(false);
             
                if(response.data.status==1)
                {
                   
                    if(response.data.user_id){
                        let data = {
                            userToken:response.data.token,
                            userID:response.data.user_id
                        }
                        AsyncStorage.setItem('UserBase',JSON.stringify(data));
                        AsyncStorage.setItem('isLogin','1');
                        dispatch(setUserData());
                        dispatch(sethomeData());
                        navigation.navigate('UserStack');
                    }
                    else{
                       
                        navigation.navigate('Signup',{
                            mobile: mobile,
                            otp: otp
                        })
                    }
                }
                else{
                    calltoastmessage(response.data.msg);
                }
            }).catch(e => {
                console.log(e);
            });
            
           
           
        } catch (error) {
            console.log(error);
        }
    }
  
    const resendotp = () =>{
        setLoading(true);
        ApiDataService.Getapi('otp/send/'+mobile).then(response => {
            setLoading(false);
            
            if(response.data.status==1)
            {
                setotp(response.data.otp);
            }
            else{
                calltoastmessage(response.data.msg);
            }
        }).catch(e => {
            console.log(e);
        });
    }
    const calltoastmessage  = (data) => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };
    return (
        <View style={{...StylesGloble.container,...StylesGloble.ScreenHorigental}}>
            {
                Loading&&
                <View style={{position:"absolute",top:0,left:0,height:"100%",width:"115%",zIndex:999999}}>
                    <LoadingPage/>
                </View>
            }
            <View style={{...StylesGloble.widthheight100,...StylesGloble.topheigth}}>
                <Sclogo width={67} height={75} fill={"green"}/>
            </View>
            <View style={{...StylesGloble.widthheight100,...StylesGloble.centerclass,marginTop:hp('3%')}}>
                <View style={{...StylesGloble.oneline}}>
                    <Text style={{...StylesGloble.fontmedium}}>OTP Verification</Text>
                </View>
                <Text style={{...StylesGloble.fontsmall,marginTop:hp('1%'),color:"#9D9D9D"}}>OTP Sent on your number: {mobile} & OTP : {otp}</Text>
            </View>
            <View style={{marginTop:hp('4%')}}>
                <OTPTextView
                    ref={(e) => (otpInput.current = e)}
                    containerStyle={styles.textInputContainer}
                    textInputStyle={styles.roundedTextInput}
                    handleTextChange={(text) =>{ otpInput.current=text}}
                    inputCount={4}
                    tintColor="#9DC45A"
                    offTintColor="#eaf3e0a8"
                    keyboardType="numeric"
                />
            </View>
            <View style={{alignItems:"center",justifyContent:"center",...StylesGloble.widthheight100}}>
                <Text style={{...StylesGloble.fontsmall,color:"#9D9D9D"}}>Haven’t received the verification code?</Text>
                <TouchableOpacity onPress={()=>{resendotp()}}>
                    <Text style={{...StylesGloble.fontsmall,color:"#9DC45A",fontWeight:"600"}}>Resend</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:hp('6%')}}>
                <ButtonField label={'Continue'} submitfun={submitfun}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2fde5',
        padding: 7,
    },
    
    textInputContainer: {
        marginBottom: 20,
        padding:10
       
    },
    roundedTextInput: {
        borderRadius: 10,
        padding:10,
        borderWidth: 2,
        borderBottomWidth:2,
        backgroundColor:"#eaf3e0a8"
      
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '60%',
    },
    
    
  });

export default Otp;