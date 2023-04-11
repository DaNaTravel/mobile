import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ItineraryPlace = ({item}) => {
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTime}>
        <View style={styles.circleParent}>
          <View style={styles.circleSon}></View>
        </View>
        <Text style={styles.textTime}>9:00 AM - 12:00 AM</Text>
      </View>

      <View style={styles.viewContent}>
        <View style={styles.viewInformation}>
          <Image
            style={styles.viewImg}
            source={require('../../assets/images/bana.jpg')}
          />
          <View style={styles.viewDetail}>
            <Text style={styles.textTitle}>Mui Nghe</Text>
            <Text style={styles.textDescrip}>
              It is the most beautiful and ideal place to watch the sunrise in
              Da Nang
            </Text>
            <Text style={styles.textPrice}>$5</Text>
            <View style={styles.viewStar}>
              <FontAwesome name="star" size={17} color="#E8AD16" />
              <FontAwesome name="star" size={17} color="#E8AD16" />
              <FontAwesome name="star" size={17} color="#E8AD16" />
              <FontAwesome name="star" size={17} color="#E8AD16" />
              <FontAwesome name="star-half" size={17} color="#E8AD16" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItineraryPlace;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.2,
    width: widthScreen * 0.85,
    marginVertical: heightScreen * 0.008,
    justifyContent: 'space-between',
  },
  viewTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleParent: {
    backgroundColor: colors.MAINCOLOR,
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScreen * 0.03,
  },
  circleSon: {
    backgroundColor: colors.WHITE,
    height: 6,
    width: 6,
    borderRadius: 3,
  },
  textTime: {
    fontSize: 15,
    color: colors.STRONGGRAY,
  },
  viewContent: {
    width: widthScreen * 0.81,
    height: heightScreen * 0.16,
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
  },
  viewInformation: {
    width: widthScreen * 0.74,
    alignSelf: 'flex-end',
    height: heightScreen * 0.14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImg: {
    height: heightScreen * 0.13,
    width: widthScreen * 0.28,
    borderRadius: 12,
  },
  viewDetail: {
    width: widthScreen * 0.44,
    height: heightScreen * 0.13,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textDescrip: {
    fontSize: 10,
    color: colors.BLACK,
  },
  textPrice: {
    fontSize: 16,
    color: colors.GREEN,
  },
  viewStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.25,
  },
});
