
import { SET_CATEGORY_DATA } from './CategoryActionsTypes';

import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setcategoryData = () => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               dispatch({ type:SET_CATEGORY_DATA });
               let url = 'categories?order=DESC&order_by=id&row_count=50&token='+UserBase.userToken;
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    dispatch({ type:SET_CATEGORY_DATA, payload: data });
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_CATEGORY_DATA, payload: datayt });
     }
};


