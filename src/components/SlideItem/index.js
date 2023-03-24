import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';

const SlideItem = ({item}) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <ImageBackground
      style={styles.container}
      source={item.img}
      resizeMode="cover">
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ImageBackground>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    height: heightScreen,
  },
  img: {
    flex: 1,
    tintColor: 'gray',
  },
  content: {
    flex: 0.2,
    alignItems: 'center',
    top: heightScreen * 0.66,
    width: widthScreen * 0.85,
    alignSelf: 'center',
  },
  title: {
    fontSize: 43,
    fontWeight: 'bold',
    color: colors.MAINCOLOR,
  },
  description: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
