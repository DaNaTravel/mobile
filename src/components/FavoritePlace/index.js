import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FavoritePlace = ({item}) => {
  const [like, setLike] = useState(false);
  return (
    <View style={styles.viewContainer}>
      <Image
        source={require('../../assets/images/sontra.png')}
        resizeMethod="scale"
        style={styles.viewImg}
      />
      <View style={styles.viewInfo}>
        <View style={styles.viewName}>
          <Text style={styles.textName}>Mũi Nghê</Text>
          <View style={styles.viewStar}>
            <FontAwesome name="star" size={17} color="#E8AD16" />
            <FontAwesome name="star" size={17} color="#E8AD16" />
            <FontAwesome name="star" size={17} color="#E8AD16" />
            <FontAwesome name="star" size={17} color="#E8AD16" />
            <FontAwesome name="star-half" size={17} color="#E8AD16" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewLike}
          onPress={() => setLike(!like)}>
          <FontAwesome
            name="heart-o"
            size={23}
            color={like ? colors.RED : colors.STRONGGRAY}
          />
        </TouchableOpacity>
      </View>
      <Text>{item}</Text>
    </View>
  );
};

export default FavoritePlace;

const styles = StyleSheet.create({
  viewContainer: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.2,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    marginRight: widthScreen * 0.02,
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
    height: heightScreen * 0.135,
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
    width: widthScreen * 0.28,
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
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.BLACK,
  },
});
