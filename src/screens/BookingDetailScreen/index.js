import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselBookingItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../../components/CarouselBookingItem';
import SuccessfulBooking from '../../components/Modal/SuccessfulBooking';

const Header = ({navigation, item}) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonBack}>
        <FontAwesome name="angle-left" size={30} color={colors.WHITE} />
      </TouchableOpacity>
      <View style={styles.viewMainContent}>
        <Carousel
          layout="stack"
          layoutCardOffset={9}
          ref={isCarousel}
          data={item?.imgextras}
          renderItem={CarouselBookingItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={1}
          useScrollView={true}
          onSnapToItem={index => setIndex(index)}
          loop={true}
          activeAnimationType="spring"
        />
        {<PaginationCarousel data={item?.imgextras} index={index} />}
        <View style={styles.viewName}>
          <View style={styles.viewNamePrice}>
            <Text style={styles.name} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={styles.price}>{item?.price}</Text>
          </View>
          <View style={styles.viewPosStar}>
            <View style={styles.viewPos}>
              <FontAwesome
                name="map-marker"
                size={28}
                color={colors.MAINCOLOR}
              />
              <Text style={styles.position} numberOfLines={1}>
                {item?.position}
              </Text>
            </View>
            <View style={styles.viewStar}>
              <FontAwesome name="star" size={22} color={colors.WHITE} />
              <Text style={styles.star}>{item?.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const PaginationCarousel = ({data, index}) => {
  return (
    <Pagination
      dotsLength={data?.length}
      activeDotIndex={index}
      containerStyle={{
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        top: heightScreen * 0.32,
        alignSelf: 'center',
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.MAINCOLOR,
      }}
      inactiveDotStyle={
        {
          // Define styles for inactive dots here
        }
      }
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};
const BookingDetail = ({route}) => {
  const navigation = useNavigation();
  const [see, setSee] = useState(false);
  const [booked, setBooked] = useState(false);
  const handleBook = () => {
    setBooked(!booked);
  };
  const {item} = route.params;
  return (
    <View style={styles.viewParent}>
      <Header navigation={navigation} item={item} />
      <Text style={styles.textDetails}>Details</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.textDes} numberOfLines={see ? null : 6}>
          {item?.des}
        </Text>
        <TouchableOpacity style={styles.seeMore} onPress={() => setSee(!see)}>
          <Text>{!see ? 'See more' : 'See less'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonBook}
          onPress={() => handleBook()}>
          <Text style={styles.textBook}>Add to itinerary</Text>
        </TouchableOpacity>
      </View>
      {booked ? (
        <SuccessfulBooking booked={booked} setBooked={setBooked} />
      ) : null}
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  viewParent: {
    backgroundColor: colors.MEDIUMGRAY,
    height: heightScreen,
    width: widthScreen,
  },
  viewMainContent: {
    height: heightScreen * 0.45,
    width: widthScreen,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  viewName: {
    position: 'absolute',
    height: heightScreen * 0.15,
    width: widthScreen * 0.8,
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    opacity: 0.9,
    paddingHorizontal: widthScreen * 0.05,
    paddingBottom: heightScreen * 0.01,
    paddingTop: heightScreen * 0.02,
    marginTop: widthScreen * 0.77,
  },
  viewNamePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewPosStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightScreen * 0.027,
  },
  name: {
    fontSize: 25,
    fontWeight: 600,
    color: colors.MAINCOLOR,
    width: widthScreen * 0.4,
  },
  price: {
    fontSize: 25,
    fontWeight: 600,
    color: colors.MAINCOLOR,
  },
  viewPos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStar: {
    flexDirection: 'row',
    backgroundColor: colors.YELLOW,
    borderRadius: 30,
    alignItems: 'center',
    height: heightScreen * 0.04,
    width: widthScreen * 0.15,
    justifyContent: 'center',
  },
  position: {
    color: colors.MAINCOLOR,
    fontSize: 16,
    marginLeft: widthScreen * 0.01,
  },
  star: {
    color: colors.WHITE,
    fontSize: 18,
    marginLeft: widthScreen * 0.01,
  },
  textDetails: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.1,
    marginTop: heightScreen * 0.11,
    marginBottom: heightScreen * 0.012,
  },
  textDes: {
    fontSize: 16,
    color: colors.BLACK,
    marginHorizontal: widthScreen * 0.1,
    textAlign: 'justify',
  },
  buttonBook: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.8,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  textBook: {
    fontSize: 25,
    fontWeight: 500,
    color: colors.WHITE,
  },
  buttonBack: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: colors.WHITE,
    zIndex: 2,
    top: heightScreen * 0.032,
    left: widthScreen * 0.05,
  },
  viewButton: {
    height: heightScreen * 0.09,
    width: widthScreen * 0.82,
    borderRadius: 45,
    borderColor: colors.MAINCOLOR,
    borderWidth: 1,
    marginTop: heightScreen * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scroll: {
    maxHeight: heightScreen * 0.2,
    width: widthScreen,
  },
  seeMore: {
    marginLeft: widthScreen * 0.1,
  },
});
