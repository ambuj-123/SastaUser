
import {  SET_HOME_DATA } from './HomeActionsTypes';

import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const sethomeData = () => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               dispatch({ type: SET_HOME_DATA });

              //let url = 'home-data?user_id='+UserBase.userID+'&token='+UserBase.userToken;
              let url = 'home-data?user_id='+UserBase.userID;
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    dispatch({ type: SET_HOME_DATA, payload: data });
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type: SET_HOME_DATA, payload: datayt });
     }
};


