import { Alert, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
Geocoder.init("AIzaSyB7qa8Uk4xxkHnrV6mGUCJrte7g9WH_hPA");

const [YES, NO, WAIT] = [1, 2, 3]

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
            return true
        } else {
            Alert.alert('Notice', '1We needs your location to work properly.', { cancelable: false })
       
            return false
        }
    } catch (err) {
        console.warn(err);
        return false
    }
};

export const askLocationService = async () => {
    try {
        if (Platform.OS == 'android') {
          
            let access = await requestLocationPermission()
     
            if (access) {
                let result = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000, });
                return result == 'already-enabled' ? YES : YES
            } else return NO
        } else {
            let result = await Geolocation.requestAuthorization("always")
            if (result == "granted" || result == "restricted") return YES
            else return NO
        }
    } catch (error) {
        console.log(error)
        return NO
    }
};

export const getCurrentPosition = () => {
    return new Promise(async (resolve, reject) => {
        let permission = await askLocationService()
  
        if (permission == YES) 
            Geolocation.getCurrentPosition(info => {
                return resolve(info)
            }, error => {
            
                console.log(error)
            }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 })
        else reject()
    })
};

export const getFormattedAddress = async (lat, lng) => {
    try {
        let json = await Geocoder.from(lat, lng);

        return json.results[0].formatted_address
    } catch (error) {
        console.log(error)
        return "Error getting address"
    }
}

export const getCurrentAddress = async () => {
    try {
        let { latitude, longitude } = (await getCurrentPosition()).coords;

        return await getFormattedAddress(latitude, longitude)
    } catch (error) {
        console.log('ERROR', error)
        return '1Error getting address'
    }
}

export const subscribeLocation = (updateLocation) => {
    let watchID = Geolocation.watchPosition(
        ({ coords }) => {
            updateLocation({ lat: coords.latitude, long: coords.longitude })
            console.log("subscribe", coords)
        },
        (error) => {
            console.log("subscribe error", error)
            // setLocationStatus(error.message);
        },{ 
            enableHighAccuracy: true, 
            distanceFilter: 5 
        }//[TODO]: remove the distance filter
    );
   

    return () => Geolocation.clearWatch(watchID)
};
