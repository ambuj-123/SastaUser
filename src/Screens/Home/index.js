import React, { useEffect, useState, useContext, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ScrollView, Modal, FlatList, Image, TouchableOpacity, ImageBackground,PermissionsAndroid, Dimensions } from 'react-native';
import ButtonField from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import GooglePlacesInput  from './../../helper/GooglePlacesInput';
import imagePath from './../../constants/imagePath';
import SearchField from './../../helper/SearchField';
import Sliderdata from '../../helper/sliderdata';
import TabItem from '../../helper/Tab';
import CategoryComp from '../../Components/CategoryComp';
import ProductItem from '../../Components/ProductItem';
import OfferComp from '../../Components/OfferComp';
import Locationicon from '../../assets/img/locationicon.svg';
import Downarray from '../../assets/img/downarray.svg';

import Searchicon from '../../assets/img/searchicon.svg';
import { useSelector, useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { setproductData,sethomeData,setsubcategoryData} from './../../Redux/index';
import { getFormattedAddress,requestLocationPermission } from '"./../../services/LocationServices';





export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const width = Dimensions.get('window').width;

const data = [
    {
        image: imagePath.cat2,
    },
    {
        image: imagePath.cat2,
    },
    {
        image: imagePath.cat2,
    },
];



const Home = ({ navigation, route }) => {
    const allpagedata = [{}];
    const dispatch = useDispatch();
    const isCarousel = useRef(null);
    const mySlide = useRef();
    const [currentlat, setcurrentlat] = useState('');
    const [currentlng, setcurrentlng] = useState('');

    const [currentadd, setcurrentadd] = useState('');
    const [locationname, setlocationname] = useState('');
    const usaerstate = useSelector((state) => state.UserReducer.userData);
  
    
    const userID = usaerstate ? usaerstate.userID : null;
    const userToken = usaerstate ? usaerstate.userToken : null;
    const username = usaerstate ? usaerstate.fullname : null;
    const userimg = usaerstate ? usaerstate.profile_pic : null;
    const useraddress = usaerstate ? usaerstate.address : null;

    const homestate = useSelector((state) => state.HomeReducer.data);
    const categorieslist =  homestate?homestate.categories:null;
    const sliderImageslist =  homestate?homestate.slider_images:null;
    const topTrendslist =  homestate?homestate.top_trends:null;
    const bestDealslist =  homestate?homestate.best_deals:null;
    const best_offerslist =  homestate?homestate.best_offers:null;
    

    
    const [search, setsearch] = useState('');
    const [skletonshow, setskletonshow] = useState(1);
    const [locationpopup, setlocationpopup] = useState(false);
    const Changevalue = (text) => {
        setsearch(text);
    }
    useEffect(() => {
        setTimeout(()=>{
            setskletonshow(2)
        },3000)
    },[])
    
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
        dispatch(sethomeData());
        
    }, [])

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => { 
                setcurrentlat(position.coords.latitude);
                setcurrentlng(position.coords.longitude);
                if (useraddress == null || useraddress == '' || useraddress == undefined) {
                    cureentlocationget(position.coords.latitude,position.coords.longitude);
                }
            },(error) => {
                getOneTimeLocation();
            },
        );
    };
    const cureentlocationget = async (lat,lng) => {
        if(locationname == '')
        {
            let newaddress = await getFormattedAddress(lat,lng);
            setcurrentadd(newaddress);
            setlocationname('current location');
        }
    }
    const onPlaceSelected = (data,details) =>{
        setcurrentadd(data.description);
        setlocationname('choose location');
        setlocationpopup(false);
    }
    const closeaddress = () =>{
        setlocationpopup(false);
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
            {
                skletonshow==1&&
                <View style={{width:"100%",height:'100%' , position: "relative"}}>
                    <SkeletonPlaceholder borderRadius={4}  >
                        <View style={{ ...StylesGloble.homeheaderouter, marginTop: 0, marginLeft: '5%',width:'90%',height:100 }}>
                            <View style={{  marginLeft: 0,height:70 }}>
                                <SkeletonPlaceholder.Item width={60} height={60} marginTop={25} borderRadius={50} />
                            </View>
                            <View style={{ ...StylesGloble.homeheadername, marginLeft: 5, marginTop: 8 }}>
                                <SkeletonPlaceholder.Item width={120} height={20}/>
                                <SkeletonPlaceholder.Item width={80} height={20}  marginTop={15} />
                            </View>
                            <TouchableOpacity  style={{ position: "absolute", top: 10, right: -15, flexDirection: "row", backgroundColor: "#eaf3e0a8", padding: 10, paddingHorizontal: 10, borderRadius: 20 }}>
                                <SkeletonPlaceholder.Item width={100} height={50} borderRadius={30}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ ...StylesGloble.homeheaderouter, marginTop: 12, marginLeft: -1, width: "99%",position: "relative", alignSelf: "center"}}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={'90%'} height={60} borderRadius={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 12, marginLeft: -1, width: "99%",height:270 }}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={'90%'} height={250} borderRadius={20}/>
                        </TouchableOpacity>
                        <View style={{flexDirection:"row", marginTop: 0, marginLeft: 0,width:'90%',height:250 }}>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                            <SkeletonPlaceholder.Item marginLeft={'5%'} width={150} height={220} borderRadius={20}/>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            }
            <View style={{ ...StylesGloble.container, position: "relative", paddingLeft: 10, paddingRight: 10 }}>
                <FlatList
                    data={allpagedata}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    renderItem={({item}) =>
                        <>
                            <View style={{ ...StylesGloble.homeheaderouter, marginTop: 15, marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={{ ...StylesGloble.homeheaderprofile }}>
                                    {
                                        (userimg != undefined || userimg != null || userimg != '') ? (
                                            <Image style={{ width: 55, height: 55,borderRadius:50 }} source={{ uri: userimg }} />
                                        ) : (
                                            <Image style={{ width: 55, height: 55 }} source={imagePath.smallproimg} />
                                        )
                                    }
                                </TouchableOpacity>
                                <View style={{ ...StylesGloble.homeheadername, marginLeft: 0, marginTop: 4 }}>
                                    <Text style={{ ...StylesGloble.fontsmallsimple, marginTop: -15, color: "#979899", fontSize: 12, fontWeight: "500" }}>Good morning</Text>
                                    <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 1, marginLeft: -3, color: "#000000" }}>{username}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    setlocationpopup(true);
                                }} style={{ position: "absolute", top: 10, right: 5, flexDirection: "row", backgroundColor: "#eaf3e0a8", padding: 10, paddingHorizontal: 10, borderRadius: 20 }}>
                                    <Locationicon width={15} height={18} fill={"green"} />
                                    <View style={{marginTop:-5,width:90}}>
                                        <Text numberOfLines={1} style={{ marginHorizontal: 5, marginTop: 0, fontSize: 12,fontWeight:"500", color: "#06161C" }}>{locationname}</Text>
                                        <Text numberOfLines={1} style={{ marginHorizontal: 5, marginTop: 0, fontSize: 10, color: "#06161C" }}>{currentadd}</Text>
                                    </View>
                                    <Downarray width={10} height={15} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{
                                ...StylesGloble.homeheaderouter, marginTop: 12, marginLeft: -1, width: "99%",
                                position: "relative", alignSelf: "center"
                            }} onPress={() => { navigation.navigate('Search') }}>
                                <View style={{
                                    padding: 10,
                                    backgroundColor: "#EEEEEE",
                                    borderRadius: 12,
                                    fontSize: 15,
                                    padding: 15,
                                    borderRadius: 60
                                }}>
                                    <Searchicon width={16} height={16} style={{
                                        position: "absolute",
                                        top: 18,
                                        left: 20,
                                        zIndex: 9
                                    }} />
                                    <View style={{ paddingLeft: 30 }}>
                                        <Text style={{ color: "#000000", }}>Search over 5000 products.</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {
                                (sliderImageslist)&&(
                                    <View style={{ width: "100%", height: 250, position: "relative", marginLeft: 0 }}>
                                        <View style={{ position: "absolute", top: -15, left: 0 }}>
                                            <FlatList data={sliderImageslist}
                                                ref={mySlide}
                                                horizontal
                                                pagingEnabled
                                                scrollEnabled
                                                snapToAlignment="center"
                                                scrollEventThrottle={16}
                                                decelerationRate={"fast"}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => {
                                                    return <View style={{ margin: 4 }}>
                                                        {
                                                            (item.image)?(
                                                                <Image source={{ uri: item.image }} style={{ height: 185, width: 335 }} />
                                                            ):(
                                                                <Image source={{ uri: imagePath.banner1 }} style={{ height: 185, width: 335 }} />
                                                            )
                                                        }
                                                    </View>
                                                }}
                                            />
                                        </View>
                                    </View>
                                )
                            }
                            <View style={{ width: width - 3, marginTop: -60, }}>
                            {
                                (best_offerslist)&&(
                                    <FlatList
                                        horizontal={true}
                                        data={best_offerslist}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => <OfferComp item={item} navigation={navigation} />}
                                        keyExtractor={(item, index) => index}
                                    />
                                )
                            
                            }
                            </View>
                            {
                                (bestDealslist)&&(
                                    <>
                                    <View style={{ ...StylesGloble.homeheaderouterpage, ...StylesGloble.oneline, marginTop: -30, marginLeft: 0, justifyContent: "space-between" }}>
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ ...StylesGloble.listheading }}>Best Deals</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>{gotoProductlistfun('best_deal')}} style={{ marginRight: 10 }}>
                                            <Text style={{ ...StylesGloble.listviewallfont }}>See All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: width - 3, }}>
                                        <FlatList
                                            horizontal={true}
                                            data={bestDealslist}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                                            keyExtractor={(item, index) => index}
                                        />
                                    </View>
                                    </>
                                )
                                
                            }
                            {
                                (sliderImageslist)&&(
                                    <View style={{ width: "100%", height: 130, position: "relative", marginTop: 40 }}>
                                        <View style={{ position: "absolute", top: -25, left: 0 }}>
                                            <FlatList data={sliderImageslist}
                                                ref={mySlide}
                                                horizontal
                                                pagingEnabled
                                                scrollEnabled
                                                snapToAlignment="center"
                                                scrollEventThrottle={16}
                                                decelerationRate={"fast"}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => {
                                                    return <View style={{ margin: 5}}>
                                                        {
                                                            (item.image)?(
                                                                <Image source={{ uri: item.image }} style={{ height: 185, width: 335 }} />
                                                            ):(
                                                                <Image source={{ uri: imagePath.banner1 }} style={{ height: 185, width: 335 }} />
                                                            )
                                                        }
                                                    </View>
                                                }}

                                            />
                                        </View>
                                    </View>
                                )
                            }
                            {
                                (categorieslist)&&(
                                    <>
                                    <View style={{ ...StylesGloble.homeheaderouterpage, ...StylesGloble.oneline, marginTop: 50, marginBottom: 10, marginLeft: 0, justifyContent: "space-between" }}>
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ ...StylesGloble.listheading }}>Categories</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => { navigation.navigate('Category') }} style={{ marginRight: 10 }}>
                                            <Text style={{ ...StylesGloble.listviewallfont }}>See All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ ...StylesGloble.homeheaderouterpage, marginLeft: 0, marginRight: -50, }}>
                                        <FlatList
                                            numColumns={4}
                                            data={categorieslist}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => <CategoryComp item={item} navigation={navigation} gotosuncategoryfun={gotosuncategoryfun}/>}
                                            keyExtractor={(item, index) => index}
                                        />
                                    </View>
                                    </>
                                )
                            }
                            {
                                (topTrendslist)&&(
                                    <>
                                        <View style={{ ...StylesGloble.homeheaderouterpage, ...StylesGloble.oneline, marginTop: 30, marginBottom: 10, marginLeft: 0, marginRight: 0, justifyContent: "space-between" }}>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ ...StylesGloble.listheading }}>Top Trend</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{gotoProductlistfun('trending')}}  style={{ marginRight: 10 }}>
                                                <Text style={{ ...StylesGloble.listviewallfont }}>See All</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: width - 3, }}>
                                            <FlatList
                                                horizontal={true}
                                                data={topTrendslist}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                                                keyExtractor={(item, index) => index}
                                            />
                                        </View>
                                    </>
                                )
                            }
                        </>
                    }
                    keyExtractor={(item, index) => index}
                />   
                <View style={{ ...StylesGloble.tabbarse }}>
                    <TabItem type="1" navigation={navigation} />
                </View>
                <Modal animationType="slide" transparent={true} visible={locationpopup}>
                    <GooglePlacesInput
                        closeaddress={closeaddress}
                        onPress={onPlaceSelected}
                        placeholder={""}
                    />
                </Modal>
                {/* <Modal animationType="slide" transparent={true} visible={locationpopup}>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%", backgroundColor: "#1c191938" }} onPress={() => {
                        setlocationpopup(false);
                    }}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{ position: "absolute", bottom: 0, right: 0, width: wp('100%'), height: 380, backgroundColor: '#ffffff', borderTopStartRadius: 50, borderTopEndRadius: 50, alignItems: "center" }}>
                        <Image style={{ marginTop: 25 }} source={imagePath.poplocation} />
                        
                        <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 15, color: "black" }}>Please search your location</Text>
                        <View style={{ marginTop: hp('3%'), width: wp('86%'), }}>
                            <GooglePlacesInput
                                onPress={onPlaceSelected}
                                placeholder={""}
                            />
                        </View>
                    </View>
                </Modal> */}
                
            </View>
        </>
    );
};



export default Home;

