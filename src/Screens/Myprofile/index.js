import React, { useEffect, useState, useContext } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ScrollView, Modal, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import ButtonField from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Trashadd from '../../assets/img/trashadd.svg'
import TextField  from './../../helper/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/index';
import ApiDataService from "./../../services/Apiservice.service";
import Toast from 'react-native-simple-toast';
import Uploadimage  from './../../helper/Uploadimage';

const Myprofile = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;
    const username = usaerstate ? usaerstate.fullname : null;
    const userimg = usaerstate ? usaerstate.profile_pic : null;
    const usernumber = usaerstate ? usaerstate.mobile : null;
    const useremail = usaerstate ? usaerstate.email : null;

    const [deletepopup, setdeletepopup] = useState(false);
    const [mobile,setmobile ]= useState(usernumber);
    const [Loading,setLoading ]= useState(false);

    const [imagebox, setimagebox] = useState(false);
    const [uploadimage, setuploadimage] = useState('');
    const [uploadimagename, setuploadimagename] = useState('');

    const [inputname, setInputname] = useState({
        value: username,
        message:'',
        isValid: true,
    });
    const [inputemail, setInputemail] = useState({
        value: useremail,
        message:'',
        isValid: true,
    });

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
    const validateemail = (_in) => {
        try
        {
            setInputemail(prev => ({ ...prev, value: _in  }));
            if (!_in) {
                setInputemail(prev => ({ ...prev, isValid: true,message:"Please enter email"}));
            }
            else if (_in.length === 0) {
                setInputemail(prev => ({ ...prev, isValid: true,message:"Please enter email"}));
            }
            else {
                setInputemail(prev => ({ ...prev, isValid: false,message:''}));
            }
        } catch (error) {
        }
    }
    const submitfun = async() =>{
       
        try {
            if(inputname.isValid == true)
            {
                calltoastmessage("Please enter fullname");
            }
            else if(inputemail.isValid == true)
            {
                calltoastmessage("Please enter email");
            }
            else{
                let body = {
                    action : "update_user",
                    user_id:userID,
                    fullname:inputname.value,
                    email:inputemail.value
                }
                setLoading(true);
                let formData = new FormData();
                for (let key in body) {
                    formData.append(key, body[key]);
                }
                ApiDataService.Uploadapi('users?token='+userToken,formData).then(response => {
                    
                    setLoading(false);
                    if(response.data.status==1)
                    {
                        dispatch(setUserData());
                        navigation.navigate('Home');
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
    const opencamerafun = () =>{
        setimagebox(true);  
    }
    const closeimagepopup = (type,data) =>{
        if(type==1)
        {
            setimagebox(false);
        }
        else
        {
            setimagebox(false);
            convertbs6(data);
        }
    }
    const convertbs6 = (data)=>{
       
        addimagelist(data.assets[0].base64);
    }
    const addimagelist = (source) =>
    {
       
        setLoading(true);
        let body = {
            action : "update_user",
            user_id:userID,
            fullname:inputname.value,
            email:inputemail.value,
            profile_pic:source
        }
        setLoading(true);
        let formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key]);
        }
        ApiDataService.Uploadapi('users?token='+userToken,formData).then(response => {
            setLoading(false);
            if(response.data.status==1)
            {
                dispatch(setUserData());
                navigation.navigate('Home');
            }
            else{
                calltoastmessage(response.data.msg);
            }
            
        }).catch(e => {
            console.log(e);
        });
    }
    return (
        <>
            <HeaderComp text={'My Account'} navigation={navigation} type={'3'} />
            <View style={{ ...StylesGloble.container, position: "relative", paddingLeft: 20, paddingRight: 20 }}>
                <ScrollView  nestedScrollEnabled={false} contentContainerStyle={{paddingBottom:10}}>
                    <View style={{height:130,width:"100%",marginTop:12,alignItems:"center",justifyContent:"center"}}>
                        <View style={{height:132,width:132,borderRadius:80,borderColor:"#9DC45A",borderWidth:2 }}>
                            <TouchableOpacity onPress={() => opencamerafun()}>
                                {
                                    (userimg != undefined || userimg != null || userimg != '') ? (
                                        <Image style={{ width: 128, height: 128,borderRadius:80}} source={{ uri: userimg }} />
                                    ) : (
                                        <Image style={{ width: 128, height: 128,borderRadius:80  }} source={imagePath.smallproimg} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500",marginBottom: 5, color: "black", }}>Name</Text>
                        <View>
                            <TextField
                                value={inputname.value}
                                label=""
                                Placeholder='Name'
                                type='text'
                                sectext='false'
                                errorText={inputname.message}
                                onChangeText={name => validatename(name)} />
                        </View>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5, color: "black", }}>Phone Number</Text>
                        <View style={{ width: "100%", backgroundColor: "#F5F5F5", borderRadius:5, paddingVertical: 20,flexDirection: "row" }}>
                            
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, marginTop: 0, color: 'black', fontWeight: "400" }}>+91 {mobile}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5, color: "black", }}>Email ID</Text>
                        <View >
                            <TextField
                                value={inputemail.value}
                                label=""
                                Placeholder='Email'
                                type='email'
                                sectext='false'
                                errorText={inputemail.message}
                                onChangeText={name => validateemail(name)} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { setdeletepopup(true); }} style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, marginTop: 0, color: "#FE5B5B", fontWeight: "500" }}>Delete Account</Text>
                    </TouchableOpacity>
                    <View style={{ width: wp("90%"), alignSelf: 'center',marginTop:20 }}>
                        <ButtonField label={'Update Profile'} submitfun={submitfun} />
                    </View>
                    {
                        imagebox && (
                            <Uploadimage closeimagepopup={closeimagepopup} />
                        )
                    }    
                </ScrollView>
            </View>
            <Modal animationType="slide" transparent={true} visible={deletepopup}>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%", backgroundColor: "#1c191938" }} onPress={() => {
                    setdeletepopup(false); }}>
                    <View  ></View>
                </TouchableOpacity>
                <View style={{ position: "absolute", top: hp('20%'), right: wp('6%'), width: wp('90%'), height: 'auto', backgroundColor: '#ffffff', borderRadius: 20, alignItems: "center", paddingBottom: 50 }}>
                    <Trashadd width={34} height={34} style={{ marginTop: 25 }} />
                    <Text style={{ fontSize: 24, fontWeight: "600", color: "#000000", marginTop: 25 }}>Are you sure you want to</Text>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: "#000000" }}>delete your account?</Text>
                    <View style={{ marginTop: hp('3%'), width: wp('86%') }}>
                        <View style={{ flexDirection: "row", marginTop: 25 }}>
                            <TouchableOpacity onPress={() => { setdeletepopup(false); }} style={{ borderRadius: 50, marginLeft: "8%", width: "40%", borderColor: "#9DC45A", borderWidth: 2, paddingVertical: 15, alignItems: "center" }}>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "#000000", alignItems: "center" }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setdeletepopup(false); }} style={{ borderRadius: 50, width: "40%", marginLeft: "6%", backgroundColor: "#9DC45A", paddingVertical: 15, alignItems: "center" }}>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFFFFF", alignItems: "center" }}>Yes delete it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};



export default Myprofile;