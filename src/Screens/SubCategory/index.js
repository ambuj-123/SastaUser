import React, { useEffect, useState, useContext } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { View, Text,  FlatList, Image, TouchableOpacity,  } from 'react-native';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import ProductItem from '../../Components/ProductItem';
import { setproductData } from './../../Redux/index';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Subcatdata = [{
    image: imagePath.SubCoce,
    name: "Soft Drinks",
    check: 0,
    id: "1",
}, {
    image: imagePath.Subrealme,
    name: "Fruits Juices",
    check: 0,
    id: "2",
}, {
    image: imagePath.Subredbul,
    name: "Energy Drinks",
    check: 0,
    id: "3",
}, {
    image: imagePath.Subbiscuits,
    name: "Biscuits",
    check: 0,
    id: "4",
}, {
    image: imagePath.Subchocolate,
    name: "Chocolate",
    check: 0,
    id: "5",
}, {
    image: imagePath.Subatta,
    name: "Grocery",
    check: 0,
    id: "6",
},
]
const Itemdata = [{
    image: imagePath.meat,
    name: "Lamb Meat",
    category: "Non-veg",
    price: "200",
    id: "1",
}, {
    image: imagePath.Tomato,
    name: "Fresh Tomato",
    category: "Cooking",
    price: "180",
    id: "2",
}, {
    image: imagePath.fortune,
    name: "Fortune Oil",
    category: "Cooking",
    price: "160",
    id: "3",
}, {
    image: imagePath.banana,
    name: "Fresh Banana",
    category: "Fruits",
    price: "220",
    id: "4",
}, {
    image: imagePath.coce,
    name: "Diet cock Can",
    category: "Coce",
    price: "250",
    id: "4",
}, {
    image: imagePath.sprite,
    name: "Sprite",
    category: "Drink",
    price: "280",
    id: "4",
},]

const SubCategory = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const Subcategorystate = useSelector((state) => state.SubcategoryReducer.data);
    const Subcategorieslist =  Subcategorystate?Subcategorystate:null;
    const productstate = useSelector((state) => state.ProductReducer.data);
    const productlistre =  productstate?productstate.data:null;
    const by_brand_id=  productstate?productstate.by_brand_id:null;
    const by_category_id=  productstate?productstate.by_category_id:null;
    const by_type=  productstate?productstate.by_type:null;
    const search=  productstate?productstate.search:null;
    const row_count=  productstate?productstate.row_count:null;
    const page=  productstate?productstate.page:null;

    const [skletonshow, setskletonshow] = useState(1);



    const pagename = route.params.data.name;
    const [checkid , setcheckid]= useState(Subcategorystate?Subcategorystate[0].id:null);
    useEffect(()=>{
        dispatch(setproductData('',checkid,'',''));
    },[checkid])
   
    useEffect(() => {
        setTimeout(()=>{
            setskletonshow(2)
        },3000)
    },[])

    const changvaluefun = (id) => {
        setcheckid(id);
        dispatch(setproductData('',id,'',''));
    }
    return (
        <>
            <HeaderComp text={pagename} navigation={navigation} type={'1'} />
            {
                skletonshow==1&&
                <View style={{width:"100%",height:'100%' , position: "relative"}}>
                    <SkeletonPlaceholder borderRadius={4}  >
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <View style={{ backgroundColor: "#ffffff", width: "20%",height:"100%", marginBottom: 30, paddingBottom: 50 }}>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                                <SkeletonPlaceholder.Item marginLeft={5} marginTop={20} width={80} height={80} borderRadius={50}/>
                            </View>
                            <View style={{ backgroundColor: "#F5F5F5", paddingHorizontal: hp('1%'), width: "80%", marginBottom: 30, paddingBottom: 50 }}>
                                <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'90%',height:180 }}>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                </View>
                                <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'90%',height:180 }}>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                </View>
                                <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'90%',height:180 }}>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                </View>
                                <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'90%',height:180 }}>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                    <SkeletonPlaceholder.Item marginLeft={'5%'} width={130} height={180} borderRadius={10}/>
                                </View>
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            }
            
            <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ backgroundColor: "#ffffff", width: "20%",height:"100%", marginBottom: 30, paddingBottom: 50 }}>
                    {
                        (Subcategorieslist || Subcategorieslist!=null)&&(
                            <FlatList
                                data={Subcategorieslist}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => <SubcatItem item={item} checkid={checkid} changvaluefun={changvaluefun} />}
                                keyExtractor={(item, index) => index}
                            />
                        )
                    }
                </View>

                <View style={{ backgroundColor: "#F5F5F5", paddingHorizontal: hp('1%'), width: "80%", marginBottom: 30, paddingBottom: 50 }}>
                    {
                        (productlistre)&&(
                            <FlatList
                                numColumns={2}
                                data={productlistre}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                                keyExtractor={(item, index) => index}
                            />
                        )
                    }
                    
                </View>
            </View>



        </>
    );
};
const SubcatItem = ({ item,checkid, changvaluefun }) => (
    <View>
        {
            (item.id ==checkid) ? (
                <TouchableOpacity style={{
                    marginTop: 20,
                    marginBottom: 10,
                    height: 80,
                    width:"100%",
                  
                }} >
                    <View style={{ backgroundColor: "#9DC45A", width: '90%', borderTopRightRadius:30 ,borderBottomRightRadius:30 ,padding: 3 }}>
                        <View style={{ backgroundColor: '#e2e9d3', padding: 3, borderRadius: 50,marginLeft:10 }}>
                            <Image style={{  width:50,height:50, alignSelf: "center", justifyContent: "center", }} source={{uri :item.image}} />
                        </View>
                    </View>


                    <View style={{ alignSelf: "center", marginTop: 10, paddingLeft: 3, paddingRight: 3 }}>
                        <Text style={{
                            fontSize: 14, lineHeight: 15,
                            fontWeight: "600",
                            color: '#9DC45A'
                        }} >{item.name}</Text>
                    </View>

                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => { changvaluefun(item.id) }} style={{
                    marginTop: 20,
                    marginBottom: 10,
                    height: 80,
                    width:"100%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                }} >
                    <View style={{ backgroundColor: '#e2e9d3', padding: 3, borderRadius: 50 }}>
                        <Image style={{  width:50,height:50, alignSelf: "center", justifyContent: "center", }} source={{uri :item.image}} />
                    </View>

                    <View style={{ alignSelf: "center", marginTop: 10, paddingLeft: 3, paddingRight: 3 }}>
                        <Text style={{
                            color: "#000000", fontSize: 14, lineHeight: 15,
                            fontWeight: "600",
                        }} >{item.name}</Text>
                    </View>

                </TouchableOpacity>
            )
        }
    </View>
);


export default SubCategory;