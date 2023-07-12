import React, { useEffect, useState, useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, ScrollView,Modal,FlatList,Image, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonField  from './../../helper/ButtonField';
import { StylesGloble } from './../../helper/Globlecss';
import imagePath from './../../constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import TabItem from '../../helper/Tab';
import CategoryComp from '../../Components/CategoryComp';
import { setsubcategoryData } from './../../Redux/index';
import { useSelector, useDispatch } from 'react-redux';


const Category = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const categorystate = useSelector((state) => state.CategoryReducer.data);
    const categorieslist =  categorystate?categorystate:null;

    const gotosuncategoryfun = (data) =>{
        dispatch(setsubcategoryData(data.parent_id))
        navigation.navigate('SubCategory',{data:data})
    }
    return (
        <>
            <HeaderComp text={'All Categories'} navigation={navigation} type={'1'}/>
            <View style={{...StylesGloble.container,position:"relative",paddingLeft:10,paddingRight:10}}>
                {
                    (categorieslist)&&(
                        <FlatList
                            numColumns={4}
                            data={categorieslist}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <CategoryComp item={item} navigation={navigation} gotosuncategoryfun={gotosuncategoryfun}/>}
                            keyExtractor={(item, index) => index}
                            style={{marginBottom:50}}
                        />  
                    )
                      
                } 
                <View style={{...StylesGloble.tabbarse}}>
                    <TabItem type="2" navigation={navigation}/>
                </View>
            </View>
        </>
       
    );
};



export default Category;