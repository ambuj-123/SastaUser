
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import imagePath from './../../constants/imagePath';
import { Dimensions, View,StyleSheet,ImageBackground,Image,TouchableOpacity } from 'react-native';


const width= Dimensions.get('window').width;
const height= Dimensions.get('window').height;
const SliderItem = ({item}) =>{
   
    return(
        <View style={{...styles.cardView}}>
            {
                (item!=null || item!='' || item)?(
                    <Image style={{width:width,height:250}} source={{uri :item}}/>
                ):(
                    <Image style={{width:width,height:250}} source={imagePath.product_deflt_img}/>
                )
            }
           
        </View>
    )
}
const styles = StyleSheet.create({
    cardView: {
        width : wp('100%'),
        height : 180,
        backgroundColor:"#E2EECE",
        alignItems:"center",
        justifyContent:"center"
    },
    image: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    textView: {
        color: '#2b3668', 
        

    }
    
});

export default SliderItem;