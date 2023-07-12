import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, Modal,Text, TouchableOpacity, View } from 'react-native';




export const Coustompickerwithoutok = (props) => {
    
    const [choose, setChoose] = useState('');

    return<View >
           <Modal  animationType="slide" transparent={true} visible={true}>
                <View style={{   height: '100%',  marginTop: 'auto',position:"relative", backgroundColor:'#0e0e0e61',zIndex:999999}}>
                    <TouchableOpacity style={{position: 'absolute',bottom: 0,width:'100%',height:"100%"}} onPress={() =>{
                           props.pickeractionfun('c',''); }}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{position: 'absolute', bottom: '0%',left:'5%',width: "90%", height: props.data.length>8?"60%":"auto",backgroundColor:'#69338E'}}> 
                        <View style={{width:'100%',height:'100%'}}>
                            <ScrollView>
                                {
                                    props.data.map( (s, i) => {
                                        return  <TouchableOpacity key={i} onPress={async () => { props.pickeractionfun('v',s);props.pickeractionfun('c',''); }} style={{width:'100%',height:50,padding:10,alignItems:'flex-start',paddingLeft:35,  backgroundColor: choose == s.value ? '#c0c6cd' : '#1e111a'}}>
                                           <Text style={{fontSize:18,color:"#ffffff"}}>{s.name}</Text>
                                        </TouchableOpacity>
                                    })
                                }
                            </ScrollView>
                        </View> 
                    </View>
                </View>
            </Modal>
       
    </View>;
  
}

export const StylesFirst = StyleSheet.create({
    footerdv:{
        width:"100%",
        height:60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        flexDirection: 'row', 
        alignItems:'center', 
    },
    bottomButtons: {
        width:"20%",
        alignItems:'center', 
    },
    footerText: {
        color:'#000000',
        fontWeight:'bold',
        alignItems:'center',
        fontFamily:'Poppins-Regular',fontSize:18,
    },
})