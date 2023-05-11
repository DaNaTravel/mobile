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
    console.log(alert);
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
      onPress={() => navigation.navigate('PlaceDetail', {data: item})}>
      <Image
        source={{uri: item?.img}}
        resizeMethod="scale"
        style={styles.viewImg}
      />
      <View style={styles.viewInfo}>
        <View style={styles.viewName}>
          <Text style={styles.textName} numberOfLines={1}>
            {item?.name}
          </Text>
          <View style={styles.viewStar}>
            <FontAwesome name="star" size={17} color={colors.WHITE} />
            <Text style={styles.textRating}>{item?.rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewLike} onPress={() => handleLike()}>
          <FontAwesome
            name="heart"
            size={23}
            color={like ? colors.RED : colors.STRONGGRAY}
          />
        </TouchableOpacity>
      </View>
      {alert ? <NonAccount alert={alert} setAlert={setAlert} /> : null}
    </TouchableOpacity>
  );
};

export default FavoritePlace;

const styles = StyleSheet.create({
  viewContainer: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.23,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    marginHorizontal: widthScreen * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  viewImg: {
    height: heightScreen * 0.162,
    width: widthScreen * 0.5,
    backgroundColor: colors.STRONGGRAY,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  viewInfo: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.45,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewName: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.32,
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  viewLike: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthScreen * 0.15,
    backgroundColor: colors.YELLOW,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: heightScreen * 0.01,
  },
  textName: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.BLACK,
  },
  textRating: {
    marginLeft: widthScreen * 0.015,
    fontWeight: 600,
    color: colors.WHITE,
    fontSize: 16,
  },
});
