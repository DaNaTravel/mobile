import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HotelItems from '../../components/HotelItems';
import HotelNewItems from '../../components/HotelNewItems';
import {useNavigation} from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Booking</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <TouchableOpacity style={styles.viewSearch}>
        <FontAwesome name="search" size={24} color={colors.STRONGGRAY} />
        <Text style={styles.textSearch}>Looking for hotel</Text>
      </TouchableOpacity>
      <View style={styles.viewPop}>
        <Text style={styles.textPop}>Popular Hotels</Text>
        <TouchableOpacity>
          <Text style={styles.textSee}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewHotelItem}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={({item, index}) => <HotelItems item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index}
          horizontal
        />
      </View>
      <View style={styles.viewNew}>
        <Text style={styles.textPop}>New Hotels</Text>
        <TouchableOpacity>
          <Text style={styles.textSee}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewHotelNewItem}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({item, index}) => <HotelNewItems item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index}
        />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  viewParent: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewSearch: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignSelf: 'center',
    marginVertical: heightScreen * 0.02,
    alignItems: 'center',
    paddingHorizontal: widthScreen * 0.07,
    flexDirection: 'row',
  },
  textSearch: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.STRONGGRAY,
    marginLeft: widthScreen * 0.05,
  },
  viewPop: {
    width: widthScreen * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: heightScreen * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textPop: {
    fontSize: 24,
    color: colors.BLACK,
    fontWeight: 700,
  },
  textSee: {
    fontSize: 16,
    color: colors.MAINCOLOR,
    fontStyle: 'italic',
  },
  viewHotelItem: {
    width: widthScreen * 0.9,
    alignSelf: 'center',
    height: heightScreen * 0.32,
  },
  viewNew: {
    width: widthScreen * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: heightScreen * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewHotelNewItem: {
    width: widthScreen * 0.9,
    alignSelf: 'center',
    height: heightScreen * 0.35,
    paddingBottom: heightScreen*0.05
  },
  viewTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen*0.9,
    alignSelf: 'center',
    marginTop: heightScreen*0.035,
    alignItems: 'center'
  },
  textTitle:{
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK
  },
  viewSpace:{
    height: heightScreen*0.05,
    width: widthScreen*0.1,
    backgroundColor: colors.WHITE
  }
});
