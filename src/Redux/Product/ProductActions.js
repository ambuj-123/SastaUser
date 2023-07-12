
import { SET_PRODUCT_DATA } from './ProductActionsTypes';
import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setproductData = (by_brand_id,by_category_id,by_type,search) => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let UserBase =  JSON.parse(credentials);
               var by_brand_id_call='';
               if(by_brand_id){
                    by_brand_id_call="&by_brand_id="+by_brand_id;
               }
               var by_category_id_call="";
               if(by_category_id_call){
                    by_category_id_call="&by_category_id="+by_category_id;
               }
               var by_type_call="";
               if(by_type_call){
                    by_type_call="&by_type="+by_type;
               }
               var search_call="";
               if(search_call){
                    search_call="&search="+search;
               }
               dispatch({ type:SET_PRODUCT_DATA });
               let url = 'products?order=DESC&order_by=id&row_count=10&page=1&user_id='+UserBase.userID+'&token='+UserBase.userToken+by_brand_id_call+by_category_id_call+by_type_call+search_call;
               ApiDataService.Getapi(url).then(response =>{
                   
                    let data = {
                         data : response.data,
                         by_brand_id: by_brand_id,
                         by_category_id: by_category_id,
                         by_type: by_type,
                         search: search,
                         row_count:10,
                         page: 1
                    } 
                    dispatch({ type:SET_PRODUCT_DATA, payload: data });
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_PRODUCT_DATA, payload: datayt });
     }
};


