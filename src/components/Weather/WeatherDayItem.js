import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';

const WeatherDayItem = ({item}) => {
  return (
    <View style={styles.viewParent}>
      <Text style={styles.textDate}>{item}/04</Text>
      <Image
        source={require('../../assets/images/cloudy.png')}
        style={styles.img}
      />
      <View style={styles.viewTem}>
        <Text style={styles.textDate}>{Math.floor(Math.random() * 50)}</Text>
        <Text style={styles.texto}>o</Text>
      </View>
    </View>
  );
};

export default WeatherDayItem;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.075,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightScreen * 0.01,
  },
  img: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.14,
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
});
