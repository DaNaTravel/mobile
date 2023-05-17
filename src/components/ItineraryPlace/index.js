import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ItineraryPlace = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.viewParent}
      onPress={() =>
        navigation.navigate('BookingDetail', {item: item, type: 'show'})
      }>
      <View style={styles.viewTime}>
        <View style={styles.circleParent}>
          <View style={styles.circleSon}></View>
        </View>
        <Text style={styles.textTime}>
          {item?.travelTime?.arrival} - {item?.travelTime?.departure}
        </Text>
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewInformation}>
          <Image
            style={styles.viewImg}
            source={
              item?.description?.photos
                ? {
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.description?.photos}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
                  }
                : require('../../assets/images/bana.jpg')
            }
          />
          <View style={styles.viewDetail}>
            <Text style={styles.textTitle} numberOfLines={1}>
              {item?.description?.name}
            </Text>
            <View style={styles.viewPos}>
              <FontAwesome
                name="map-marker"
                size={17}
                color={colors.MAINCOLOR}
              />
              <Text style={styles.textPos} numberOfLines={1}>
                {item?.description?.address}
              </Text>
            </View>

            <Text style={styles.textPrice}>${item?.cost}</Text>
            <View style={styles.viewStarWeather}>
              <View style={styles.viewStar}>
                <FontAwesome name="star" size={17} color="#E8AD16" />
                <Text style={styles.textStar}>
                  {item?.description?.rating === null
                    ? ''
                    : item?.description?.rating}
                </Text>
              </View>
              <View style={styles.viewWeather}>
                <Ionicons name="sunny" size={20} color={colors.MAINCOLOR} />
                <Text style={styles.textStar}>Sun</Text>
              </View>
              <View style={styles.viewTem}>
                <Text style={styles.textTem}>33 </Text>
                <Text style={styles.texto}>o</Text>
                <Text style={styles.textTem}>C</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItineraryPlace;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.2,
    width: widthScreen * 0.85,
    marginVertical: heightScreen * 0.008,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  viewTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleParent: {
    backgroundColor: colors.MAINCOLOR,
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScreen * 0.03,
  },
  circleSon: {
    backgroundColor: colors.WHITE,
    height: 6,
    width: 6,
    borderRadius: 3,
  },
  textTime: {
    fontSize: 15,
    color: colors.STRONGGRAY,
  },
  viewContent: {
    width: widthScreen * 0.81,
    height: heightScreen * 0.16,
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
  },
  viewInformation: {
    width: widthScreen * 0.74,
    alignSelf: 'flex-end',
    height: heightScreen * 0.14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImg: {
    height: heightScreen * 0.13,
    width: widthScreen * 0.28,
    borderRadius: 12,
  },
  viewDetail: {
    width: widthScreen * 0.44,
    height: heightScreen * 0.13,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textPos: {
    fontSize: 14,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
  },
  textPrice: {
    fontSize: 16,
    color: colors.GREEN,
  },
  viewStarWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewPos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStar: {
    fontSize: 15,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.01,
  },
  viewWeather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {
    position: 'absolute',
    left: widthScreen * 0.035,
    top: heightScreen * -0.008,
    fontSize: 12,
    color: colors.BLACK,
  },
  textTem: {
    color: colors.BLACK,
  },
});
