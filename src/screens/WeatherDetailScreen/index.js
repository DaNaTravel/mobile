import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AccordionItemWeather from '../../components/AccordionItemWeather';
import WeatherTodayItem from '../../components/Weather/WeatherTodayItem';
import WeatherDayItem from '../../components/Weather/WeatherDayItem';

const WeatherDetail = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      colors={['rgba(97,158,192,1)', 'rgba(162,202,226,1)']}
      style={styles.viewParent}>
      <TouchableOpacity style={styles.buttonBack}>
        <FontAwesome name="angle-left" size={30} color={colors.BLACK} />
      </TouchableOpacity>
      <View style={styles.viewTitle}>
        <Text style={styles.textToday}>Today</Text>
        <Text style={styles.textDate}>12 Apr</Text>
      </View>
      <FlatList
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 0,
        ]}
        renderItem={({item, index}) => <WeatherTodayItem item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        scrollEnabled={true}
        keyExtractor={index => index}
        style={styles.viewWeatherToday}
      />
      <View style={styles.viewNext}>
        <View style={styles.viewHeader}>
          <Text style={styles.textToday}>Next forecast</Text>
          <FontAwesome name="calendar" size={30} color={colors.WHITE} />
        </View>
        <FlatList
          data={[14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
          renderItem={({item, index}) => <WeatherDayItem item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={index => index}
          style={styles.viewWeatherToday}
        />
      </View>
    </LinearGradient>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    paddingVertical: heightScreen * 0.05,
    paddingHorizontal: widthScreen * 0.06,
  },
  buttonBack: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    height: heightScreen * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightScreen * 0.02,
  },
  textToday: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  textDate: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.WHITE,
  },
  viewWeatherToday: {
    height: heightScreen * 0.1,
  },
  viewNext: {
    height: heightScreen * 0.53,
  },
  viewHeader: {
    height: heightScreen * 0.1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
