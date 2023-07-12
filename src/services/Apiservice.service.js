import http from "./http-common";
import {  API_URL    } from './Apiurl';
import axios from "axios";



class ApiDataService {

    Getapi(url) {
        let newurl = API_URL+url;
        
        return http.get(newurl);
    }

    Postapi(url,data) {
        let newurl = API_URL+url;
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return http.post(newurl, data,config);
    }

    Uploadapi(url,data) {
        let newurl = API_URL+url;
        console.log(newurl);
        let postData = data;
        console.log(postData);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        };
      
        return  axios.post(newurl,postData, config);
    }
  
}

export default new ApiDataService();