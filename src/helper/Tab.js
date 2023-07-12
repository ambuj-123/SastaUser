import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Dimensions, View,StyleSheet,Image, TextInput ,TouchableOpacity } from 'react-native';
import imagePath from '../constants/imagePath';
import Homeinactive from '../assets/img/home_inactive.svg'
import Settingactive from '../assets/img/setting_active.svg'
import Bagactive from '../assets/img/Bag_active.svg'
import Gridactive from '../assets/img/grid_active.svg'
import Homeactive from '../assets/img/home_active.svg'
import Gridinactive from '../assets/img/grid_inactive.svg'
import Settinginactive from '../assets/img/setting_inactive.svg'
import Baginactive from '../assets/img/Bag_inactive.svg'

const width= Dimensions.get('window').width;
const height= Dimensions.get('window').height;
const TabItem = (props) =>{
   
    return(
        <View style={{...styles.Bottombarcss}}>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Home')}} style={{...styles.bottomsec}}>
                {
                    (props.type=='1')?(
                        <Homeactive width={28} height={28} fill={"green"}/>
                    ):(
                        <Homeinactive width={28} height={28} fill={"green"}/>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Category')}} style={{...styles.bottomsec}}>
                {
                    (props.type=='2')?(
                        <Gridactive width={28} height={28} />
                    ):(
                        <Gridinactive width={28} height={28} />
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Cartscreen')}} style={{...styles.bottomsec}}>
                {
                    (props.type=='3')?(
                        <Bagactive width={28} height={28} />
                    ):(
                        <Baginactive width={28} height={28} />
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Setting')}} style={{...styles.bottomsec}}>
                {
                    (props.type=='4')?(
                        <Settingactive width={28} height={28} />

                    ):(
                        <Settinginactive width={28} height={28}/>

                    )
                }
            </TouchableOpacity>
        </View>
       
    )
}
const styles = StyleSheet.create({
    Bottombarcss:{
        backgroundColor:"#ffffff",
        alignItems:"center",
        shadowColor: "#626464",
        flex:1,
        flexDirection:"row",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        
    },
    bottomsec:{
        width:wp('25%'),
        alignItems:"center",
    }
})


export default TabItem;