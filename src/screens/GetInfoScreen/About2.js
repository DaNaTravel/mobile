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
  const data = {
    number: numberPeople,
    time: {
      startDate: startDate,
      endDate: endDate,
    },
  };
  const navigaton = useNavigation();
  const handleNavi = () => {
    AsyncStorage.setItem('data', JSON.stringify(data));
    navigaton.navigate('About3');
  };
  const handleNext = () => {
    startDate === '' || endDate === ''
      ? Alert.alert('Opps', 'Please choose time!', [
          {
            text: 'Try again',
          },
        ])
      : handleNavi();
  };
  return (
    <View style={styles.viewParent}>
      <WelcomeAbout title={'How long do you explore Da Nang?'} />
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#576CBC"
        selectedDayColor={colors.MAINCOLOR}
        selectedDayTextColor={colors.WHITE}
        onDateChange={onDateChange}
        previousTitleStyle={styles.titlePreNext}
        nextTitleStyle={styles.titlePreNext}
      />
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={{color: colors.WHITE, fontSize: 15, fontWeight: 'bold'}}
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
    marginTop: heightScreen * 0.17,
  },
  titlePreNext: {
    fontSize: 12,
  },
});
