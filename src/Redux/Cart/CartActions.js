
import { SET_CART_DATA } from './CartActionsTypes';

import ApiDataService from "../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setcartData = () => async (dispatch) => {
     try {
          AsyncStorage.getItem('Cartdata', (err, credentials) => {
               let  cartData =  JSON.parse(credentials);
               dispatch({ type:SET_CART_DATA, payload: cartData });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_CART_DATA, payload: datayt });
     }
};


