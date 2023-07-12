import {  SET_USER_DATA    } from './userActionsType';
import ApiDataService from "./../../services/Apiservice.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setUserData = () => async (dispatch) => {
   
     try {
          
          AsyncStorage.getItem('UserBase', (err, credentials) => {
               let  UserBase =  JSON.parse(credentials);
               dispatch({ type: SET_USER_DATA });
               let url = 'users/'+UserBase.userID+'?token='+UserBase.userToken+"&includes=address";
               ApiDataService.Getapi(url).then(response =>{
                    let data = response.data;
                    if(data)
                    {
                         let datayt = {"id": UserBase.userID, "fullname": data[0].fullname, "email": data[0].email, "mobile": data[0].mobile, "profile_pic": data[0].profile_pic, "wallet_balance": data[0].wallet_balance, "address": data[0].address, "userToken":UserBase.userToken,'userID':UserBase.userID} 
                         dispatch({ type: SET_USER_DATA, payload: datayt });
                    }
                    else{
                         let datayt = {"id": "", "fullname": "", "email": null, "mobile": "", "profile_pic": "", "wallet_balance": "", "address": null, "userToken":UserBase.userID,'userID':UserBase.userToken} 
                         dispatch({ type: SET_USER_DATA, payload: datayt });
                    }
                    
               });
          })
     } catch (error) {
          let datayt = {"id": "", "fullname": "", "email": null, "mobile": "", "profile_pic": "", "wallet_balance": "", "address": null, "userToken":'','userID':''} 
          dispatch({ type: SET_USER_DATA, payload: datayt });
     }
};




