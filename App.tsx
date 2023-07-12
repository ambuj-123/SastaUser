import React, { useEffect,useState } from 'react';
import { StatusBar,View } from 'react-native';

import Routes from './src/Navigation/Routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Store from './src/Redux/store';



const App = () => {
   
    return (
        <Provider store={Store}>
            <PaperProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="#9DC45A"
                    barStyle="light-content"
                />
                <View style={{ flex: 1,backgroundColor:"#FFFFFF" }}>
                    <Routes />
                </View>
            </PaperProvider>
        </Provider>
    );
};

export default App;
