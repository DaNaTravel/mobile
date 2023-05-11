import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';

const AccordionItemWeather = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.viewParent}
      onPress={() => console.log(`See weather detail of 0${item}/04`)}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textWeather}>0{item}/04</Text>
      </View>
      <Image
        source={require('../../assets/images/cloudy.png')}
        resizeMode="cover"
        style={styles.viewImg}
      />
      <View style={styles.viewDel}>
        <Text style={styles.textWeather}>27</Text>
        <Text style={styles.textO}>o</Text>
        <Text style={styles.textC}>C</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccordionItemWeather;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.27,
    width: widthScreen * 0.3,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    marginHorizontal: heightScreen * 0.005,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  viewImg: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.2,
    borderRadius: 15,
  },
  viewContent: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.15,
    paddingLeft: widthScreen * 0.008,
  },
  viewDel: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.07,
    flexDirection: 'row',
  },
  textMain: {
    fontSize: 16,
    fontWeight: 600,
  },
  textWeather: {
    fontWeight: 600,
    fontSize: 17,
  },
  textO: {
    position: 'absolute',
    top: -5,
    left: 19,
    fontWeight: 600,
    fontSize: 17,
  },
  textC: {left: 8, fontWeight: 600, fontSize: 17},
});
