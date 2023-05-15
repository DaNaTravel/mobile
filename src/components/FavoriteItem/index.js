import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FavoriteItem = ({item}) => {
  console.log(item?._id);
  return (
    <View style={styles.viewParent}>
      <Image
        source={{
          uri: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/9-1.jpg',
        }}
        style={styles.img}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.01)', 'rgba(10,10,10,0.6)']}
        style={styles.viewBlur}>
          <View style={styles.content}>
            <Text style={styles.textName} numberOfLines={1}>Bana Hill</Text>
            <View style={styles.viewPos}>
            <FontAwesome name="map-marker" size={32} color={colors.WHITE} />
            <Text style={styles.textPos} numberOfLines={1}>21 Nguyen Phuoc Lan</Text>
            </View>
            <View style={styles.viewRatingPrice}>
              <Text style={styles.textPrice}>$5</Text>
            <View style={styles.viewRating}>
            <FontAwesome name="star" size={20} color={colors.WHITE} />
            <Text style={styles.textPrice}>4.2</Text>
            </View>
            </View>
            
          </View>
          <View style={styles.viewLike}><TouchableOpacity style={{marginTop: heightScreen*0.02}}>
          <FontAwesome name="heart" size={32} color={colors.RED} />
          </TouchableOpacity></View>
          
          </LinearGradient>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.18,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 20,
  },
  img: {
    height: heightScreen * 0.18,
    width: widthScreen * 0.9,
    borderRadius: 20,
  },
  viewBlur: {
    paddingVertical: heightScreen * 0.02,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: widthScreen * 0.9,
    paddingHorizontal: widthScreen * 0.025,
    borderRadius: 20,
    height: heightScreen*0.15,
    flexDirection: 'row'
  },
  textName:{
    fontWeight: 600,
    color: colors.WHITE,
    fontSize: 22
  },
  content:{
    width: widthScreen*0.425,
    height: heightScreen*0.11
  },
  viewLike:{
    width: widthScreen*0.425,
    height: heightScreen*0.11,
    alignItems: 'flex-end'
  },
  viewPos:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPos:{
    fontSize: 16,
    fontWeight: 500,
    color: colors.WHITE,
    marginLeft: widthScreen*0.01
  },
  textPrice:{
    fontSize: 18,
    fontWeight: 500,
    color: colors.WHITE,
  },
  viewRating:{
    height: heightScreen*0.03,
    width: widthScreen*0.15,
    backgroundColor: colors.YELLOW,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewRatingPrice:{
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
