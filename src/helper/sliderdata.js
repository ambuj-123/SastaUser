import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';

import SliderItem  from './silderItem.js';


const { width, heigth } = Dimensions.get('window');

function infiniteScroll(dataList, mySlide) {
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    
        if (scrolled < numberOfData)
            scrollValue = scrollValue + width

        else {
            scrollValue = 0
            scrolled = 0
        }
        if (mySlide) {
            
            if (mySlide ==null) {
                
            }
            else{
                
                mySlide.current.scrollToOffset({
                    animated: true,
                    offset: 0,
                });
            }
        }
        

  
}

const Sliderdata = ({data}) =>{
    const mySlide = useRef();

    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);

    useEffect(() => {
        setDataList(data);
        infiniteScroll(dataList, mySlide);
    })
    

    if (data && data.length) {
        return (
            <View>
                <FlatList data={data}
                    ref={mySlide}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <SliderItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10,width: 10, backgroundColor: '#9DC45A', margin: 8,  borderRadius: 5,marginTop:-30,marginBottom:0 }}
                            />
                        )
                    })}

                </View>
            </View>
        )
    }

   
    return null;
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center',marginTop:-5 }
})


export default Sliderdata;

