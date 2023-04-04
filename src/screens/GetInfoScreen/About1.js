import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldButton from '../../components/FieldButton';
import {useNavigation} from '@react-navigation/native';

const About1 = () => {
  const navigaton = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const wheelPickerNumbers = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
  ];
  return (
    <View style={styles.viewParent}>
      <View>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => navigation.navigate('About1')}
            style={styles.buttonBack}>
            <FontAwesome name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHello}>How many people join this trip?</Text>
        <Text style={styles.textWelcome}>This help us create your plan.</Text>
      </View>
      <WheelPicker
        selectedIndex={selectedIndex - 1}
        options={wheelPickerNumbers}
        onChange={index => {
          setSelectedIndex(index + 1);
        }}
        itemHeight={70}
        itemTextStyle={{fontWeight: '600', fontSize: 25}}
        selectedIndicatorStyle={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: colors.MAINCOLOR,
        }}
      />
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}
        icon2={'angle-right'}
        size2={30}
        color2={'#fff'}
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
    justifyContent: 'center',
  },
  viewBack: {
    height: heightScreen * 0.12,
    width: widthScreen,
  },
  buttonBack: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    bottom: 0,
    left: widthScreen * 0.05,
  },
  textHello: {
    fontWeight: '500',
    fontSize: 35,
    color: '#000',
    textAlign: 'center',
  },
  textWelcome: {
    fontSize: 20,
    color: '#707B81',
    textAlign: 'center',
  },
  containerBody: {
    height: heightScreen,
    alignSelf: 'center',
  },
  buttonNext: {
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    marginTop: heightScreen * 0.1,
  },
});
