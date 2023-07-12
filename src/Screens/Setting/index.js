import React, { useEffect, useState, useContext } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ScrollView, Modal, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import ButtonField from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import TabItem from '../../helper/Tab';
import Order from '../../assets/img/order.svg';
import Forwordcou from '../../assets/img/forwordcou.svg';
import Support from '../../assets/img/support.svg';
import Address from '../../assets/img/address.svg';
import Profile from '../../assets/img/profile.svg';
import Aboutus from '../../assets/img/aboutus.svg';
import Notification from '../../assets/img/notification.svg';
import Wallet from '../../assets/img/wallet.svg';
import Logout from '../../assets/img/logout.svg'

const Setting = ({ navigation, route }) => {
    return (
        <>
            <HeaderComp text={'Settings'} navigation={navigation} type={'3'} />
            <View style={{ ...StylesGloble.container,position: "relative", }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Order') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                        <Order width={22} height={22}/>
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>Orders</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Support') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                        <Support width={22} height={22}  />
                </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0 ,color:"black"}}>Customer Support & FAQ</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>

                        <Forwordcou width={15} height={30} fill={"green"} />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Address',{type:'2'}) }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                        <Address width={22} height={22}  />
                   </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>Address</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                       <Forwordcou width={15} height={30} fill={"green"} />
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Myprofile') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                    <Profile width={22} height={22}  />
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>Profile</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Aboutus') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                    <Aboutus width={22} height={22}/>
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>About Us</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                       <Notification width={22} height={22}/>
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>Notification</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Wallet') }} style={{ ...StylesGloble.sidebarlistview }}>
                    <View style={{ width: wp('10%') }}>
                       <Wallet  width={22} height={22}/>
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0,color:"black" }}>Wallet</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('AuthStack') }} style={{ ...StylesGloble.sidebarlistview, borderBottomWidth: 0 }}>
                    <View style={{ width: wp('10%') }}>
                     <Logout  width={22} height={22}/>
                    </View>
                    <View style={{ width: wp('75%') }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 0, color: "#FE5B5B" }}>Logout</Text>
                    </View>
                    <View style={{ width: wp('5%') }}>
                        <Forwordcou width={15} height={30} fill={"green"} />

                    </View>
                </TouchableOpacity>
                {/* <View style={{...StylesGloble.tabbarse}}>
                    <TabItem type="4" navigation={navigation}/>
                </View> */}
            </View>
        </>
    );
};



export default Setting;