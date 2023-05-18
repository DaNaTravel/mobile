import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {DeleteFavo} from '../../apis/favorite';
const HistoryItem = ({item, type}) => {
  console.log('data', item);
  const navigation = useNavigation();
  const [dataImg, setDataImg] = useState([]);
  const dataImgs = [
    require('../../assets/images/muinghe.png'),
    require('../../assets/images/bana.jpg'),
    require('../../assets/images/mariamaria.jpeg'),
    require('../../assets/images/booking.jpg'),
  ];
  const CreateListImg = () => {
    item?.itinerary?.people === undefined
      ? setDataImg(
          item?.itinerary?.routes
            ? item?.itinerary?.routes
                .map(route => route?.description?.photos?.[0]?.photo_reference)
                .filter(photo => photo !== null)
            : null,
        )
      : null;
  };
  useEffect(() => {
    CreateListImg();
    console.log(
      'item?.itinerary?.routes?.route',
      item?.itinerary?.routes?.[0].route?.description?.photos?.[0]
        ?.photo_reference,
    );
  }, []);
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewContainer1}>
        <FlatList
          data={dataImg ? dataImg : dataImgs}
          renderItem={({item, index}) => (
            <Image
              style={styles.viewImg}
              source={
                item
                  ? {
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
                    }
                  : null
              }
              resizeMode="cover"
            />
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
          <View style={styles.viewDetailDate}>
            <Text style={styles.textDate}>
              {item?.itinerary?.days !== undefined
                ? item?.itinerary?.days
                : item?.days}{' '}
              Days
            </Text>
            <Text style={styles.textDetailDate}>10/04 - 15/04</Text>
          </View>
        </View>
        <View style={styles.viewPeople}>
          <Ionicons name="person" size={30} color={colors.MAINCOLOR} />
          <View style={styles.viewDetailDate}>
            <Text style={styles.textDate}>
              {item?.itinerary?.people !== undefined
                ? item?.itinerary?.people
                : item?.people}{' '}
              peoples
            </Text>
            <Text style={styles.textDetailDate}>Join</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewContainer3}>
        <View style={styles.viewPrice}>
          <Text style={styles.textDetailDate}>Total</Text>
          <Text style={styles.textPrice}>
            $
            {item?.itinerary?.cost !== undefined
              ? item?.itinerary?.cost
              : item?.cost === '0'
              ? item?.cost
              : '20'}
            .00
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonDetails}
          onPress={() => navigation.navigate('DetailsHistory', {item: item})}>
          <Text style={styles.textDetail}>Details</Text>
        </TouchableOpacity>
        {type === 'favorite' ? (
          <TouchableOpacity
            style={styles.Heart}
            onPress={() => DeleteFavo(item?._id)}>
            <FontAwesome name="heart" size={32} color={colors.RED} />
          </TouchableOpacity>
        ) : type === 'itineraries' ? (
          <TouchableOpacity
            style={styles.Heart}
            onPress={() => DeleteFavo(item?._id)}>
            <FontAwesome name="heart" size={32} color={colors.STRONGGRAY} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.34,
    backgroundColor: colors.WHITE,
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
    marginVertical: heightScreen * 0.015,
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
    width: widthScreen * 0.3,
    height: heightScreen * 0.085,
    justifyContent: 'space-evenly',
    marginLeft: widthScreen * 0.05,
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
  },
  textDetailDate: {
    fontSize: 13,
    color: colors.STRONGGRAY,
  },
  viewContainer3: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonDetails: {
    height: 0.06 * heightScreen,
    width: widthScreen * 0.3,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  viewPrice: {
    height: heightScreen * 0.085,
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
});
