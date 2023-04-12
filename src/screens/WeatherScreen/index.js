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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Weather = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.viewParent}
      source={require('../../assets/images/bgweathersunny.jpg')}
      resizeMode="cover">
      <View style={styles.viewHeader}>
        <View style={styles.viewPosition}>
          <Fontisto name="map-marker-alt" size={23} color={colors.WHITE} />
          <Text style={styles.textPosition}>Cam Le</Text>
          <Fontisto name="angle-down" size={23} color={colors.WHITE} />
        </View>
        <View style={styles.viewNoti}>
          <Feather name="bell" size={24} color={colors.WHITE} />
        </View>
      </View>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.5)']}
        style={styles.viewDetails}>
        <Text style={styles.textTime}>Today, 12 Apr</Text>
        <View style={styles.viewTemperature}>
          <Text style={styles.textTemperature}>29</Text>
          <Text style={styles.textO}>o</Text>
        </View>
        <Text style={styles.textTime}>Sunny</Text>
        <View style={styles.viewWindHum}>
          <View style={styles.viewWind}>
            <Feather name="wind" size={24} color={colors.WHITE} />
            <Text style={styles.textWind}>Wind</Text>
          </View>
          <View style={styles.viewNumberWind}>
            <Text style={styles.textNumberWind}>10km/h</Text>
          </View>
        </View>
        <View style={styles.viewWindHum2}>
          <View style={styles.viewWind}>
            <Ionicons name="water-outline" size={24} color={colors.WHITE} />
            <Text style={styles.textWind}>Hum</Text>
          </View>
          <View style={styles.viewNumberWind}>
            <Text style={styles.textNumberWind}>54%</Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.buttonDetail}
        onPress={() => navigation.navigate('WeatherDetail')}>
        <Text style={styles.textDetail}>Forecast report</Text>
        <Feather name="chevron-right" size={24} color={colors.BLACK} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    paddingVertical: heightScreen * 0.05,
    paddingHorizontal: widthScreen * 0.05,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewPosition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPosition: {
    marginHorizontal: widthScreen * 0.05,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  viewNoti: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetails: {
    height: heightScreen * 0.45,
    width: widthScreen * 0.85,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: heightScreen * 0.15,
    borderColor: colors.WHITE,
  },
  viewWindHum: {
    height: heightScreen * 0.05,
    backgroundColor: colors.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginVertical: heightScreen * 0.02,
  },
  viewWindHum2: {
    height: heightScreen * 0.05,
    backgroundColor: colors.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  textTime: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.WHITE,
    marginVertical: heightScreen * 0.02,
  },
  viewTemperature: {
    height: heightScreen * 0.12,
    flexDirection: 'row',
  },
  textTemperature: {
    fontSize: 80,
    color: colors.WHITE,
  },
  textO: {
    fontSize: 35,
    color: colors.WHITE,
  },
  viewWind: {
    width: widthScreen * 0.35,
    height: heightScreen * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: colors.WHITE,
  },
  viewNumberWind: {
    width: widthScreen * 0.35,
    height: heightScreen * 0.03,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  textWind: {
    color: colors.WHITE,
    fontSize: 20,
    marginLeft: widthScreen * 0.015,
  },
  textNumberWind: {
    color: colors.WHITE,
    fontSize: 20,
  },
  buttonDetail: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.4,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: heightScreen * 0.15,
  },
  textDetail: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.BLACK,
  },
});
