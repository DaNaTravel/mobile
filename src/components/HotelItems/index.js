import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {SearchByID} from '../../apis/search';

const HotelItems = ({
  item,
  type,
  setDataAdded,
  setDataPlace,
  selectedItem,
  dataToSent,
  setDataToSent,
  setData,
}) => {
  const navigation = useNavigation();
  const handleTotal = num => {
    let formattedNum = num
      ?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      ?.replace(',00', '')
      ?.slice(0, -1);
    return formattedNum;
  };
  const handleAdd = async () => {
    let newData = {
      description: {
        _id: item?._id,
        photos: item?.photos?.[0]?.photo_reference,
        name: item?.name,
        address: item?.formatted_address,
        rating: item?.rating,
        latitude: item?.latitude,
        longitude: item?.longitude,
      },
      cost: item?.cost,
    };
    console.log('dataId', item?._id);
    console.log('dataToSent', dataToSent?.routes);
    let result = [...dataToSent?.routes[selectedItem - 1], {_id: item?._id}];
    console.log('result', result);
    dataToSent.routes[selectedItem - 1] = result;
    setDataToSent({...dataToSent});
    setData(preData => [...preData, newData]);
    setDataPlace(newData);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('BookingDetail', {item: item})}>
      <Image
        style={styles.image}
        source={
          item?.photos?.[0].photo_reference
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.photos?.[0].photo_reference}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
              }
            : require('../../assets/images/booking.jpg')
        }
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.01)', 'rgba(10,10,10,0.7)']}
        style={styles.viewBlur}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.name ? item?.name : 'Symphony'}
        </Text>
        <View style={styles.viewPos}>
          <FontAwesome name="map-marker" size={20} color={colors.MEDIUMGRAY} />
          <Text style={styles.position} numberOfLines={1}>
            {item?.formatted_address
              ? item?.formatted_address
              : 'Hai Chau, Da Nang'}
          </Text>
        </View>
        <View style={styles.viewStarPrice}>
          <Text style={styles.price}>
            {item?.cost !== 0 ? handleTotal(item?.cost) : 'FREE'}
            {item?.cost !== 0 ? 'VND' : null}
          </Text>
          <View style={styles.viewStar}>
            <FontAwesome
              name="star"
              size={20}
              color={colors.YELLOW}
              style={styles.viewAStar}
            />
            <Text style={styles.star}>{item?.rating ? item?.rating : '5'}</Text>
          </View>
        </View>
      </LinearGradient>
      {type === 'select' ? (
        <TouchableOpacity
          style={styles.viewSelect}
          onPress={() => {
            setDataAdded(prevData => [...prevData, item]);
          }}>
          <Entypo name="plus" size={28} color={colors.BLACK} />
        </TouchableOpacity>
      ) : type === 'add' ? (
        <TouchableOpacity style={styles.viewSelect} onPress={() => handleAdd()}>
          <Entypo name="plus" size={28} color={colors.BLACK} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
    marginLeft: widthScreen * 0.0175,
  },
  image: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.4,
    borderRadius: 17,
  },
  position: {
    color: colors.MEDIUMGRAY,
    marginLeft: widthScreen * 0.015,
    fontSize: 16,
  },
  name: {
    fontWeight: 700,
    fontSize: 18,
    color: colors.WHITE,
    width: widthScreen * 0.3768,
  },
  price: {
    fontWeight: 600,
    fontSize: 12,
    color: colors.WHITE,
  },
  star: {
    fontWeight: 600,
    fontSize: 12,
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
    paddingHorizontal: widthScreen * 0.025,
    borderRadius: 17,
  },
  viewAStar: {
    marginRight: widthScreen * 0.007,
  },
  viewSelect: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    backgroundColor: colors.WHITE,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
