import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const RelatedPlace = () => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  let item = {
    name: 'Mui Nghe',
    position: 'Son Tra, Da nang',
    price: '$100',
    rating: '4.9',
    imgextras: [
      'https://hotellebouton.com/wp-content/uploads/2021/03/147278053_218982013228155_8246054670463791463_o-1024x683.jpeg',
      'https://homedecorplus.vn/wp-content/uploads/210615-hdp-khach-san-Hotel-Le-Bouton-da-nang-24.jpg',
      'https://kienviet.net/wp-content/uploads/2021/06/kienviet-hotel-le-bouton-khach-san-mang-dam-ban-sac-thien-nhien-6.png',
      'https://kienviet.net/wp-content/uploads/2021/06/kienviet-hotel-le-bouton-khach-san-mang-dam-ban-sac-thien-nhien-17-Copy.jpg',
    ],
  };
  return (
    <TouchableOpacity
      style={styles.viewParent}
      onPress={() =>
        navigation.navigate('BookingDetail', {item: item, type: 'book'})
      }>
      <Image
        style={styles.img}
        source={require('../../assets/images/muinghe.png')}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.Favorites}>
          <Text style={styles.textName}>Mui Nghe</Text>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <FontAwesome
              name="heart"
              size={22}
              color={!like ? colors.STRONGGRAY : colors.RED}
            />
          </TouchableOpacity>
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
    </TouchableOpacity>
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
