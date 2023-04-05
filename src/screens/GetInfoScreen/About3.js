import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {colors, heightScreen, widthScreen} from '../../utility';
import FieldButton from '../../components/FieldButton';
import WelcomeAbout from '../../components/WelcomeAbout';
import WheelPicker from 'react-native-wheely';

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
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.textWelcome}>
        1. Your main goal when going to Da Nang?
      </Text>
      <WheelPicker
        selectedIndex={selectedIndex}
        options={['Eat', 'Explore', 'Both']}
        onChange={index => setSelectedIndex(index)}
        itemTextStyle={{fontWeight: '600', fontSize: 25}}
        selectedIndicatorStyle={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: colors.MAINCOLOR,
        }}
      />
      <Text style={styles.textWelcome}>
        2. Your estimated spending amount for the trip? (Unit: million VNĐ)
      </Text>
      <Text style={styles.result}>
        {Array.isArray(value) ? value.join(' - ') : value}
      </Text>
      {renderChildren()}
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}
        icon2={'angle-right'}
        size2={30}
        color2={'#fff'}
        onPress={() => console.log(value)}
      />
    </View>
  );
};
const About3 = ({route}) => {
  const {data} = route.params;

  return (
    <View style={styles.viewParent}>
      <WelcomeAbout
        title={'Other questions...'}
        styleButtonBack={{backgroundColor: '#F8F9FA'}}
      />
      <SliderContainer sliderValue={[5, 7]}>
        <Slider
          maximumTrackTintColor="#d3d3d3"
          maximumValue={20}
          minimumTrackTintColor={colors.MAINCOLOR}
          minimumValue={1}
          step={1}
          thumbTintColor="#fff"
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
  },
  buttonNext: {
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    marginTop: heightScreen * 0.183,
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
    fontWeight: '600',
    fontSize: 16,
  },
});
