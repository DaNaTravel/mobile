import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const RelatedPlace = ({item}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.viewParent}
      onPress={() =>
        navigation.navigate('BookingDetail', {item: item, type: 'book'})
      }>
      <Image
        style={styles.img}
        source={{uri: item?.photos?.[0]?.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item?.photos[0]?.photo_reference}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU` : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.Favorites}>
          <Text style={styles.textName} numberOfLines={1}>{item?.name ? item?.name : 'Mui Nghe'}</Text>
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
            {item?.formatted_address ? item?.formatted_address : 'Son Tra, Da Nang'}
          </Text>
        </View>
        <View style={styles.star}>
          <FontAwesome name="star" size={13} color={colors.WHITE} />
          <Text style={styles.textStar}>{item?.rating ? item?.rating : 5}</Text>
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
    width: widthScreen*0.25
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
