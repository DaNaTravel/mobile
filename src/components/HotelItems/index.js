import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const HotelItems = ({item}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('BookingDetail',{item})}>
      <Image
        style={styles.image}
        source={require('../../assets/images/booking.jpg')}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.2)', 'rgba(10,10,10,0.7)']}
        style={styles.viewBlur}>
        <Text numberOfLines={1} style={styles.name}>
          Symphony
        </Text>
        <View style={styles.viewPos}>
          <FontAwesome name="map-marker" size={28} color={colors.MEDIUMGRAY} />
          <Text style={styles.position} numberOfLines={1}>
            Hai Chau, Da Nang
          </Text>
        </View>
        <View style={styles.viewStarPrice}>
          <Text style={styles.price}>$20.00</Text>
          <View style={styles.viewStar}>
            <FontAwesome name="star" size={28} color={colors.YELLOW} />
            <Text style={styles.price}>5</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HotelItems;

const styles = StyleSheet.create({
  container: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginRight: widthScreen * 0.035,
    borderRadius: 17,
  },
  image: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.4,
    borderRadius: 17,
  },
  position: {
    color: colors.MEDIUMGRAY,
    marginLeft: widthScreen * 0.015,
  },
  name: {
    fontWeight: 700,
    fontSize: 20,
    color: colors.WHITE,
    width: widthScreen * 0.3768,
  },
  price: {
    fontWeight: 600,
    fontSize: 18,
    color: colors.WHITE,
  },
  icon_like: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.MAINCOLOR,
  },
  viewPos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStarPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewBlur: {
    paddingVertical: heightScreen * 0.02,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: widthScreen * 0.4,
    paddingHorizontal: widthScreen*0.025,
    borderRadius: 17
  },
});
