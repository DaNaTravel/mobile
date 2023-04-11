import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, heightScreen, widthScreen} from '../../utility';

export const SLIDER_WIDTH = widthScreen;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <LinearGradient
        colors={['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.8)']}
        style={styles.viewBlur}>
        <Image source={item.imgUrl} style={styles.image} />
        <View style={styles.viewFrontImg}>
          {item.id === 2 ? (
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Weather forecast</Text>
              <Text style={styles.textTitle2}>
                Accurate weather information
              </Text>
            </View>
          ) : item.id === 1 ? (
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle3}>Travel itinerary</Text>
              <Text style={styles.textTitle4}>
                Suggest a suitable itinerary
              </Text>
            </View>
          ) : (
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Booking</Text>
              <Text style={styles.textTitle2}>Reasonable price selection</Text>
            </View>
          )}

          <TouchableOpacity style={styles.buttonTry}>
            <Text style={styles.textTry}>Try it</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: ITEM_WIDTH,
    height: heightScreen * 0.3,
    borderRadius: 20,
  },
  viewBlur: {
    position: 'absolute',
    width: widthScreen * 0.8,
    height: heightScreen * 0.3,
    borderRadius: 20,
  },
  buttonTry: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.19,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTry: {
    fontSize: 11,
    color: colors.WHITE,
    fontWeight: 600,
  },
  viewFrontImg: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: ITEM_WIDTH * 0.8,
    height: heightScreen * 0.3,
    alignSelf: 'center',
    top: heightScreen * 0.2,
  },
  textTitle: {
    fontSize: 15,
    color: colors.WHITE,
  },
  textTitle2: {
    fontSize: 11,
    color: colors.WHITE,
  },
  textTitle3: {
    fontSize: 15,
    color: colors.BLACK,
  },
  textTitle4: {
    fontSize: 11,
    color: colors.BLACK,
  },
});

export default CarouselItem;
