import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';

export const SLIDER_WIDTH = widthScreen;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselBookingItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.photo_reference}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
        }}
        style={styles.image}
      />
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
    height: heightScreen * 0.33,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default CarouselBookingItem;
