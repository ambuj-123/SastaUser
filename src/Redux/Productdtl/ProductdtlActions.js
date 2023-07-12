
import { SET_PRODUCTDTL_DATA } from './ProductdtlActionsTypes';

import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setproductdtlData = (proid) => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               let url = 'products/'+proid+'?token='+UserBase.userToken+'&include_similar_products=1&include_recommended_products=1';
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    dispatch({ type: SET_PRODUCTDTL_DATA, payload: data[0] });
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_PRODUCTDTL_DATA, payload: datayt });
     }
};


