import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text,StyleSheet, ActivityIndicator, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from '../../helper/ButtonField';
import { StylesGloble } from '../../helper/Globlecss';
import imagePath from '../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import TabItem from '../../helper/Tab';
import ProductItem from '../../Components/ProductItem';
import { setsubcategoryData } from '../../Redux/index';
import { useSelector, useDispatch } from 'react-redux';
import ApiDataService from "../../services/Apiservice.service";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const Product = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const usaerstate = useSelector((state) => state.UserReducer.userData);
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;
    const productstate = useSelector((state) => state.ProductReducer.data);
    const productlistre =  productstate?productstate.data:null;
    const by_brand_id=  productstate?productstate.by_brand_id:null;
    const by_category_id=  productstate?productstate.by_category_id:null;
    const by_type=  productstate?productstate.by_type:null;
    const search=  productstate?productstate.search:null;
    const row_count=  productstate?productstate.row_count:null;
    const page=  productstate?productstate.page:null;

    const [pageLoad,setpageLoad ]= useState(page);
    const [productlist,setproductlist]=useState(productlistre);
    const [Activeloading, setActiveloading] = useState(false);
    const [alldataupload,setalldataupload ]= useState(0);
    const [skletonshow, setskletonshow] = useState(1);
    
    useEffect(() => {
        setTimeout(()=>{
            setskletonshow(2)
        },2000)
    },[])



    const addnewdata = () =>{
        if(Activeloading == false && alldataupload ==0)
        {
            setActiveloading(true);
            let newpageLoad = Number(pageLoad)+1; 
            setpageLoad(newpageLoad);
            var by_brand_id_call='';
            if(by_brand_id){
                by_brand_id_call="&by_brand_id="+by_brand_id;
            }
            var by_category_id_call="";
            if(by_category_id_call){
                by_category_id_call="&by_category_id="+by_category_id;
            }
            var by_type_call="";
            if(by_type_call){
                by_type_call="&by_type="+by_type;
            }
            var search_call="";
            if(search_call){
                search_call="&search="+search;
            }
            let url = 'products?order=DESC&order_by=id&row_count='+row_count+'&page='+pageLoad+'&user_id='+userID+'&token='+userToken+by_brand_id_call+by_category_id_call+by_type_call+search_call;
            ApiDataService.Getapi(url).then(response => {
               
                if(response.data.length > 0)
                {
                    let newarray =[...productlist,...response.data];
                    setproductlist(newarray);
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
   
   
    return (
        <>
            <HeaderComp text={'All Products'} navigation={navigation} type={'1'}/>
            {
                skletonshow==1&&
                <View style={{width:"100%",height:'100%' , position: "relative"}}>
                    <SkeletonPlaceholder borderRadius={4}  >
                        <View style={{ backgroundColor: "#F5F5F5", paddingHorizontal: hp('1%'), width: "80%", marginBottom: 30, paddingBottom: 50 }}>
                            <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'100%',height:180 }}>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'100%',height:180 }}>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'100%',height:180 }}>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'100%',height:180 }}>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                                <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            }
            <View style={{...StylesGloble.container,position:"relative",paddingLeft:10,paddingRight:10}}>
                {
                    (productlist)&&(
                        <FlatList
                            numColumns={2}                 
                            columnWrapperStyle={style.row}
                            data={productlist}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
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

export default Product;