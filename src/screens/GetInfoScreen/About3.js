import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {colors, heightScreen, widthScreen} from '../../utility';
import FieldButton from '../../components/FieldButton';
import WelcomeAbout from '../../components/WelcomeAbout';
import WheelPicker from 'react-native-wheely';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_VALUE = 0.2;
const SliderContainer = props => {
  const {sliderValue, trackMarks} = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE,
  );
  let renderTrackMarkComponent;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = index => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style = currentMarkValue > Math.max(currentSliderValue);
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, child => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const options = ['All', 'Art', 'Historical', 'Culinary', 'Relax', 'Natural'];
  const navigation = useNavigation();
  const handleNext = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    data.expense = value;
    data.mainGoal = selectedIndex;
    await AsyncStorage.setItem('data', JSON.stringify(data));
    navigation.navigate('ChoosePosition');
  };
  return (
    <View style={styles.sliderContainer}>
      <View>
        <Text style={styles.textWelcome}>
          1. What is the main purpose of your trip to Da Nang?
        </Text>
        <WheelPicker
          selectedIndex={selectedIndex}
          options={options}
          onChange={index => setSelectedIndex(index)}
          itemTextStyle={styles.textWheel}
          selectedIndicatorStyle={styles.wheelStyle}
        />
      </View>
      <View style={styles.viewMoney}>
        <Text style={styles.textWelcome}>
          2. What is your anticipated budget for expenses during the trip?
          (Unit: million VND)
        </Text>
        <Text style={styles.result}>
          {Array.isArray(value) ? value.join(' - ') : value}
        </Text>
        {renderChildren()}
      </View>

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
const About3 = () => {
  return (
    <View style={styles.viewParent}>
      <WelcomeAbout
        title={'Other questions...'}
        styleButtonBack={{backgroundColor: colors.GRAY}}
      />
      <SliderContainer sliderValue={[5, 7]}>
        <Slider
          maximumTrackTintColor="#d3d3d3"
          maximumValue={20}
          minimumTrackTintColor={colors.MAINCOLOR}
          minimumValue={1}
          step={1}
          thumbTintColor={colors.MAINCOLOR}
        />
      </SliderContainer>
    </View>
  );
};

export default About3;

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
    marginTop: heightScreen * 0.113,
  },
  sliderContainer: {
    width: widthScreen * 0.85,
    height: heightScreen * 0.5,
    alignSelf: 'center',
  },
  textWelcome: {
    fontSize: 17,
    color: '#707B81',
  },
  result: {
    fontWeight: 600,
    fontSize: 16,
  },
  viewMoney: {
    marginTop: heightScreen * 0.07,
  },
  textWheel: {
    fontWeight: 600,
    fontSize: 25,
  },
  wheelStyle: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.MAINCOLOR,
  },
  textNext: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
