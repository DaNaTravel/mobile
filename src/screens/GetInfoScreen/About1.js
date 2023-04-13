import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import {colors, heightScreen, widthScreen} from '../../utility';
import FieldButton from '../../components/FieldButton';
import {useNavigation} from '@react-navigation/native';
import WelcomeAbout from '../../components/WelcomeAbout';

const About1 = () => {
  const navigaton = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(2);
  let wheelPickerNumbers = [];
  for (let i = 1; i < 61; i++) {
    wheelPickerNumbers.push(i);
  }
  return (
    <View style={styles.viewParent}>
      <WelcomeAbout title={'How many people join this trip?'} />
      <WheelPicker
        selectedIndex={selectedIndex - 1}
        options={wheelPickerNumbers}
        onChange={index => {
          setSelectedIndex(index + 1);
        }}
        itemHeight={70}
        itemTextStyle={{fontWeight: 600, fontSize: 30}}
        selectedIndicatorStyle={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: colors.MAINCOLOR,
        }}
      />
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={styles.textNext}
        icon2={'angle-right'}
        size2={30}
        color2={colors.WHITE}
        onPress={() =>
          navigaton.navigate('About2', {numberPeople: selectedIndex})
        }
      />
    </View>
  );
};

export default About1;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  buttonNext: {
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    marginTop: heightScreen * 0.1,
  },
  textNext: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
