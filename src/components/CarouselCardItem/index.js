import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {heightScreen, widthScreen} from '../../utility';

export const SLIDER_WIDTH = widthScreen;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);

const CarouselCardItem = ({item, index}) => {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  image: {
    width: ITEM_WIDTH,
    height: heightScreen * 0.25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default CarouselCardItem;
