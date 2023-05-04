import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const RecommendedItinerary = ({item}) => {
  const navigation = useNavigation();
  const dataImg = [
    require('../../assets/images/muinghe.png'),
    require('../../assets/images/bana.jpg'),
    require('../../assets/images/mariamaria.jpeg'),
    require('../../assets/images/booking.jpg'),
  ];
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewContainer1}>
        <FlatList
          data={dataImg}
          renderItem={({item, index}) => (
            <Image style={styles.viewImg} source={item} resizeMode="cover" />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={index => index}
          style={styles.viewContainer1}
          horizontal
        />
      </View>
      <View style={styles.viewContainer2}>
        <View style={styles.viewDate}>
          <FontAwesome name="calendar" size={30} color={colors.MAINCOLOR} />
          <Text style={styles.textDate}>6 Days</Text>
        </View>
        <View style={styles.viewPeople}>
          <View style={styles.viewDetailDate}>
            <FontAwesome5
              name="dollar-sign"
              size={25}
              color={colors.MAINCOLOR}
            />
            <Ionicons name="person" size={25} color={colors.MAINCOLOR} />
          </View>
          <Text style={styles.textDate}>
            $100.00<Text style={styles.textPerson}>/person</Text>
          </Text>
        </View>
      </View>
      <View style={styles.viewContainer3}>
        <TouchableOpacity
          style={styles.buttonDetails}
          onPress={() => navigation.navigate('DetailsHistory', {item: item})}>
          <Text style={styles.textDetail}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecommendedItinerary;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.34,
    backgroundColor: colors.WHITE,
    marginBottom: heightScreen * 0.017,
    borderRadius: 25,
    paddingVertical: heightScreen * 0.015,
    paddingHorizontal: widthScreen * 0.035,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    alignSelf: 'center',
  },
  viewContainer1: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
    padding: 3,
    flexDirection: 'row',
  },
  viewContainer2: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImg: {
    height: heightScreen * 0.085,
    width: widthScreen * 0.2,
    borderRadius: 20,
    marginRight: widthScreen * 0.02,
  },
  viewDate: {
    width: widthScreen * 0.4,
    height: heightScreen * 0.085,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailDate: {
    flexDirection: 'row',
  },
  viewPeople: {
    width: widthScreen * 0.4,
    height: heightScreen * 0.085,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDate: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.025,
  },
  textDetailDate: {
    fontSize: 13,
    color: colors.STRONGGRAY,
  },
  viewContainer3: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDetails: {
    height: 0.06 * heightScreen,
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  viewPrice: {
    height: heightScreen * 0.085,
    width: widthScreen * 0.3,
    justifyContent: 'space-around',
  },
  textDetail: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.WHITE,
  },
  textPrice: {
    fontSize: 25,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textPerson: {
    fontSize: 13,
    color: colors.BLACK,
  },
});
