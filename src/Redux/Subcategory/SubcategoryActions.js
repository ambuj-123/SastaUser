import { SET_SUBCATEGORY_DATA } from './SubcategoryActionsTypes';
import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setsubcategoryData = (id) => async (dispatch) => {
     try {
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               dispatch({ type:SET_SUBCATEGORY_DATA });
               let url = 'categories?order=DESC&order_by=id&row_count=50&parent_id='+id+'&token='+UserBase.userToken;
            
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    if(data.length > 0)
                    {
                         dispatch({ type:SET_SUBCATEGORY_DATA, payload: data });
                    }
                    else{
                        
                         dispatch({ type:SET_SUBCATEGORY_DATA, payload: null });
                    }
                  
               });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_SUBCATEGORY_DATA, payload: datayt });
     }
};


