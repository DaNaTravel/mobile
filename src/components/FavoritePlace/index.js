import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NonAccount from '../Modal/NonAccount';

const FavoritePlace = ({item}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  const [alert, setAlert] = useState(false);
  const isNoUser = () => {
    setAlert(!alert);
  };
  const isUser = () => {
    setLike(!like);
  };
  const handleLike = async () => {
    let token = await AsyncStorage.getItem('token');
    token !== null ? isUser() : isNoUser();
  };
  return (
    <TouchableOpacity
      style={styles.viewContainer}
      onPress={() => navigation.navigate('BookingDetail', {item: item})}>
      <Image
        source={
          item?.photo
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.photo}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
              }
            : require('../../assets/images/booking.jpg')
        }
        resizeMethod="scale"
        style={styles.viewImg}
      />
      <View style={styles.viewInfo}>
        <View style={styles.viewName}>
          <Text style={styles.textName} numberOfLines={1}>
            {item?.name}
          </Text>
          <Text style={styles.textAddress} numberOfLines={1}>
            {item?.formatted_address}
          </Text>
        </View>
        <View style={styles.viewStarLike}>
          <View style={styles.viewStar}>
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
            <Text style={styles.textRating}>
              {item?.rating === null ? '5' : item?.rating}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.viewLove}>
        <Image
          source={require('../../assets/images/lover.png')}
          style={styles.imgLove}
        />
        <Text style={styles.textLove}>{item?.favoriteCount}</Text>
      </View>
      {alert ? <NonAccount alert={alert} setAlert={setAlert} /> : null}
    </TouchableOpacity>
  );
};

export default FavoritePlace;

const styles = StyleSheet.create({
  viewContainer: {
    width: widthScreen * 0.6,
    height: heightScreen * 0.3,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    marginHorizontal: widthScreen * 0.02,
    marginTop: heightScreen * 0.01,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    paddingHorizontal: widthScreen * 0.02,
    paddingVertical: widthScreen * 0.02,
    justifyContent: 'space-between',
  },
  viewImg: {
    height: heightScreen * 0.2,
    width: widthScreen * 0.56,
    backgroundColor: colors.STRONGGRAY,
    borderRadius: 15,
  },
  viewInfo: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.56,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewName: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.35,
    justifyContent: 'space-around',
  },
  viewStarLike: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewStar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthScreen * 0.15,
    alignItems: 'center',
  },
  textName: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.BLACK,
  },
  textRating: {
    marginLeft: widthScreen * 0.015,
    fontSize: 16,
  },
  textAddress: {
    fontSize: 14,
  },
  imgLove: {
    height: 22,
    width: 22,
    marginHorizontal: widthScreen * 0.015,
  },
  viewLove: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthScreen * 0.15,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: colors.WHITE,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    right: widthScreen * 0.02,
    top: widthScreen * 0.02,
    padding: 5,
  },
  textLove: {
    fontSize: 18,
    marginRight: widthScreen * 0.015,
  },
});
