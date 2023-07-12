import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Homeadd from '../../assets/img/homeadd.svg';
import Editadd from '../../assets/img/editadd.svg';
import Trashadd from '../../assets/img/trashadd.svg';
import LoadingPage  from './../../helper/LoadingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiDataService from "./../../services/Apiservice.service";
import { useSelector,useDispatch} from 'react-redux';
import { setorderData } from './../../Redux/index';
import Toast from 'react-native-simple-toast';

const checkaddfun = (data) =>{
    if(data==null)
    {
        return null;
    }else if(data=='')
    {
        return null;
    }else if(data==undefined)
    {
        return null;
    }
    else{
        let text = data.address;
        let titleindex = text.indexOf(",");
        let title = text.slice(6,titleindex);
        let addressindexst = text.indexOf(",fulladdress=")+13;
        let addressindexend = text.indexOf(",housenumber=");
        let addressfull = text.slice(addressindexst,addressindexend);

        let fulladdress = [{
            title:title,
            address:addressfull
        }]
        return fulladdress;
    }


}

const Address = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const pagename = route.params.type;
    const [Loading,setLoading ]= useState(false);

    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;

    const CartData = useSelector((state) => state.CartReducer.data);
    const [cartsavedata,setcartsavedata]= useState('');

    const useraddress = usaerstate ? usaerstate.address : null;
    const newadddress = checkaddfun(useraddress);
    const [ deletepopup,setdeletepopup ] = useState(false);

    useEffect(()=>{
       
        if(CartData){
            if(CartData != null){
                let  cartData =  CartData;
                let newcartdataIds = [];
                for(let i=0;i < cartData.length;i++){
                    let datafun ={
                        product_id:cartData[i].ProductId,
                        quantity:cartData[i].cartqty
                    }
                    newcartdataIds.push(datafun)
                }
                setcartsavedata(newcartdataIds);
            }
        }
    },[CartData])

    const submitfun = () =>{
        AsyncStorage.getItem('SendOrderData', (err, credentials) => {
            let  orderdata =  JSON.parse(credentials);
            let body = {
                action : "add_new_order",
                user_id:userID,
                order_details:cartsavedata,
                state:'state',
                city:'city',
                pincode:'486001',
                used_coupon:orderdata.couponcode,
                actual_price:orderdata.cartTotalprice,
                discount:orderdata.couponamt,
                area : newadddress[0].address,
                payment_option:"COD",
                payment_status:"pending",
                delivery_instructions:"delivery_instructions"
                
            }
            setLoading(true);
            let formData = new FormData();
            for (let key in body) {
                formData.append(key, body[key]);
            }
            ApiDataService.Uploadapi('orders?token='+userToken,formData).then(response => {
                setLoading(false);
                if(response.data.status==1)
                {
                    //AsyncStorage.removeItem('Cartdata');
                    //dispatch(setorderData());
                    navigation.navigate('Orderconfirm',{orderId:response.data.order_id});
                }
                else{
                    calltoastmessage(response.data.msg);
                }
            }).catch(e => {
                setLoading(false);
                console.log("error",e);
            });

        })
        //navigation.navigate('Payment')
    }
    const calltoastmessage  = (data) => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };
    return (
        <>
            <HeaderComp text={'Address'} navigation={navigation} type={'3'}/>
            <View style={{...StylesGloble.container,position:"relative",paddingLeft:10,paddingRight:10,}}>
                {
                    Loading&&
                    <View style={{position:"absolute",top:0,left:0,height:"100%",width:"115%",zIndex:999999}}>
                        <LoadingPage/>
                    </View>
                }
                <TouchableOpacity onPress={() =>{ navigation.navigate('AddAddress') }} style={{...StylesGloble.oneline,borderBottomColor:"#9D9D9D20",borderBottomWidth:1,paddingTop:15,paddingBottom:15}}>
                    <Text style={{fontSize:20,fontWeight:"500",color:"#9DC45A",marginTop:0}}>+</Text>
                    <Text style={{fontSize:20,fontWeight:"500",color:"#9DC45A",marginLeft:10}}>Add New Address</Text>
                </TouchableOpacity>
                {
                    (newadddress !=null)?(
                        newadddress.map((item,index)=>
                        <View key={index} style={{...StylesGloble.oneline,paddingVertical:25,position:"relative"}}>
                            <View style={{width:"20%"}}>
                                <Homeadd width={47} height={47}  />
                            </View>
                            <View style={{width:"60%",marginLeft:10}}>
                                <Text style={{fontSize:14,fontWeight:"500",color:"#000000"}}>{item.title}</Text>
                                <Text style={{fontSize:12,fontWeight:"400",color:"#9D9D9D"}}>{item.address}</Text>
                            </View>
                            <View style={{position:"absolute",top:40,right:0,...StylesGloble.oneline,width:"20%",}}>
                                <TouchableOpacity onPress={() =>{ navigation.navigate('AddAddress') }} >
                                <Editadd  />
                            </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{ setdeletepopup(true); }}>
                                    <Trashadd  />
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    ):(
                        <></>
                    )
                }
                {
                    (pagename==1)?(
                        <View style={{height:63,marginTop:40,position:"absolute",bottom:0,left:"5%",width:"90%"}}>
                            <ButtonField label={'Checkout'} submitfun={submitfun}/>
                        </View>
                    ):(
                        <></>
                    )
                }
            </View>
            <Modal  animationType="slide" transparent={true} visible={deletepopup}>
                <TouchableOpacity style={{position: 'absolute',bottom: 0,width:'100%',height:"100%",backgroundColor:"#1c191938"}} onPress={() =>{
                        setdeletepopup(false); }}>
                    <View  ></View>
                </TouchableOpacity>
                <View style={{position: "absolute", top: hp('20%'),  right:wp('6%'),width:wp('90%'),height:'auto',backgroundColor:'#ffffff',borderRadius:20,alignItems:"center",paddingBottom:50}}> 
                    <Trashadd width={34} height={34} style={{marginTop:25}} />
                    <Text style={{fontSize:24,fontWeight:"600",color:"#000000",marginTop:25}}>Are you sure you want to</Text>
                    <Text style={{fontSize:24,fontWeight:"600",color:"#000000"}}>delete this address?</Text>
                    <View style={{marginTop:hp('3%'),width:wp('86%')}}>
                        <View style={{flexDirection:"row",marginTop:25}}>
                            <TouchableOpacity onPress={() =>{  setdeletepopup(false); }} style={{borderRadius:50,marginLeft:"8%",width:"40%",borderColor:"#9DC45A",borderWidth:2,paddingVertical:15,alignItems:"center"}}>
                                <Text style={{fontSize:15,fontWeight:"600",color:"#000000",alignItems:"center"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{ setdeletepopup(false); }} style={{borderRadius:50,width:"40%",marginLeft:"6%",backgroundColor:"#9DC45A",paddingVertical:15,alignItems:"center"}}>
                                <Text style={{fontSize:15,fontWeight:"600",color:"#FFFFFF",alignItems:"center"}}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};



export default Address;