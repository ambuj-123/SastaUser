import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, StyleSheet,Modal,FlatList,Image,ActivityIndicator, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Orderrigth from '../../assets/img/orderrigth.svg';
import { useSelector,useDispatch } from 'react-redux';
import ApiDataService from "./../../services/Apiservice.service";



const Order = ({ navigation,route }) => {

    const OrderDatalist = useSelector((state) => state.OrderReducer.data);
   
    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;

    const [pageLoad,setpageLoad ]= useState(1);
    const [orderlist,setorderlist]=useState(OrderDatalist);
    const [Activeloading, setActiveloading] = useState(false);
    const [alldataupload,setalldataupload ]= useState(1);

    useEffect(() => {
        setTimeout(()=>{
            setalldataupload(0)
        },100)
    },[])

    const addnewdata = () =>{
        if(Activeloading == false && alldataupload == 0 )
        {
            setActiveloading(true);
            let newpageLoad = Number(pageLoad)+1; 
            setpageLoad(newpageLoad);
            let url = 'orders?order=DESC&order_by=id&row_count=10&page='+pageLoad+'&token='+userToken+"&by_user_id="+userID+"&by_delivery_boy_id=&includes=order_details,product_details";
            console.log(url)
            ApiDataService.Getapi(url).then(response => {
                if(response.data.length > 0)
                {
                    let newarray =[...orderlist,...response.data];
                    setorderlist(newarray);
                }
                else{
                    setalldataupload(1);
                }
                setActiveloading(false);
            }).catch(e => {
                setActiveloading(false);
            });
        }
    }

    const renderFooter = () => {
        return (
            <>
                {
                    Activeloading ? (
                        <View style={style.footer}>
                            <ActivityIndicator
                                color="green"
                                size="large"
                                style={{marginLeft: 8,marginTop:10,fontSize:25}} />
                        </View>
                    ) : null
                }
            </>
        );
    };

    const OrderlistReturn = ({item}) => {
        return (
            <>
                <View style={{position:"relative",paddingVertical:20,borderColor:"#9D9D9D20",borderWidth:1,borderRadius:15,marginTop:15,}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Trackorder')}} style={{...StylesGloble.oneline}}>
                        <Orderrigth width={47} height={47} style={{marginLeft:20}}/>
                        <View style={{width:('60%'),alignSelf:"center"}} >
                            <Text style={{fontSize:16,marginLeft:15,fontWeight:"600",color:"#000000"}}>{item.name}</Text>
                            <Text style={{fontSize:13,fontWeight:"600",marginLeft:15,color:"#9D9D9D"}}>{item.dateTime}</Text>
                            <View style={{...StylesGloble.oneline,marginTop:15}}>
                                <Image  source={item.image}/>
                                <Image  source={item.image}/>
                            </View>
                        </View>
                        <View style={{...StylesGloble.oneline,position:"absolute",top:8,right:10}}>
                            <Text style={{fontSize:16,fontWeight:"600",marginLeft:15,color:"black"}}>₹ {item.price}</Text>
                        </View>
                    </TouchableOpacity> 
                    <View style={{alignItems:"center",justifyContent:"center",borderTopColor:"#9D9D9D20",borderTopWidth:1,marginTop:15}}>
                        <Text style={{fontSize:15,fontWeight:"600",marginTop:15,color:"#9DC45A"}}>Reorder</Text>
                    </View>
                </View>
            </>
        );
    };
    return (
        <>
            <HeaderComp text={'Orders'} navigation={navigation} type={'3'}/>
            <View style={{...StylesGloble.container,position:"relative",paddingLeft:10,paddingRight:10}}>
                {
                    (orderlist)&&(
                        <FlatList
                            numColumns={1}                 
                            data={orderlist}
                            renderItem={({ item }) => <OrderlistReturn item={item} />}
                            keyExtractor={(item, index) => index}
                            onEndReached={addnewdata}
                            onEndReachedThreshold={0}
                            ListFooterComponent={renderFooter}
                        />
                    )
                } 
            </View>
        </>
    );
};

const style = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: "space-around"
    },
    footer:{
        height:50,
    }
});

export default Order;