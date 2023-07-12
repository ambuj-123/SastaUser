import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import ProductItem from '../../Components/ProductItem';
import Sliderdata  from './sliderdata.js';
import Cartminus from '../../assets/img/cartminus.svg';
import Cartplus from '../../assets/img/cartplus.svg';
import Rating from '../../assets/img/rating4.svg';
import { useSelector,useDispatch} from 'react-redux';
import { setcartData } from './../../Redux/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiDataService from "./../../services/Apiservice.service";


const imagelistfun = (image,Sliderimg) =>{
   

    var value = [];
    if(Sliderimg!=[] || Sliderimg!=null || Sliderimg!='')
    {
        if(Sliderimg.length > 0)
        {
            value = Sliderimg;
        }
        else{
            value = [image];
        }
    }
    else if( image!=null && image!=''){
        value = [image];
    }
    else{
        value = ['https://aliveztechnosoft.com/python-automations/GroceryApp/product-images/1686914068.png']
    }
    
    return value;
}
const dummay = {
    "id": "",
    "category_id": "",
    "brand_id": "",
    "offer_id": "",
    "is_trending": "",
    "is_best_deal": "",
    "suggested_of": "",
    "name": "",
    "image": "",
    "description": "",
    "similar_products": "",
    "recommended_products": "",
    "mrp": "",
    "price": "",
    "discount": "",
    "feature_name": "",
    "order_by": "",
    "enabled": "",
    "sku_value": "",
    "available_stock": "",
    "max_quantity_per_order": "",
    "min_stock_alert": "",
    "out_of_stock_action": "",
    "category_Name": "",
    "brand_name": "",
    "feature_values": [],
    "slider_images": []
}
const checkcartdatav = (Data) =>{
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
const Poductdetils = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;

    const homestate = useSelector((state) => state.HomeReducer.data);
    const bestDealslist =  homestate?homestate.best_deals:null;

    const ProductdtlDataRe = useSelector((state) => state.ProductdtlReducer.data);
    const ProductdtlData =ProductdtlDataRe?ProductdtlDataRe:dummay;
    
    const CartData = useSelector((state) => state.CartReducer.data);
    const Slideimagecome = ProductdtlData.Sliderimg?ProductdtlData.Sliderimg:'';
    const Imagecome = ProductdtlData.image?ProductdtlData.image:'';
    const Sliderimg = imagelistfun(Imagecome,Slideimagecome); 
    const Proname = ProductdtlData.name?ProductdtlData.name:'';
    const Mrp = ProductdtlData.name?ProductdtlData.mrp:'';
    const Price = ProductdtlData.name?ProductdtlData.price:'';
    const Discount = ProductdtlData.name?ProductdtlData.discount:'';
    const Featurename = ProductdtlData.feature_name?ProductdtlData.feature_name:'';
    const Featurevalues = ProductdtlData.feature_values?ProductdtlData.feature_values:'';
    const Description = ProductdtlData.description?ProductdtlData.description:'';


    const [deslenght,setdeslenght]= useState(Description?Description.length:0);
    const [showdescri,setshowdescri]= useState(0);
    const [showdesDesc,setshowdesDesc]= useState('');
    const [cartval,setcartval]=useState(1);
    const [skletonshow, setskletonshow] = useState(1);
    const [suggestdata,setsuggestdata]= useState('');
    const [sizeval,setsizeval]=useState('');

    useEffect(() => {
        setTimeout(()=>{
            setskletonshow(2)
        },2000)
    },[])

    useEffect(()=>{
        if(deslenght > 118)
        {
            setshowdesDesc(Description.slice(0,118))
        }
        else{
            setshowdesDesc(Description)
        }
    },[])

    useEffect(()=>{
        
        if(CartData != null && CartData != '' ){
            let  cartData =  CartData;
            for(let i=0;i < cartData.length;i++){
                if(cartData[i].ProductId==ProductdtlData.id){
                    setcartval(cartData[i].cartqty)
                } 
            }
            
        }
    },[CartData])

    useEffect(()=>{
       callsuggestfun();
    },[])
    const callsuggestfun = ()=>{
        let url = 'products?order=DESC&order_by=id&row_count=7&page=1&token='+userToken+'&include_similar_products=0&include_recommended_products=0';
        ApiDataService.Getapi(url).then(response =>{
            
            if(checkcartdatav(response.data)==true){
                let cartdatafu = response.data;
                setsuggestdata(cartdatafu)
            }
        });

    }

   
    const Readmorefun = (ty) =>{
        setshowdescri(ty);
        if(ty == '0')
        {
            setshowdesDesc(Description.slice(0,118))
        }
        else{
            setshowdesDesc(Description)
        }
    }

    const addremovefuncart = (type)=>{
        if(type=='1'){
            if(cartval > 1)
            {
                let newcartval = cartval - 1;
                setcartval(newcartval);
            }
        }
        else{
            if(cartval < 10)
            {
                let newcartval = cartval + 1;
                setcartval(newcartval);
            }
        }
    } 
    
    
    const submitfun = () =>{
       
        let  makecartdata ={
            userId:userID,
            ProductId:ProductdtlData.id,
            Size:sizeval,
            cartqty:cartval
        } 
        AsyncStorage.getItem('Cartdata', (err, credentials) => {
            let  cartData =  JSON.parse(credentials);
            
            let  newcartdata = [];
            if(cartData == null || cartData == '' || cartData == []){
                newcartdata.push(makecartdata);
            }else{
                for(let i=0;i < cartData.length;i++){
                    if(cartData[i].ProductId!=ProductdtlData.id){
                        newcartdata.push(cartData[i])
                    }
                }
                newcartdata.push(makecartdata);
            }
            AsyncStorage.setItem('Cartdata',JSON.stringify(newcartdata));
            dispatch(setcartData());
        })
        navigation.navigate('Cartscreen')
    }
    return (
        <>
            <HeaderComp text={''} navigation={navigation} type={'2'}/>
            {
                skletonshow==1&&
                <View style={{width:"100%",height:'100%' , position: "relative"}}>
                    <SkeletonPlaceholder borderRadius={4}  >
                        <TouchableOpacity style={{ marginTop: 12, marginLeft: -1, width: "99%",height:270 }}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={'90%'} height={250} borderRadius={20}/>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 25, marginTop: 8 }}>
                            <View style={{flexDirection:"row",width:"100%"}}>
                                <View style={{width:"80%"}}>
                                    <SkeletonPlaceholder.Item width={120} height={20}/>
                                    <SkeletonPlaceholder.Item width={80} height={20}  marginTop={15} />
                                    <SkeletonPlaceholder.Item width={80} height={20}  marginTop={15} />
                                    <SkeletonPlaceholder.Item width={80} height={20}  marginTop={15} />
                                    <SkeletonPlaceholder.Item width={80} height={20}  marginTop={15} />
                                </View>
                                <View style={{width:"40%"}}>
                                    <SkeletonPlaceholder.Item width={60} height={20}  marginTop={15} />
                                    <SkeletonPlaceholder.Item width={60} height={20}  marginTop={15} />
                                </View>
                            </View>
                            
                        </View>
                        
                        <View style={{flexDirection:"row", marginTop: 20, marginLeft: 0,width:'90%',height:250 }}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            }
            <View style={{width:"100%",height:220,position:"relative"}}>
                <View style={{position:"absolute",top:0,left:0}}>
                    <Sliderdata data={Sliderimg}/>
                </View>
            </View>
            <ScrollView  nestedScrollEnabled={true} contentContainerStyle={{paddingBottom:2}}>
                <View style={{...StylesGloble.container,position:"relative",paddingLeft:10,paddingRight:10}}>
                    <View style={{marginTop:15}}>
                        <Text style={{...StylesGloble.listheading}}>{Proname}</Text>
                    </View>
                    <View style={{...StylesGloble.oneline,marginTop:10,position:"relative"}}>
                        <Text style={{fontSize:18,fontWeight:"600",color:"#9DC45A"}}>₹ {Price}</Text>
                        <Text style={{fontSize:16,fontWeight:"600",marginLeft:5,textDecorationLine:"line-through",color:"#9D9D9D"}}>₹ {Mrp}</Text>
                    
                        <View style={{backgroundColor:"#9DC45A",padding:3,paddingHorizontal:5,marginLeft:15,borderRadius:5}}>
                            <Text style={{fontSize:14,color:"#000000",fontWeight:"500"}}>{Discount}%   OFF</Text>
                        </View>
                        <View style={{...StylesGloble.oneline,marginLeft:"auto"}}>
                            <TouchableOpacity onPress={()=>{ addremovefuncart('1') }} style={{marginLeft:10}}>
                                <Cartminus/>
                            </TouchableOpacity>
                            <Text style={{fontSize:20,color:"#000000",marginLeft:10}}>{cartval}</Text>
                            <TouchableOpacity onPress={()=>{ addremovefuncart('2') }}  style={{marginLeft:10}}>
                                <Cartplus/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{...StylesGloble.listheading}}>{Featurename}</Text>
                        <View style={{...StylesGloble.oneline,marginTop:10,marginLeft:0}}>
                            {
                                (Featurevalues.length>0)&&(
                                    Featurevalues.map((item,index)=>(
                                        <View key={index} style={{...StylesGloble.outerborderwei}}>
                                            <Text style={{fontSize:12,color:"#757575"}}>{item}</Text>
                                        </View>
                                    ))
                                )
                            }
                        </View>
                        <View style={{...StylesGloble.oneline,marginTop:15}}>
                            <Rating/>
                            <Text style={{fontSize:14,color:"#757575",marginLeft:10}}>4.5 Reviews</Text>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{...StylesGloble.listheading}}>Discription</Text>
                        <View style={{marginTop:5,position:"relative"}}>
                            <Text style={{fontSize:12,color:"#A6A6A6",width:wp('80%')}}>{showdesDesc}</Text>
                            {
                                (deslenght >118)?(
                                    (showdescri==0)?(
                                        <TouchableOpacity onPress={()=>{Readmorefun('1')}} style={{position:"absolute",top:10,right:60}} >
                                            <Text style={{fontSize:12,marginRight:15,marginTop:5,fontWeight:"500", color:"#9DC45A"}}>Read More</Text>
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity onPress={()=>{Readmorefun('0')}} style={{position:"absolute",top:10,right:60}} >
                                            <Text style={{fontSize:12,marginRight:15,marginTop:5,fontWeight:"500", color:"#9DC45A"}}>Read Less</Text>
                                        </TouchableOpacity>
                                    )
                                ):(
                                    <></>
                                )
                            }
                        </View>
                    
                    </View>
                    <View style={{...StylesGloble.oneline,marginTop:20}}>
                        <View style={{width:wp('79%')}}>
                            <Text style={{...StylesGloble.listheading}}>Similar Products</Text>
                        </View>
                        <TouchableOpacity style={{alignItems:"flex-end",justifyContent:"flex-end"}}>
                            <Text style={{...StylesGloble.listviewallfont}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10}}>
                        {
                            suggestdata&&
                            <FlatList
                                horizontal={true}
                                data={suggestdata}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => <ProductItem item={item} navigation={navigation}/>}
                                keyExtractor={(item, index) => index}
                            />    
                        }   
                    </View>
                    <View style={{...StylesGloble.oneline,marginTop:20}}>
                        <View style={{width:wp('79%')}}>
                            <Text style={{...StylesGloble.listheading}}>You Might Also Like</Text>
                        </View>
                        <TouchableOpacity style={{alignItems:"flex-end",justifyContent:"flex-end"}}>
                            <Text style={{...StylesGloble.listviewallfont}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10}}>
                        {
                            suggestdata&&
                            <FlatList
                                horizontal={true}
                                data={suggestdata}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => <ProductItem item={item} navigation={navigation}/>}
                                keyExtractor={(item, index) => index}
                            />    
                        }    
                    </View>
                </View>
            </ScrollView>
            <View style={{width:wp('100%'),height:63,paddingHorizontal:wp('5%'),paddingTop:8,backgroundColor:"#FFFFFF"}}>
                <ButtonField label={'Add to Cart'} submitfun={submitfun}/>
            </View>
        </>
    );
};



export default Poductdetils;