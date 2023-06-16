import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddedItem = ({item, setDataAdded, dataAdded, setFilterData}) => {
  const handleTotal = num => {
    let formattedNum = num
      .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace(',00', '')
      .slice(0, -1);
    return formattedNum;
  };
  const handleRemove = id => {
    setFilterData(prevData => [...prevData, item]);
    const filteredArr = dataAdded.filter(item => item._id !== id);
    setDataAdded(filteredArr);
  };
  return (
    <View style={styles.viewItemAdded}>
      <Image
        source={
          item?.photos?.[0].photo_reference
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.photos?.[0].photo_reference}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
              }
            : require('../../assets/images/booking.jpg')
        }
        style={styles.img}
      />
      <View style={styles.viewInfo}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.name ? item?.name : 'Symphony'}
        </Text>
        <View style={styles.viewPos}>
          <FontAwesome name="map-marker" size={18} color={colors.MAINCOLOR} />
          <Text style={styles.position} numberOfLines={1}>
            {item?.formatted_address
              ? item?.formatted_address
              : 'Hai Chau, Da Nang'}
          </Text>
        </View>
        <Text style={styles.price}>
          {item?.cost !== 0 ? handleTotal(item?.cost) : 'FREE'}{' '}
          {item?.cost !== 0 ? 'VND' : null}
        </Text>
        <View style={styles.viewStar}>
          <FontAwesome
            name="star"
            size={18}
            color={colors.YELLOW}
            style={styles.viewAStar}
          />
          <Text style={styles.star}>{item?.rating ? item?.rating : '5'}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.viewRemove}
        onPress={() => handleRemove(item?._id)}>
        <FontAwesome name="remove" size={16} color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default AddedItem;

const styles = StyleSheet.create({
  viewItemAdded: {
    height: heightScreen * 0.13,
    width: widthScreen * 0.5,
    backgroundColor: colors.WHITE,
    marginHorizontal: widthScreen * 0.015,
    marginTop: heightScreen * 0.02,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  img: {
    height: heightScreen * 0.11,
    width: widthScreen * 0.2,
    marginLeft: widthScreen * 0.01,
    borderRadius: 17,
  },
  viewInfo: {
    height: heightScreen * 0.11,
    width: widthScreen * 0.23,
    marginLeft: widthScreen * 0.01,
    justifyContent: 'space-evenly',
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
    color: colors.BLACK,
    width: widthScreen * 0.25,
  },
  viewPos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    color: colors.BLACK,
    marginLeft: widthScreen * 0.01,
  },
  price: {
    fontWeight: 600,
    fontSize: 13,
    color: colors.GREEN,
  },
  star: {
    fontWeight: 600,
    fontSize: 13,
    color: colors.BLACK,
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRemove: {
    height: 20,
    width: 20,
    backgroundColor: colors.RED,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    right: -5,
  },
});
