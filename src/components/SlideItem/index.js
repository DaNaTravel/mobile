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
import LinearGradient from 'react-native-linear-gradient';

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
      <LinearGradient
        colors={['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.7)']}
        style={styles.viewBlur}>
        {item.id === 2 ? (
          <Text style={styles.title2}>{item.title}</Text>
        ) : (
          <Text style={styles.title}>{item.title}</Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </LinearGradient>
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
  title: {
    fontSize: 43,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  title2: {
    fontSize: 43,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  description: {
    fontSize: 20,
    color: colors.WHITE,
  },
  viewBlur: {
    width: widthScreen,
    height: heightScreen * 0.45,
    paddingHorizontal: widthScreen * 0.06,
    top: heightScreen * 0.55,
    alignSelf: 'center',
    paddingTop: heightScreen * 0.115,
  },
});
