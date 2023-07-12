import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../constants/navigationStrings";
import {Home,Category,SubCategory,Product,Search,Address,Poductdetils,Setting,Cartscreen,Wallet,Trackorder,Order,Support,Myprofile,Orderconfirm,AddAddress,Aboutus } from "../Screens";
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name={navigationStrings.Home} component={Home} />
            <Stack.Screen name={navigationStrings.Trackorder} component={Trackorder} />
            <Stack.Screen name={navigationStrings.Orderconfirm} component={Orderconfirm} />
            <Stack.Screen name={navigationStrings.Category} component={Category} />
            <Stack.Screen name={navigationStrings.SubCategory} component={SubCategory} />
            <Stack.Screen name={navigationStrings.Poductdetils} component={Poductdetils} />
            <Stack.Screen name={navigationStrings.Setting} component={Setting} />
            <Stack.Screen name={navigationStrings.Cartscreen} component={Cartscreen} />
            <Stack.Screen name={navigationStrings.Wallet} component={Wallet} />
            <Stack.Screen name={navigationStrings.Order} component={Order} />
            <Stack.Screen name={navigationStrings.Search} component={Search} />
            <Stack.Screen name={navigationStrings.Support} component={Support} />
            <Stack.Screen name={navigationStrings.Myprofile} component={Myprofile} />
            <Stack.Screen name={navigationStrings.AddAddress} component={AddAddress} />
            <Stack.Screen name={navigationStrings.Address} component={Address} />
            <Stack.Screen name={navigationStrings.Aboutus} component={Aboutus} />
            <Stack.Screen name={navigationStrings.Product} component={Product} />
            <Stack.Screen name={'AuthStack'} component={AuthStack} />
            
        </Stack.Navigator>
    );
  }
