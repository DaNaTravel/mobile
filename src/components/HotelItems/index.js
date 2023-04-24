import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';

const HotelItems = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/booking.jpg')}
      />
      <View
        style={{
          marginVertical: heightScreen * 0.02,
          paddingHorizontal: widthScreen * 0.02,
        }}>
        <Text numberOfLines={1} style={styles.name}>
          Symphony
        </Text>
        <Text style={styles.title}>Per Night</Text>
      </View>
      <Text style={styles.price}>$20.00</Text>
    </TouchableOpacity>
  );
};

export default HotelItems;

const styles = StyleSheet.create({
  container: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginRight: widthScreen * 0.025,
    borderRadius: 20,
  },
  image: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.4,
  },
  title: {
    color: colors.MAINCOLOR,
    fontStyle: 'italic',
    marginTop: heightScreen * 0.005,
  },
  name: {
    fontWeight: 700,
    fontSize: 16,
    color: colors.BLACK,
    width: widthScreen * 0.3768,
  },
  price: {
    fontWeight: 600,
    fontSize: 20,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
    marginTop: heightScreen * -0.015,
  },
  icon_like: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.MAINCOLOR,
  },
  viewBlur: {
    width: widthScreen * 0.8,
    height: heightScreen * 0.28,
    borderRadius: 20,
  },
});
