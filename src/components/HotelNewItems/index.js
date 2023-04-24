import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HotelNewItems = () => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity style={styles.viewParent}>
      <Image
        style={styles.img}
        source={require('../../assets/images/muinghe.png')}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.Favorites}>
          <Text style={styles.textName} numberOfLines={1}>
            Mui Nghe
          </Text>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <FontAwesome
              name="heart"
              size={22}
              color={like ? colors.RED : colors.STRONGGRAY}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewPos}>
          <FontAwesome name="map-marker" size={22} color={colors.STRONGGRAY} />
          <Text style={styles.textPositions} numberOfLines={1}>
            Son Tra, Da Nang
          </Text>
        </View>
        <Text style={styles.textPrice}>$80.50</Text>
        <View style={styles.star}>
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelNewItems;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.19,
    width: widthScreen * 0.88,
    borderRadius: 12,
    marginVertical: heightScreen * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.04,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: colors.WHITE,
    paddingHorizontal: widthScreen * 0.02,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: heightScreen * 0.17,
    width: widthScreen * 0.35,
    borderRadius: 12,
  },
  content: {
    height: heightScreen * 0.16,
    width: widthScreen * 0.43,
    justifyContent: 'space-between',
    marginRight: widthScreen * 0.01,
  },
  Favorites: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPositions: {
    fontSize: 14,
    marginLeft: widthScreen * 0.015,
  },
  textName: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 600,
  },
  star: {
    flexDirection: 'row',
    width: widthScreen * 0.25,
    justifyContent: 'space-between',
  },
  viewPos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: 600,
  },
});
