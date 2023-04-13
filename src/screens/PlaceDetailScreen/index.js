import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../../components/CarouselCardItem';
import data from '../../assets/data/dataCarousel/index';
import {useNavigation} from '@react-navigation/native';

const PlaceDetail = ({route}) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/map.jpg')}
      resizeMode="cover">
      <View style={styles.viewMain}>
        <View style={styles.viewContent}>
          <View style={styles.viewImg}>
            <Carousel
              layout="tinder"
              layoutCardOffset={9}
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={1}
              useScrollView={true}
              onSnapToItem={index => setIndex(index)}
              loop={true}
              activeAnimationType="spring"
            />
          </View>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
            containerStyle={{height: heightScreen * 0.08}}
          />
          <View style={styles.viewDescription}>
            <View style={styles.viewAddress}>
              <Text style={styles.textTitle}>Mui Nghe</Text>
              <Text style={styles.textSubTitle}>Son Tra, Da Nang</Text>
            </View>
            <View style={styles.viewTime}>
              <View style={styles.viewSubTime}>
                <Text style={styles.textTitleDate}>Date</Text>
                <View style={styles.viewDate}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={17}
                    color={colors.BLACK}
                  />
                  <Text style={styles.textDate}>10/02/2001</Text>
                </View>
              </View>
              <View style={styles.viewSubTime}>
                <Text style={styles.textTitleDate}>Time start</Text>
                <View style={styles.viewDate2}>
                  <FontAwesome5 name="clock" size={17} color={colors.GREEN} />
                  <Text style={styles.textDate2}>9:00 AM</Text>
                </View>
              </View>
            </View>
            <View style={styles.viewMainDescription}>
              <Text style={styles.textTitleDate}>Description</Text>
              <Text style={styles.textDescrip}>
                Mui Nghe is one of three mountains associated with the history
                of the formation of the Son Tra peninsula...
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.viewAction}>
          <TouchableOpacity
            style={styles.viewActionX}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="close" size={33} color={colors.STRONGGRAY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewActionGO}
            onPress={() => navigation.navigate('BottomTab')}>
            <Text style={styles.textGO}>GO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewActionV}>
            <FontAwesome name="check" size={33} color={colors.STRONGGRAY} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({
  container: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  viewMain: {
    height: heightScreen * 0.75,
    width: widthScreen * 0.85,
    alignSelf: 'center',
    top: heightScreen * 0.12,
  },
  viewContent: {
    height: heightScreen * 0.66,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  viewImg: {
    height: heightScreen * 0.25,
    alignItems: 'center',
    borderRadius: 20,
  },
  viewDescription: {
    height: heightScreen * 0.25,
    width: widthScreen * 0.7,
    alignSelf: 'center',
    marginTop: heightScreen * -0.02,
  },
  viewAddress: {
    height: heightScreen * 0.085,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
  },
  textTitle: {
    fontWeight: 'bold',
    color: colors.BLACK,
    fontSize: 28,
  },
  textSubTitle: {
    color: colors.STRONGGRAY,
    fontSize: 16,
  },
  viewTime: {
    height: heightScreen * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightScreen * 0.005,
  },
  viewSubTime: {
    width: widthScreen * 0.23,
    justifyContent: 'space-between',
  },
  textTitleDate: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.BLACK,
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: heightScreen * 0.035,
    alignItems: 'center',
  },
  viewDate2: {
    flexDirection: 'row',
    backgroundColor: colors.LIGHTGREEN,
    borderRadius: 15,
    justifyContent: 'center',
    height: heightScreen * 0.035,
    alignItems: 'center',
  },
  textDate: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
    color: colors.BLACK,
  },
  textDescrip: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 2,
    color: colors.BLACK,
    textAlign: 'justify',
    marginTop: heightScreen * 0.007,
    lineHeight: heightScreen * 0.025,
  },
  textDate2: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
    color: colors.GREEN,
  },
  viewMainDescription: {
    marginTop: heightScreen * 0.007,
  },
  viewAction: {
    height: heightScreen * 0.15,
    marginTop: heightScreen * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewActionX: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActionGO: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    backgroundColor: colors.MAINCOLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActionV: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textX: {
    fontSize: 25,
    color: colors.STRONGGRAY,
  },
  textGO: {
    fontSize: 30,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  containerCustom: {
    borderRadius: 15,
  },
  viewPagination: {
    bottom: heightScreen * 0.59,
    alignSelf: 'center',
  },
});
