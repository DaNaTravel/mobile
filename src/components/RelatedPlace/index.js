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
        <Text style={styles.textPositions}>Son Tra, Da Nang</Text>
        <View style={styles.star}>
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
          <FontAwesome name="star" size={17} color="#CFA332" />
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
    borderWidth: 0.5,
    borderRadius: 12,
    marginHorizontal: widthScreen * 0.02,
    flexDirection: 'row',
  },
  img: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.23,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: colors.GRAY,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  Favorites: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPositions: {
    fontSize: 14,
  },
  textName: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  star: {
    flexDirection: 'row',
    width: widthScreen * 0.25,
    justifyContent: 'space-between',
  },
});
