import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';

export const SLIDER_WIDTH = widthScreen;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselDetailItinerary = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  image: {
    width: ITEM_WIDTH,
    height: heightScreen * 0.3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default CarouselDetailItinerary;
