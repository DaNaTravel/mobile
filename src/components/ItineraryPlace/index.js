import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import ConfirmDelete from '../Modal/ConfirmDelete';

const ItineraryPlace = ({item, type, listLoca, setListLoca}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleDelete = () => {
    setModalVisible(!isModalVisible);
  };
  const handleTotal = num => {
    let formattedNum = num
      ?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      ?.replace(',00', '')
      ?.slice(0, -1);
    return formattedNum;
  };
  return (
    <View
      style={type === 'edit' ? styles.viewParentEdit : styles.viewParent}
      // onPress={() => navigation.navigate('LocationDetail', {item: item})}
    >
      <View style={styles.viewTime}>
        <View style={styles.circleParent}>
          <View style={styles.circleSon}></View>
        </View>
        <Text style={styles.textTime}>
          {item?.travelTime?.arrival} - {item?.travelTime?.departure}
        </Text>
      </View>
      <View
        style={type === 'edit' ? styles.viewContentEdit : styles.viewContent}>
        <View
          style={
            type === 'edit' ? styles.viewInfoEdit : styles.viewInformation
          }>
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
          <View
            style={
              (type === 'edit') === null
                ? styles.viewDetailEdit
                : styles.viewDetail
            }>
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

            <Text style={styles.textPrice}>
              {item?.cost !== 0 ? handleTotal(item?.cost) : 'FREE'}{' '}
              {item?.cost !== 0 ? 'VND' : null}
            </Text>
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
                <FontAwesome5
                  name="temperature-high"
                  size={17}
                  color={colors.BLACK}
                />
                <Text style={styles.textTem}>33</Text>
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={17}
                  color={colors.BLACK}
                />
              </View>
            </View>
          </View>
          {type === 'edit' ? (
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                handleDelete();
              }}>
              <FontAwesome name="trash-o" size={30} color={colors.BLACK} />
            </TouchableOpacity>
          ) : null}
          <ConfirmDelete
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            listLoca={listLoca}
            dataId={item?.description?._id}
            setListLoca={setListLoca}
          />
        </View>
      </View>
    </View>
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
  viewParentEdit: {
    height: heightScreen * 0.2,
    width: widthScreen * 0.95,
    marginVertical: heightScreen * 0.008,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
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
  viewContentEdit: {
    width: widthScreen * 0.905,
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
  viewInfoEdit: {
    marginLeft: widthScreen * 0.05,
    alignSelf: 'flex-start',
    height: heightScreen * 0.14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.85,
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
  viewDetailEdit: {
    width: widthScreen * 0.44,
    height: heightScreen * 0.13,
    justifyContent: 'space-between',
    marginRight: widthScreen * 0.087,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textPos: {
    fontSize: 13,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
  },
  textPrice: {
    fontSize: 13,
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
    fontSize: 11,
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
  textTem: {
    color: colors.BLACK,
    marginLeft: widthScreen * 0.01,
    fontSize: 11,
  },
});
