import { SET_ORDER_DATA } from './OrderActionsTypes';
import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setorderData = () => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               dispatch({ type:SET_ORDER_DATA });
               let url = 'orders?order=DESC&order_by=id&row_count=10&page=1&token='+UserBase.userToken+"&by_user_id="+UserBase.userID+"&by_delivery_boy_id=&includes=order_details,product_details";
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    dispatch({ type:SET_ORDER_DATA, payload: data });
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_ORDER_DATA, payload: datayt });
     }
};


