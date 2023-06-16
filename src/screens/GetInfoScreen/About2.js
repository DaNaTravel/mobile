import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {colors, heightScreen, widthScreen} from '../../utility';
import WelcomeAbout from '../../components/WelcomeAbout';
import FieldButton from '../../components/FieldButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const About2 = ({route}) => {
  const {numberPeople} = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };
  const minDate = new Date();
  const maxDate = new Date(2027, 9, 17);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  // calculate a number of days
  let arr = [];
  const startDay = new Date(startDate);
  const endDay = new Date(endDate);
  const rangeInMilliseconds = endDay - startDay;
  const rangeInDays = Math.round(rangeInMilliseconds / 86400000);
  for (let i = 1; i <= rangeInDays + 1; i++) {
    arr.push(i);
  }

  //convert day
  const datestart = new Date(startDate);
  const yearstart = datestart.getFullYear();
  const monthstart = String(datestart.getMonth() + 1).padStart(2, '0');
  const daystart = String(datestart.getDate()).padStart(2, '0');
  const convertStart = `${yearstart}-${monthstart}-${daystart}`;

  const dateend = new Date(endDate);
  const yearend = dateend.getFullYear();
  const monthend = String(dateend.getMonth() + 1).padStart(2, '0');
  const dayend = String(dateend.getDate()).padStart(2, '0');
  const covertEnd = `${yearend}-${monthend}-${dayend}`;
  const data = {
    number: numberPeople,
    time: {
      startDate: convertStart,
      endDate: covertEnd,
    },
    days: arr,
  };
  const navigaton = useNavigation();
  const handleNavi = () => {
    AsyncStorage.setItem('data', JSON.stringify(data));
    navigaton.navigate('About3');
  };
  const handleNaviDefault = () => {
    let now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    let dataDefault = {
      number: numberPeople,
      time: {
        startDate: date,
        endDate: date,
      },
      days: [1],
    };
    AsyncStorage.setItem('data', JSON.stringify(dataDefault));
    navigaton.navigate('About3');
  };
  const handleNext = () => {
    startDate === '' || endDate === '' ? handleNaviDefault() : handleNavi();
  };
  return (
    <View style={styles.viewParent}>
      <WelcomeAbout title={'How long do you want to visit Da Nang?'} />
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#9CC8F1"
        selectedDayColor={colors.MAINCOLOR}
        selectedDayTextColor={colors.WHITE}
        onDateChange={onDateChange}
        previousTitleStyle={styles.titlePreNext}
        nextTitleStyle={styles.titlePreNext}
        monthTitleStyle={styles.titleMonthYear}
        yearTitleStyle={styles.titleMonthYear}
      />
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={styles.textNext}
        icon2={'angle-right'}
        size2={30}
        color2={colors.WHITE}
        onPress={() => handleNext()}
      />
    </View>
  );
};

export default About2;

const styles = StyleSheet.create({
  viewParent: {
    backgroundColor: colors.WHITE,
    height: heightScreen,
    width: widthScreen,
  },
  containerBody: {
    height: heightScreen,
    alignSelf: 'center',
  },
  buttonNext: {
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    position: 'absolute',
    bottom: heightScreen * 0.03,
  },
  titlePreNext: {
    fontSize: 12,
  },
  titleMonthYear: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.MAINCOLOR,
  },
  textNext: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
