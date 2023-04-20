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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const HistoryItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewContainer1}>
        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => (
            <Image
              style={styles.viewImg}
              source={require('../../assets/images/muinghe.png')}
              resizeMode="cover"
              item={item}
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
            <Text style={styles.textDate}>4 Days</Text>
            <Text style={styles.textDetailDate}>10/04 - 14/04</Text>
          </View>
        </View>
        <View style={styles.viewPeople}>
          <Ionicons name="person" size={30} color={colors.MAINCOLOR} />
          <View style={styles.viewDetailDate}>
            <Text style={styles.textDate}>8 peoples</Text>
            <Text style={styles.textDetailDate}>Join</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewContainer3}>
        <View style={styles.viewPrice}>
          <Text style={styles.textDetailDate}>Total</Text>
          <Text style={styles.textPrice}>$90.00</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonDetails}
          onPress={() => navigation.navigate('DetailsHistory', {item: item})}>
          <Text style={styles.textDetail}>Details</Text>
        </TouchableOpacity>
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
    marginVertical: heightScreen * 0.017,
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
    elevation: 1,
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
});
