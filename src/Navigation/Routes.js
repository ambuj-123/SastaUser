import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer , DefaultTheme, DarkTheme, } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import {ActivityIndicator,View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserData,sethomeData,setproductData,setcategoryData,setcartData,setorderData} from '../Redux/index';
import SplashScreen from 'react-native-splash-screen';


function Routes() {

    const dispatch = useDispatch();
    const [IsLogin,setIslogin]=useState(false);
    const [authLoaded, setAuthLoaded] = React.useState(false);

    useEffect(()=>{
        uselogin();
       
    },[IsLogin])

    const uselogin = async ()=>{
        try {
            const user = await AsyncStorage.getItem('isLogin');
            if (user=='1') {
                setAuthLoaded(true);
                SplashScreen.hide();
                setIslogin(true);
                dispatch(setUserData());
                dispatch(sethomeData());
                dispatch(setproductData('','','',''));
                dispatch(setcategoryData());
                dispatch(setcartData());
                dispatch(setorderData());
               
              
            } else {
                SplashScreen.hide();
                setAuthLoaded(true);
                setIslogin(false);
            }
          } catch (error) {}
    }

    return (
       
        <>
            {authLoaded ==true ? (
                <NavigationContainer theme={DefaultTheme}>
                    {IsLogin==false ?      <AuthStack/> : <UserStack />}
                </NavigationContainer>
            ) : (
                <View style={{width:"100%",height:"100%",backgroundColor:"#fffffff"}}>
                    <ActivityIndicator />
                </View>
                
            )}
        </>
    )
}

export default Routes