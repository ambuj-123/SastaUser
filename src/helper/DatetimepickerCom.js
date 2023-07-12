import React, { useEffect, useRef, useState } from 'react'
import { Text,StyleSheet,View,Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../constants/imagePath';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DatetimepickerCom= (props) => {

    const { label,errorText,value,Changevalue,type,inputtype,...restOfProps} = props;
    const [date, setDate] = useState(new Date());
    const [show,setshow] =useState(false); 
    const onsetvalue = (selDate)=>{
       
        let  selectedDate =  selDate || date;
    
        let dttype = inputtype;
        Changevalue(dttype,cstring);
        if(dttype==1)
        {
            let cdate= moment(selectedDate).format("DD-MM-YYYY");
           
            let cstring= cdate.toString();
            Changevalue(dttype,cstring)
        }
        else if(dttype==3){
            let cdate= moment(selectedDate).format("h:mm a");
           
            let cstring= cdate.toString();
            Changevalue(dttype,cstring)
        }
        else if(dttype==2){
            let cdate= moment(selectedDate).format("DD-MM-YYYY");
            let cstring= cdate.toString();
            Changevalue(dttype,cstring)
        }
        else {
            let cdate= moment(selectedDate).format("h:mm a");
            let cstring= cdate.toString();
            Changevalue(dttype,cstring);
        }
        setshow(false);
    }
    return (
        <>
        <View  style={styles.dateouter}>
            <Text style={styles.datenewlable}>{label}</Text>
            <TouchableOpacity style={styles.dateinput} onPress={()=>{setshow(true)}}>
                <Text style={styles.datefonvalue}>{value}</Text>
            {
                (type=='date')? (
                    <Image  style={styles.dateimage} source={imagePath.datepicker} />
                ):(
                    <Image  style={styles.dateimage} source={imagePath.timepicker} />
                )
            }
            </TouchableOpacity>
        </View>
        {!!errorText && <Text style={styles.error}>{errorText}</Text>}

        {
            show &&
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={type}
                is12Hour={true}
               
                style={styles.Picker}
                onChange={onsetvalue}
            />
            
        }
            
        </>

    )}

const styles = StyleSheet.create({
    dateouter:{
        width:"100%",
        position:"relative",
       
    },
    dateinput: {
        height:60,
        backgroundColor:"#222222",
        borderWidth: 1,
        borderRadius: 4,
        fontFamily:'Poppins-Regular',
        paddingLeft:5,
        paddingTop:18,
        fontSize: 16,
        borderColor: "#cc007680",
        color:"#ffffff"
    },
    
    dateborderview:{
        borderColor:"#CC0076",
        borderWidth:1,
    },
    
   
    dateimage:{
        position:"absolute",
        top:20,
        right:20,
        zIndex:9
    },
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    datenewlable:{
        fontSize: 14,
        color:"#ffffff",
        marginBottom:5
    },
    datefonvalue:{
        fontSize: 14,
        color:"#ffffff",
        marginBottom:5
    }
})

export default DatetimepickerCom