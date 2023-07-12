import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../constants/navigationStrings";
import { Login,Otp,Wellcome,Addmobile,Signup,Home} from "../Screens";
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name={navigationStrings.Wellcome} component={Wellcome} />
            <Stack.Screen name={navigationStrings.Login} component={Login} />
            <Stack.Screen name={navigationStrings.Otp} component={Otp} />
            <Stack.Screen name={navigationStrings.Home} component={Home} />
            <Stack.Screen name={navigationStrings.Addmobile} component={Addmobile} />
            <Stack.Screen name={navigationStrings.Signup} component={Signup} />
            <Stack.Screen name={'UserStack'} component={UserStack} />
        </Stack.Navigator>
    );
  }
