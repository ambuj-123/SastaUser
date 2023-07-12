import React, { useEffect, useState, useContext } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ScrollView, Modal, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import ButtonField from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import Stepindicator from './../../helper/Stepindicator';
import CircularProgress from 'react-native-circular-progress-indicator';
import Helpicon from '../../assets/img/helpicon.svg';
import Address_one from '../../assets/img/address_one.svg';
import Trakpnoneround from '../../assets/img/trakpnoneround.svg'


const Trackorder = ({ navigation, route }) => {
    const orderId = route.params.orderId;


    return (
        <>
            <View style={{ position: "relative", height: hp('100%'), width: wp('100%'), backgroundColor: "#9DC45A20" }}>
                <HeaderComp text={'Order Details'} navigation={navigation} type={'3'} />
                <View style={{ ...StylesGloble.helptrachbtn, top: 20 }}>
                    <Helpicon width={74} height={29} />
                </View>
                <View style={{ flex: 1, marginTop: 15, alignItems: "center", position: "relative" }}>
                    <Text style={{ position: "absolute", top: 60, fontWeight: '500', fontSize: 20, color: '#000000' }}>Arriving in</Text>
                    <CircularProgress
                        value={30}
                        radius={95}
                        titleFontSize={13}
                        progressValueStyle={{ fontWeight: '600', fontSize: 18, color: '#000000', marginTop: 25, marginBottom: -5 }}
                        activeStrokeColor={'#9DC45A'}
                        inActiveStrokeColor={'#FFFFFF'}
                        inActiveStrokeOpacity={0.5}
                        title={'minutes'}
                        titleColor={'#000000'}
                        inActiveStrokeWidth={20}
                        activeStrokeWidth={20}
                        progressFormatter={(value) => {
                            'worklet';
                            return value.toFixed(2);
                        }}
                    />
                </View>

                <View style={{ position: "absolute", bottom: 0, right: 0, width: wp('100%'), height: 450, backgroundColor: '#ffffff', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 15, marginLeft: 25, color: "#000000" }}>Delivery Status</Text>
                    <View style={{ height: 210 }}>
                        <Stepindicator />
                    </View>
                    <View style={{ marginTop: -50, width: wp("90%"), paddingHorizontal: wp('5%') }}>
                        <View style={{ width: wp("90%"), borderRadius: 10, paddingVertical: 15, position: "relative", borderBottomColor: "#9D9D9D20", borderBottomWidth: 1 }}>
                            <View style={{ backgroundColor: "rgba(157, 196, 90, 0.1)" }}>
                                <Address_one width={47} height={47} style={{ position: "absolute", left: 5 }} />
                            </View>
                            <Text style={{ fontSize: 14, marginTop: 0, marginLeft: 55, color: "black" }}>Akshya Nagar 1st Block 1st Cross, Bangalore-560016</Text>
                        </View>
                        <View style={{ flexDirection: "row", position: "relative", padding: 10, width: wp("100%") - 35 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={imagePath.trackprofile} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 12, marginTop: 3, color: "#9D9D9D" }}>Your delivery hero</Text>
                                    <Text style={{ fontSize: 15, marginTop: 0, color: "#000000" }}>Abdulmalik Qasim </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: "auto" }}>
                                <Trakpnoneround width={47} height={47} />
                            </View>
                        </View>
                        <View style={{ position: "relative", padding: 10 }}>
                            <View style={{ ...StylesGloble.oneline }}>
                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>Order ID: </Text>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#9D9D9D" }}> XYZLMO</Text>
                            </View>
                            <View style={{ ...StylesGloble.oneline }}>
                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>2 Items: </Text>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#9DC45A" }}> ₹45 Saved</Text>
                            </View>
                            <View style={{ ...StylesGloble.helptrachbtn, ...StylesGloble.oneline, right: -30, top: 25 }}>
                                <Text style={{ fontSize: 16, fontWeight: "400", color: "#9DC45A" }}>Order Details</Text>
                                <Image style={{ marginTop: 10, marginLeft: 10 }} source={imagePath.frontorde} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};



export default Trackorder;