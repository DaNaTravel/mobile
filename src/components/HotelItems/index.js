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
  const [dataHT, setDataHT] = useState({});
  useLayoutEffect(() => {
    SearchByID(item?._id, setDataHT);
  }, []);
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
        _id: dataHT?._id,
        photos: dataHT?.photos?.[0]?.photo_reference,
        name: dataHT?.name,
        address: dataHT?.formatted_address,
        rating: dataHT?.rating,
        latitude: dataHT?.latitude,
        longitude: dataHT?.longitude,
      },
      cost: dataHT?.cost,
    };
    console.log('dataId', dataHT?._id);
    console.log('dataToSent', dataToSent?.routes);
    let result = [...dataToSent?.routes[selectedItem - 1], {_id: dataHT?._id}];
    console.log('result', result);
    dataToSent.routes[selectedItem - 1] = result;
    setDataToSent({...dataToSent});
    setData(preData => [...preData, newData]);
    setDataPlace(newData);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('BookingDetail', {item: dataHT})}>
      <Image
        style={styles.image}
        source={
          dataHT?.photos?.[0].photo_reference
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${dataHT?.photos?.[0].photo_reference}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
              }
            : require('../../assets/images/booking.jpg')
        }
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.01)', 'rgba(10,10,10,0.7)']}
        style={styles.viewBlur}>
        <Text numberOfLines={1} style={styles.name}>
          {dataHT?.name ? dataHT?.name : 'Symphony'}
        </Text>
        <View style={styles.viewPos}>
          <FontAwesome name="map-marker" size={28} color={colors.MEDIUMGRAY} />
          <Text style={styles.position} numberOfLines={1}>
            {dataHT?.formatted_address
              ? dataHT?.formatted_address
              : 'Hai Chau, Da Nang'}
          </Text>
        </View>
        <View style={styles.viewStarPrice}>
          <Text style={styles.price}>
            {item?.cost !== 0 ? handleTotal(item?.cost) : 'FREE'}{' '}
            {item?.cost !== 0 ? 'VND' : null}
          </Text>
          <View style={styles.viewStar}>
            <FontAwesome
              name="star"
              size={28}
              color={colors.YELLOW}
              style={styles.viewAStar}
            />
            <Text style={styles.star}>
              {dataHT?.rating ? dataHT?.rating : '5'}
            </Text>
          </View>
        </View>
      </LinearGradient>
      {type === 'select' ? (
        <TouchableOpacity
          style={styles.viewSelect}
          onPress={() => {
            setDataAdded(prevData => [...prevData, dataHT]);
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
    fontSize: 15,
    color: colors.WHITE,
  },
  star: {
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
