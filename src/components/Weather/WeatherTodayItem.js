import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LinearGradient from 'react-native-linear-gradient';

const WeatherTodayItem = ({item}) => {
  let today = new Date();
  let current = today.getHours();
  return (
    <View style={item === current ? styles.viewParentMain : styles.viewParent}>
      <View style={styles.viewTem}>
        <Text style={styles.textDate}>{Math.floor(Math.random() * 50)}</Text>
        <Text style={styles.texto}>o</Text>
        <Text style={styles.textC}>C</Text>
      </View>
      <Image
        source={require('../../assets/images/cloudy.png')}
        style={styles.img}
      />
      <Text style={styles.textDate}>{item}.00</Text>
    </View>
  );
};

export default WeatherTodayItem;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen * 0.17,
    height: heightScreen * 0.17,
    backgroundColor: 'transparent',
    marginHorizontal: widthScreen * 0.015,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
  },
  viewParentMain: {
    width: widthScreen * 0.17,
    height: heightScreen * 0.17,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: widthScreen * 0.015,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    borderWidth: 0.5,
    borderColor: colors.WHITE,
  },
  viewTem: {
    height: heightScreen * 0.03,
    width: widthScreen * 0.1,
    flexDirection: 'row',
  },
  textDate: {
    fontSize: 15,
    color: colors.WHITE,
  },
  texto: {
    position: 'absolute',
    bottom: 8,
    left: 17,
    fontSize: 12,
    color: colors.WHITE,
  },
  textC: {
    position: 'absolute',
    left: 23,
    fontSize: 15,
    color: colors.WHITE,
  },
  img: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
  },
});
