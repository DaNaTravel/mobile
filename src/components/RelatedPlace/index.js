import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RelatedPlace = () => {
  return (
    <View style={styles.viewParent}>
      <Image
        style={styles.img}
        source={require('../../assets/images/muinghe.png')}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.Favorites}>
          <Text style={styles.textName}>Mui Nghe</Text>
          <FontAwesome name="heart-o" size={22} color={colors.STRONGGRAY} />
        </View>
        <View style={styles.viewPosition}>
          <FontAwesome name="map-marker" size={15} color={colors.MAINCOLOR} />
          <Text style={styles.textPositions} numberOfLines={1}>
            Son Tra, Da Nang
          </Text>
        </View>
        <View style={styles.star}>
          <FontAwesome name="star" size={13} color={colors.WHITE} />
          <Text style={styles.textStar}>5</Text>
        </View>
      </View>
    </View>
  );
};

export default RelatedPlace;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.6,
    marginHorizontal: widthScreen * 0.02,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    alignSelf: 'center',
  },
  img: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.23,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    height: heightScreen * 0.125,
    width: widthScreen * 0.32,
    padding: 12,
    justifyContent: 'space-between',
  },
  Favorites: {
    width: widthScreen * 0.32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPositions: {
    fontSize: 14,
    marginLeft: widthScreen * 0.01,
  },
  textName: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.YELLOW,
    width: widthScreen * 0.09,
    height: heightScreen * 0.025,
    borderRadius: 15,
    alignItems: 'center',
  },
  viewPosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStar: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: 600,
    marginLeft: widthScreen * 0.005,
  },
});
