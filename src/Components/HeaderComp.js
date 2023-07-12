import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import imagePath from '../constants/imagePath';
import BackPage from '../assets/img/backPage.svg';
import Blackbackaerrow from '../assets/img/blackbackaerrow.svg';
import Whsearch from '../assets/img/Whsearch.svg';
import Blacksearch from '../assets/img/blacksearch.svg'

const HeaderComp = (props) => {

    return (
        <View style={props.type == 2 ? styles.bachgroundcole2 : styles.bachgroundcole1} >
            <TouchableOpacity onPress={() => { console.log('asdfsdfsdf'); props.navigation.goBack(null) }} style={{ position: "absolute", top: 25, left: 15 }}>
                {
                    
                    (props.type == 2) ? (
                        <Blackbackaerrow width={24} height={24} />
                    ) : (
                        <View style={{ top: 10 }}>
                            <BackPage width={24} height={24} />
                        </View>

                    )
                }
            </TouchableOpacity>
            <View style={styles.textview}>
                <Text style={styles.Textcass}>{props.text}</Text>
            </View>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }} style={{ ...styles.searchview }}>
                {
                    (props.type == 1) ? (
                        <Whsearch width={24} height={24} style={{ marginRight:10,marginTop:7 }} />
                    ) : (props.type == 3) ? (
                        <></>
                    ) : (
                        <Blacksearch width={24} height={24} style={{ marginRight: 20 }} />
                    )
                }
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    Textcass: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "600",
        left: 13
    },
    textview: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft:-15

    },
    backimg: {
        width: 20,
        height: 20
    },
    searchview: {
        position: "absolute", 
        top: 25,
        right: 15,
    },
    bachgroundcole1: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#9DC45A",
        height: 70,
    },
    bachgroundcole2: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#E2EECE",
        height: 70,

    }

})

export default HeaderComp;
