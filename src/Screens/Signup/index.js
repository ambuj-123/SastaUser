//import liraries
import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PermissionsAndroid,Platform,View, Text, StyleSheet,ScrollView,Image, TouchableOpacity } from 'react-native';
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
import { useDispatch } from 'react-redux';
import { setUserData,sethomeData} from './../../Redux/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const emailicon = imagePath.emailicon;
const Genderlist = [{name:"Male",value:"M"},{name:"Female",value:"F"}]


const Signup = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const [checkterms,setcheckterms ]= useState(false);
    const [secureText,setsecureText ]= useState(true);
    const [mobile,setmobile ]= useState(route.params.mobile);
    const [otp,setotp ]= useState(route.params.otp);
    const [Loading,setLoading ]= useState(false);
    
    const [inputname, setInputname] = useState({
        value: null,
        message:'',
        isValid: true,
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

    
    
    const validatename = (_in) => {
        try
        {
            setInputname(prev => ({ ...prev, value: _in  }));
            if (!_in) {
                setInputname(prev => ({ ...prev, isValid: true,message:"Please enter name"}));
            }
            else if (_in.length === 0) {
                setInputname(prev => ({ ...prev, isValid: true,message:"Please enter name"}));
            }
            else {
                setInputname(prev => ({ ...prev, isValid: false,message:''}));
            }
        } catch (error) {
        }
    }
    const calltoastmessage  = (data) => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };
    const submitfun = async() =>{
       
        try {
            if(inputname.isValid == true)
            {
                calltoastmessage("Please enter fullname");
            }
            else{
                let body = {
                    fullname:inputname.value,
                    action : "add_new_user"
                }
               
                let formData = new FormData();
                for (let key in body) {
                    formData.append(key, body[key]);
                }
                setLoading(true);
                ApiDataService.Uploadapi('users',formData).then(response => {
                    setLoading(false);
                   
                    if(response.data.status==1)
                    {
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
                        calltoastmessage(response.data.msg);
                    }
                }).catch(e => {
                    console.log("error",e);
                });
            }
           
           
        } catch (error) {
            console.log(error);
        }
    }
   
   
    return (
        <View style={{...StylesGloble.container,...StylesGloble.ScreenHorigental}}>
            {
                Loading&&
                <View style={{position:"absolute",top:0,left:0,height:"100%",width:"115%",zIndex:999999}}>
                    <LoadingPage/>
                </View>
            }
            <View style={{...StylesGloble.widthheight100,...StylesGloble.topheigth}}>
                <Sclogo width={67} height={75} fill={"#9DC45A"} />

            </View>
            <View style={{...StylesGloble.widthheight100,...StylesGloble.centerclass,marginTop:hp('2%')}}>
                <View style={{...StylesGloble.oneline}}>
                    <Text style={{...StylesGloble.fontmedium}}>Become a </Text>
                    <Text style={{...StylesGloble.fontmedium,color:"#9DC45A"}}>grocery guru</Text>
                </View>
                <Text style={{...StylesGloble.fontmedium}}>& save big.</Text>
                <Text style={{...StylesGloble.fontsmall,marginTop:hp('2%')}}>Plaese Add your Fullname.</Text>
            </View>
            <View style={{marginTop:hp('5%')}}>
                <TextField 
                    value={inputname.value}
                    label=""
                    Placeholder='Name'
                    type='text'
                    sectext='false'
                    errorText={inputname.message}
                    onChangeText={  name => validatename(name)} />
            </View>
            
           
            <View style={{marginTop:hp('5%'),alignItems:"center",justifyContent:"center"}}>
               <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Text style={{...StylesGloble.fontsmall}}>By continuing you you agree to our</Text>
                    <View style={{flexDirection:"row",marginTop:hp('1%')}}>
                        <TouchableOpacity>
                            <Text style={{...StylesGloble.fontsmall,color:"#9DC45A"}}> Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={{...StylesGloble.fontsmall}}>  and  </Text>
                        <TouchableOpacity>
                            <Text style={{...StylesGloble.fontsmall,color:"#9DC45A"}}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
               </View>
               
            </View>

            <View style={{marginTop:hp('3%')}}>
                <ButtonField label={'Submit'} submitfun={submitfun}/>
            </View>
           
            {/* <View style={{alignItems:"center",justifyContent:"center",...StylesGloble.widthheight100,padding:15,marginTop:hp('3%'),flexDirection:"row"}}>
                <Text style={{...StylesGloble.fontsmall,marginLeft:10}}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={{...StylesGloble.fontsmall,color:"#9DC45A"}}> Sign In</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};





export default Signup;