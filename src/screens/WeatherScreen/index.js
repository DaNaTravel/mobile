import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {WeatherPlace} from '../../apis/Weather/WeatherByLatLon';
import SelectDropdown from 'react-native-select-dropdown';

const districts = [
  'Hoang Sa',
  'Hoa Vang',
  'Thanh Khe',
  'Cam Le',
  'Lien Chieu',
  'Ngu Hanh Son',
  'Son Tra',
  'Hai Chau',
];
const Weather = () => {
  const navigation = useNavigation();
  const [positions, setPositions] = useState({lat: 16.103525, lon: 108.282446});
  const [data, setData] = useState();
  useEffect(() => {
    WeatherPlace(positions?.lat, positions?.lon)
      .then(res => {
        setData(res);
      })
      .catch(err => err);
  }, [positions]);
  const renderDropdownIcon = () => {
    return <Fontisto name="angle-down" size={23} color={colors.WHITE} />;
  };
  const getDay = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let monthIndex = currentDate.getMonth();
    let monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let monthName = monthNames[monthIndex];
    let formattedDate = `${day} ${monthName}`;
    return formattedDate;
  };
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      colors={['rgba(97,158,192,1)', 'rgba(162,202,226,1)']}
      style={styles.viewParent}>
      <View style={styles.viewHeader}>
        <View style={styles.viewPosition}>
          <Fontisto name="map-marker-alt" size={23} color={colors.WHITE} />
          <SelectDropdown
            data={districts}
            showsVerticalScrollIndicator={false}
            onSelect={(selectedItem, index) => {
              index === 0
                ? setPositions({lat: 16.103525, lon: 108.282446})
                : index === 1
                ? setPositions({lat: 15.999988, lon: 108.145799})
                : index === 2
                ? setPositions({lat: 16.06418, lon: 108.187341})
                : index === 3
                ? setPositions({lat: 16.015367, lon: 108.196236})
                : index === 4
                ? setPositions({lat: 16.07177, lon: 108.150382})
                : index === 5
                ? setPositions({lat: 15.995506, lon: 108.258805})
                : index === 6
                ? setPositions({lat: 16.106998, lon: 108.252182})
                : setPositions({lat: 16.0472, lon: 108.219959});
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText={'Cam Le'}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={renderDropdownIcon}
            dropdownIconPosition={'right'}
            buttonTextStyle={styles.textPosition}
            dropdownStyle={{
              backgroundColor: 'transparent',
            }}
            rowTextStyle={{
              color: colors.WHITE,
              fontSize: 20,
              fontWeight: 500,
            }}
          />
        </View>
        <View style={styles.viewNoti}>
          <Feather name="bell" size={24} color={colors.WHITE} />
        </View>
      </View>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`,
        }}
        style={styles.imgMain}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.5)']}
        style={styles.viewDetails}>
        <Text style={styles.textTime}>Today, {data ? getDay() : null}</Text>
        <View style={styles.viewTemperature}>
          <Text style={styles.textTemperature}>
            {data?.main?.temp ? Math.floor(data?.main?.temp - 273) : '30'}
          </Text>
          <Text style={styles.textO}>o</Text>
        </View>
        <View style={styles.viewWeather}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`,
            }}
            style={styles.imgIcon}
            resizeMode="cover"
          />
          <Text style={styles.textTime}>
            {data?.weather?.[0]?.description?.replace(/\b\w/g, c =>
              c.toUpperCase(),
            )}
          </Text>
        </View>
        <View style={styles.viewWindHum}>
          <View style={styles.viewWind}>
            <Feather name="wind" size={24} color={colors.WHITE} />
            <Text style={styles.textWind}>Wind</Text>
          </View>
          <View style={styles.viewNumberWind}>
            <Text style={styles.textNumberWind}>{data?.wind?.speed} m/s</Text>
          </View>
        </View>
        <View style={styles.viewWindHum2}>
          <View style={styles.viewWind}>
            <Ionicons name="water-outline" size={24} color={colors.WHITE} />
            <Text style={styles.textWind}>Hum</Text>
          </View>
          <View style={styles.viewNumberWind}>
            <Text style={styles.textNumberWind}>{data?.main?.humidity} %</Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.buttonDetail}
        onPress={() => navigation.navigate('WeatherDetail')}>
        <Text style={styles.textDetail}>Forecast report</Text>
        <Feather name="chevron-right" size={24} color={colors.BLACK} />
      </TouchableOpacity>
    </LinearGradient>
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
  textPosition: {
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
    marginTop: heightScreen * 0.05,
  },
  textDetail: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.BLACK,
  },
  dropDown: {
    alignSelf: 'center',
    width: widthScreen * 0.4,
    backgroundColor: 'transparent',
  },
  viewPosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewWeather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    height: 70,
    width: 70,
  },
  imgMain: {
    height: heightScreen * 0.25,
    width: widthScreen * 0.5,
    alignSelf: 'center',
  },
});
