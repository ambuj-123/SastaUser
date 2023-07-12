//import liraries
import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PermissionsAndroid,Platform,View, Text, StyleSheet,Modal,ScrollView,Image, TouchableOpacity } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import TextField  from './../../helper/TextField';
import PasswordTextField  from '../../helper/PasswordTextField';
import Geolocation from '@react-native-community/geolocation';
import Sclogo from '../../assets/img/sclogo.svg';
import LoadingPage  from './../../helper/LoadingPage';
import ApiDataService from "./../../services/Apiservice.service";
import Toast from 'react-native-simple-toast';

const Addmobile = ({ navigation,route }) => {
    const [checkterms,setcheckterms ]= useState(false);
    const [Loading,setLoading ]= useState(false);
    const [secureText,setsecureText ]= useState(true);
    const [inputmobile, setInputmobile] = useState({
        value: null,
        message:'',
        isValid: false,
    });
  

    useEffect(() => {
        const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
        } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getOneTimeLocation();
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
  
    },[])

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {},
            (error) => {
                getOneTimeLocation();
            },
           
        );
    };

    
    const validatemobile = (_in) => {
        try
        {
            setInputmobile(prev => ({ ...prev, value: _in  }));
            if (!_in) {
                setInputmobile(prev => ({ ...prev, isValid: true,message:"Please enter mobile"}));
            }
            else if (_in.length === 0) {
                setInputmobile(prev => ({ ...prev, isValid: true,message:"Please enter mobile"}));
            }
            else if (_in.length < 10) {
                setInputmobile(prev => ({ ...prev, isValid: true,message:"Please enter valid mobile number"}));
            }
            else if (_in.length > 10) {
                setInputmobile(prev => ({ ...prev, isValid: true,message:"Please enter valid mobile number"}));
            }
            else {
                setInputmobile(prev => ({ ...prev, isValid: false,message:''}));
            }
        } catch (error) {
        }
    }
   
    const submitfun = () =>{
        if(inputmobile.isValid == true)
        {
            calltoastmessage("Please enter valid mobile number");
        }
        else{
            setLoading(true);
            
            ApiDataService.Getapi('otp/send/'+inputmobile.value).then(response => {
                setLoading(false);
              
                if(response.data.status==1)
                {
                    navigation.navigate('Otp',{
                        mobile: inputmobile.value,
                        otp: response.data.otp
                    })
                }
                else{
                    calltoastmessage(response.data.msg);
                }
            }).catch(e => {
                console.log(e);
            });
        }
       
    }
    const calltoastmessage  = (data) => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };
   
    return (
        <View style={{...StylesGloble.container,position:"relative", paddingHorizontal:hp('3%')}}>
            {
                Loading&&
                <View style={{position:"absolute",top:0,left:0,height:"100%",width:"115%",zIndex:999999}}>
                    <LoadingPage/>
                </View>
            }
            <View style={{...StylesGloble.widthheight100,...StylesGloble.topheigth,marginTop:hp('12%')}}>
                <Sclogo width={68} height={76} />

            </View>
            <View style={{...StylesGloble.widthheight100,...StylesGloble.centerclass,marginTop:hp('3%')}}>
                <View style={{...StylesGloble.oneline}}>
                    <Text style={{...StylesGloble.fontmedium}}>Shop smart,</Text>
                    <Text style={{...StylesGloble.fontmedium,color:"#9DC45A"}}> save big</Text>
                    <Text style={{...StylesGloble.fontmedium}}> with</Text>
                </View>
                <Text style={{...StylesGloble.fontmedium}}>our premium groceries.</Text>
            </View>
            <View style={{marginTop:hp('8%')}}>
                <TextField 
                    value={inputmobile.value}
                    label="Email"
                    Placeholder='Phone number'
                    type='phone'
                    sectext='false'
                    errorText={inputmobile.message}
                    onChangeText={  mobile => validatemobile(mobile)} />
            </View>
            <View style={{marginTop:hp('6%')}}>
                <ButtonField label={'Continue'} submitfun={submitfun}/>
            </View>
           
            <View style={{alignItems:"center",justifyContent:"center",...StylesGloble.widthheight100,marginTop:hp('5%'),flexDirection:"row"}}>
                <Text style={{...StylesGloble.fontsmall,color:"#A9A9AA"}}>By clicking on “Continue” you are agreeing </Text>
            </View>
            <View style={{alignItems:"center",justifyContent:"center",...StylesGloble.widthheight100,flexDirection:"row"}}>
                <Text style={{...StylesGloble.fontsmall,color:"#A9A9AA"}}>to our </Text>
                <TouchableOpacity onPress={() => {setcheckterms(true);}} >
                    <Text style={{...StylesGloble.fontsmall,color:"#9DC45A"}}>terms of use</Text>
                </TouchableOpacity>
            </View>
            <Modal  animationType="slide" transparent={true} visible={checkterms}>
                <View style={{   height: '100%',  marginTop: 'auto',position:"relative", backgroundColor:'#0e0e0e61'}}>
                    <View style={{position: 'absolute', bottom: 0,width: "100%",left: 0, height: "100%",backgroundColor:'#ffffff',borderTopLeftRadius:30,borderTopRightRadius:30}}> 
                        <View style={{height:"100%",width:"100%",backgroundColor:"#ffffff",justifyContent:"center",alignSelf:"center",position:"relative"}}>
                            <TouchableOpacity  onPress={() => {setcheckterms(false);}}  style={{ position:"absolute",top:20,left:10,zIndex:9999}}>
                                <Image   source={imagePath.closepopup}/>
                            </TouchableOpacity>
                          
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};





export default Addmobile;