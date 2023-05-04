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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const SLIDER_WIDTH = widthScreen;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselItinerary = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <LinearGradient
        colors={['rgba(255,255,255,0.2)', 'rgba(10,10,10,0.7)']}
        style={styles.viewBlur}>
        <View style={styles.viewFrontImg}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>{item?.title}</Text>
              <View style={styles.viewAddress}>
                <Feather name="map-pin" size={14} color={colors.WHITE} />
                <Text style={styles.textTitle2}>
                {item?.address}
                </Text>
              </View>
              <View style={styles.viewPriceStar}>
                <Text style={styles.textTitle2}>{item?.price}</Text>
                <View style={styles.viewStar}>
                <FontAwesome name="star" size={14} color={colors.WHITE} />
                    <Text style={styles.textTitle2}>
                        {item?.rating}
                    </Text>
                </View>
              </View>
            </View>
          <TouchableOpacity style={styles.buttonTry}>
            <Text style={styles.textTry}>Try it</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Image source={{uri:item.imgUrl}} style={styles.image} />
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
    zIndex: 0,
  },
  image: {
    width: ITEM_WIDTH,
    height: heightScreen * 0.28,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1,
  },
  viewBlur: {
    position: 'absolute',
    width: widthScreen * 0.8,
    height: heightScreen * 0.28,
    borderRadius: 20,
    zIndex: 2,
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
    top: heightScreen * 0.17,
    zIndex: 3,
  },
  textTitle: {
    fontSize: 15,
    color: colors.WHITE,
    fontWeight: 600,
  },
  textTitle2: {
    fontSize: 12,
    color: colors.WHITE,
    fontWeight: 600,
    marginLeft: widthScreen*0.01
  },
  viewAddress:{
    flexDirection: 'row'
  },
  viewPriceStar:{
    flexDirection: 'row',
    width: widthScreen*0.35,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  viewStar:{
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CarouselItinerary;
