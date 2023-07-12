
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Dimensions, View,StyleSheet,ImageBackground, TextInput ,TouchableOpacity } from 'react-native';

import StepIndicator from 'react-native-step-indicator';

const customStyles = {
    direction:"vertical",
    stepCount:3,
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth:1,
    stepStrokeCurrentColor: '#9DC45A',
    stepStrokeWidth:13,
    stepStrokeFinishedColor: '#9DC45A',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#9DC45A',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#9DC45A',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#9DC45A',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 15,
    currentStepStrokeWidth:15,
}
const Stepindicator = (props) =>{
   
    return(
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={props.currentPosition}
                    direction="vertical"
                    stepCount={3}
                    labels={["Packing","On the Way","Delivered"]}
                    
                />
            </View>
        </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop:-50,
        flex: 1,
        flexDirection: 'row',
        
    },
    stepIndicator: {
        marginVertical: 50,
        paddingHorizontal: 20,
    },
    rowItem: {
        flex: 3,
        paddingVertical: 20,
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: '#333333',
        paddingVertical: 16,
        fontWeight: '600',
    },
    body: {
        flex: 1,
        fontSize: 15,
        color: '#606060',
        lineHeight: 24,
        marginRight: 8,
    },
  });

export default Stepindicator;