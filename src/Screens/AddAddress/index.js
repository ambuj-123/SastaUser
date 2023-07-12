import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid,Platform,TextInput,View,Modal, Text, StyleSheet,ScrollView,Image, TouchableOpacity } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Mapcomponent  from './../../helper/Mapcomponent';
import Toast from 'react-native-simple-toast';
import MapView, {Marker} from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/index';
import { GOOGLE_MAP_API } from "../../services/Apiurl";
import ApiDataService from "./../../services/Apiservice.service";
import LoadingPage  from './../../helper/LoadingPage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';




const latlnglist = [
    {   "lat": "22.7532848",
        "lang": "75.8936962" 
    }
]
const AddAddress = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const [ currentLongitude, setCurrentLongitude ]  = useState(0);
    const [ currentLatitude, setCurrentLatitude ] = useState(0);
    const [Loading,setLoading ]= useState(false);
    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;
    const useraddress = usaerstate ? usaerstate.address : null;
    const username = usaerstate ? usaerstate.fullname : null;

   
    const [Title,setTitle]= useState('');
    const [checkaddtilte,setcheckaddtilte]=useState(0);

    const [ housenumber,sethousenumber ]= useState('');
    const [ Landmark,setLandmark ]= useState('');

    const [ fulladdress,setfulladdress]= useState('');
    const [ addresslat,setaddresslat]= useState('');
    const [ addresslng,setaddresslng]= useState('');


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
  
    },[currentLongitude])

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrentLongitude(position.coords.longitude);
                setCurrentLatitude(position.coords.latitude);
            },
            (error) => {
                getOneTimeLocation();
            },
           
        );
    };
    const calltoastmessage  = (data) => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };
    const submitfun = () =>{
        if(Title=='' || Title==null ||Title == undefined){
            calltoastmessage('Please add title');
        }
        else if(housenumber =='' || housenumber==null ||housenumber == undefined){
            calltoastmessage('Please add House Number & Floor');
        }
        else if(Landmark =='' || Landmark==null ||Landmark == undefined){
            calltoastmessage('Please add Near by Landmark');
        }
        else if(fulladdress =='' || fulladdress==null ||fulladdress == undefined){
            calltoastmessage('Please add full address');
        }
        else{
          
            let addressdata = "title="+Title+",fulladdress="+fulladdress+",housenumber="+housenumber+",Landmark="+Landmark;
            let body = {
                action : "update_user",
                user_id:userID,
                address : addressdata,
                latitude:addresslat,
                longitude:addresslng,
                fullname:username,
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
                    navigation.navigate('Address');
                }
                else{
                    calltoastmessage(response.data.msg);
                }
            }).catch(e => {
                console.log("error",e);
            });
        }
        
    }
    const checktitlefun = (type) =>{
        if(type=='1'){
            setTitle('Home');
            setcheckaddtilte(1);
        }else if(type=='2'){
            setTitle('Work');
            setcheckaddtilte(2);
        }else{
            setcheckaddtilte(3);
            setTitle('');
        }
    }
    const onPlaceSelected =  (data,details)=>{
        setfulladdress(data.description);
        setaddresslat(details.geometry.location.lat);
        setaddresslng(details.geometry.location.lng);
    }
   
    return (
        <View style={{height:"100%",width:"100%",position:"relative"}}>
            <HeaderComp text={'Add Address'} navigation={navigation} type={'3'}/>
            {
                Loading&&
                <View style={{position:"absolute",top:0,left:0,height:"100%",width:"115%",zIndex:999999}}>
                    <LoadingPage/>
                </View>
            }
            <View style={{width:"100%",height:"42%"}}>
                <MapView
                    style={{width:wp('100%'),height:hp('100%')}}
                    showsUserLocation={false}  
                    zoomEnabled={true}  
                    zoomControlEnabled={false}  
                    initialRegion={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>
            </View>
            <View style={{position: "absolute", top: 100,zIndex:55,  right: "5%",width:'90%',height:'auto',backgroundColor:'#ffffff',borderRadius:10}}> 
                <GooglePlacesAutocomplete
                    placeholder='Search address'
                    fetchDetails={true}
                    onPress={(data,details) => {
                        onPlaceSelected(data,details)
                    }}
                    query={{
                        key: GOOGLE_MAP_API,
                        language: 'en',
                        region: 'IN',
                    }}
                    styles={{
                        container: {
                            flex: 1,
                            height:'100%',
                            padding:5,
                            marginTop:0,
                            width:"100%"
                        },
                        textInputContainer: {
                            flexDirection: 'row',
                        },
                        textInput: {
                            backgroundColor: '#FFFFFF',
                            height: 50,
                            borderRadius: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            fontSize: 18,
                            flex: 1,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                        poweredContainer: {
                            justifyContent: 'flex-end',
                            backgroundColor:"red",
                            alignItems: 'center',
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderColor: '#c8c7cc',
                            borderTopWidth: 0.5,
                            backgroundColor: '#edf0f1',
                            marginLeft:"5%",
                            width:"90%",
                            padding:15,
                            height:'100%',
                        },
                        powered: {},
                        listView: {},
                        row: {
                            zIndex:9999,
                            padding: 13,
                            height: 50,
                            color:"#000000",
                            flexDirection: 'row'
                        },
                        separator: {
                            height: 0.5,
                            backgroundColor: '#c8c7cc',
                        },
                        description: {},
                        loader: {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            height: 20,
                        },
                    }}/>
            </View>
            <View style={{width:wp('100%'),height:'auto',backgroundColor:'#ffffff',borderTopStartRadius:30,borderTopEndRadius:30}}> 
                    <View style={{paddingTop:15,paddingBottom:10,borderBottomWidth:1,marginHorizontal:18,borderBottomColor:'#c4c4c450'}}>
                        <Text style={{fontSize:15,fontWeight:"500",color:"#000000"}}>Enter complete address</Text>
                    </View>
                    <View style={{marginTop:5,width:wp("90%"),paddingHorizontal:wp('5%'),marginBottom:15,marginTop:20}}>
                        <Text style={{fontSize:12 ,color:"#000000",fontWeight:"500"}}>Save address as</Text>
                        <View style={{...StylesGloble.oneline,marginTop:15,marginLeft:-12}}>
                            <TouchableOpacity onPress={()=>{checktitlefun(1)}}   style={[StylesGloble.outerborderwei,checkaddtilte==1 ? styles.green : styles.white ]}>
                                <Text style={{fontSize:11,color:"#000000",marginLeft:5}}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{checktitlefun(2)}}  style={[StylesGloble.outerborderwei,checkaddtilte==2 ? styles.green : styles.white ]}>
                                <Text style={{fontSize:11,color:"#000000",marginLeft:5}}>Work</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ checktitlefun(3) }} style={[StylesGloble.outerborderwei, checkaddtilte==3 ? styles.green : styles.white ]}>
                                <Text style={{fontSize:11,color:"#000000",marginLeft:5}}>Other</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            checkaddtilte==3&&
                            <View style={{...StylesGloble.oneline,marginTop:10,marginLeft:0,borderColor:"#d7d7d7",width:170,padding:5}}>
                                <TextInput style={{borderBottomColor:"#9DC45A",borderBottomWidth:1,width:150}}  onChangeText={(text)=>setTitle(text)} value={Title}/>
                            </View>
                        }
                    </View>
                    <View style={{...StylesGloble.outerborderwei3,marginLeft:10,margin:5,marginHorizontal:10,alignItems:"flex-start"}}>
                        <TextInput placeholder="House Number & Floor" onChangeText={(text)=>setLandmark(text)} value={Landmark}  placeholderTextColor='#9D9D9D'  style={{color:"black"}}/>
                    </View>
                    <View style={{...StylesGloble.outerborderwei3,marginLeft:10,margin:5,marginHorizontal:10,alignItems:"flex-start"}}>
                        <TextInput placeholder="Near by Landmark"  onChangeText={(text)=>sethousenumber(text)} value={housenumber}  placeholderTextColor='#9D9D9D' style={{color:"black"}}/>
                    </View>
                    
                    
                    <View style={{marginTop:6,margin:15}}>
                        <ButtonField label={'Save Address'} submitfun={submitfun}/>
                    </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    green: {
        borderColor: '#9DC45A',
    },
    white: {
        borderColor:"#c4c4c450",
    }
});

export default AddAddress;