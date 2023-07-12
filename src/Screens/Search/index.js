import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text,useWindowDimensions,StyleSheet,ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import SearchField  from './../../helper/SearchField';
import ProductItem from '../../Components/ProductItem';
import ApiDataService from "./../../services/Apiservice.service";
import {  API_URL    } from './../../services/Apiurl';
import { useSelector, useDispatch } from 'react-redux';
import { setproductData,setsubcategoryData} from './../../Redux/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const allpagedata = [{}];

const minCols = 2;

const calcNumColumns = (width) => {
    const cols = width / styles.SubcatItem.width;
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - (2 * colsFloor * styles.SubcatItem.margin);
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
  };
const Search = ({ navigation,route }) => {

    const {width} = useWindowDimensions();
    const [numColumns, setNumColumns] = useState(calcNumColumns(width));

    useEffect(() => { 
        setNumColumns(calcNumColumns(width));
    }, [width]);
  


    const dispatch = useDispatch();
    const [ search,setsearch ] = useState('');
    const [ categories,setcategories ] = useState([]);
    const [ brands,setbrands ] = useState('');
    const [ products,setproducts ] = useState('');
    const [skletonshow, setskletonshow] = useState(1);
    
    useEffect(() => {
        setTimeout(()=>{
            setskletonshow(2)
        },3000)
    },[])

    useEffect(()=>{
        firsttimecall();
    },[])

    const Changevalue = (text) =>{
        setsearch(text);
        if(text=='' || text==null || text==undefined)
        {
            setcategories('');
            setbrands('');
            setproducts('');
        }
        else if(text.length < 3)
        {
            setcategories('');
            setbrands('');
            setproducts('');
        }
        else{
            ApiDataService.Getapi('search?search_txt='+text+'&search_include=brands,products,categories').then(response => {
                setcategories(response.data.categories);
                setbrands(response.data.brands);
                setproducts(response.data.products);
            }).catch(e => {
                console.log(e);
            });
        }
    }
    firsttimecall=()=>{
        ApiDataService.Getapi('search?search_txt=&search_include=brands,products,categories').then(response => {
            setcategories(response.data.categories);
            setbrands(response.data.brands);
            setproducts(response.data.products);
        }).catch(e => {
            console.log(e);
        });
    }
    const gotoProductlistfun = (type) =>{
        dispatch(setproductData('','',type,''));
        navigation.navigate('Product');
    }
    const gotosuncategoryfun = (data) =>{
        dispatch(setsubcategoryData(data.parent_id))
        navigation.navigate('SubCategory',{data:data})
    }
    return (
        <>
            <View style={{ flexDirection: "row",position:"relative",  height: 70,width:"100%",backgroundColor:'#FFFFFF'}} >
                <TouchableOpacity  onPress={()=> navigation.goBack(null)} style={{position:"absolute",left:10,top:28}}>
                    <Image   source={imagePath.blackbackaerrow} />
                </TouchableOpacity> 
                <View style={{position:"absolute",left:60,top:15,width:wp('100%')-80}}>
                    <SearchField placeholder="Search for over 500 product"  value={search} Changevalue={Changevalue}/>
                </View>
            </View>
            {
                skletonshow==1&&
                <View style={{width:"100%",height:'100%' , position: "relative"}}>
                    <View style={{width:wp('72%'),margin:15}}>
                        <Text style={{...StylesGloble.listheading}}>Tranding</Text>
                    </View>
                    <SkeletonPlaceholder borderRadius={4}  >
                        
                        <View style={{ flexDirection:"row"}}>
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                        </View>
                        <View style={{ flexDirection:"row"}}>
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                        </View>
                        <View style={{ flexDirection:"row"}}>
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                            <SkeletonPlaceholder.Item width={110} marginLeft={15} height={60} marginTop={25} borderRadius={50} />
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{width:wp('72%'),margin:15}}>
                        <Text style={{...StylesGloble.listheading}}>Suggested for you</Text>
                    </View>
                    <SkeletonPlaceholder borderRadius={4}  >
                        <View style={{flexDirection:"row", marginTop: 10, marginLeft: 0,width:'100%',height:180 }}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={"57%"} height={180} borderRadius={10}/>
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{width:wp('72%'),margin:15}}>
                        <Text style={{...StylesGloble.listheading}}>Popular Brands</Text>
                    </View>
                    <SkeletonPlaceholder borderRadius={4}  >
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
                    </SkeletonPlaceholder>
                </View>
            }
            <View style={{...StylesGloble.container,paddingLeft:10,paddingRight:10,position:"relative",paddingTop:15}}>
            <FlatList
                data={allpagedata}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                renderItem={({item}) =>
                    <>
                        {
                            (categories.length >0)?(
                                <>
                                    <View style={{width:wp('72%')}}>
                                        <Text style={{...StylesGloble.listheading}}>Trending</Text>
                                    </View>
                                    <View style={{marginTop:15}} >
                                        <FlatList
                                             key={numColumns}
                                            numColumns={numColumns}
                                            data={categories}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({item}) => <SubcatItem item={item} API_URL={API_URL} gotosuncategoryfun={gotosuncategoryfun}/>}
                                            keyExtractor={(item, index) => index}
                                        /> 
                                    </View>
                                </>
                            ):(<></>)
                        }
                        {
                            (products.length >0)?(
                                <>
                                <View style={{...StylesGloble.oneline,marginTop:15}}>
                                    <View style={{width:wp('72%')}}>
                                        <Text style={{...StylesGloble.listheading}}>Suggested for you</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{gotoProductlistfun('')}}  style={{alignItems:"flex-end",justifyContent:"flex-end",marginLeft:32}}>
                                        <Text style={{...StylesGloble.listviewallfont}}>See all</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop:15}}>
                                    <FlatList
                                        horizontal={true}
                                        data={products}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item}) => <ProductItem item={item} navigation={navigation}/>}
                                        keyExtractor={(item, index) => index}
                                    />    
                                </View>
                                </>
                            ):(<></>)
                        }
                        {
                            (brands.length >0)?(
                                <>
                                    <View style={{width:wp('72%'),marginTop:15}}>
                                        <Text style={{...StylesGloble.listheading}}>Popular Brands</Text>
                                    </View>
                                    <View style={{marginTop:10}}>
                                        {
                                            <FlatList
                                                horizontal={true}
                                                data={brands}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({item}) => <BrandappItem item={item} API_URL={API_URL} />}
                                                keyExtractor={(item, index) => index}
                                            />    
                                        }
                                    </View>
                                </>
                            ):(<></>)
                        }
                    </>
                }
                keyExtractor={(item, index) => index}
            />  
            </View>
        </>
    );
};
const SubcatItem = ({item,API_URL,gotosuncategoryfun}) => (
    <View style={styles.SubcatItem}>
        <TouchableOpacity onPress={()=>{ gotosuncategoryfun(item)}} style={{...StylesGloble.searchcatbtn,backgroundColor:"rgba(157, 196, 90, 0.1)"}} >
            <Image style={{marginLeft:2,width:25,height:25}}  source={{uri : API_URL+item.image}} />
            <Text numberOfLines={1} style={{...StylesGloble.searchcattext,fontSize:15,color:"#000000"}} > {item.name}</Text>
        </TouchableOpacity>
    </View>
);
const BrandappItem = ({item,API_URL}) => (
    <View style={{margin:10}}>
        <TouchableOpacity style={{...StylesGloble.searchcatbtn}} >
            <Image  style={{width:105,height:105}}  source={{uri : API_URL+item.logo}} />
            {/* <Text numberOfLines={1} style={{...StylesGloble.searchcattext,fontSize:15,color:"#000000"}} >{item.name}</Text> */}
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    SubcatItem: {
        margin:5
    }
})

export default Search;