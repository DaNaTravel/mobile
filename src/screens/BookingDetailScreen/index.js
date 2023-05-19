import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselBookingItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../../components/CarouselBookingItem';
import SuccessfulBooking from '../../components/Modal/SuccessfulBooking';
import SuccessfullyRemoved from '../../components/Modal/SuccessfullyRemoved';
import RelatedPlace from '../../components/RelatedPlace';
import CommentItem from '../../components/CommentItem';
import {useSelector} from 'react-redux';
import {AddLocationFavorite, DeleteFavo} from '../../apis/favorite';
import NonAccount from '../../components/Modal/NonAccount';
const dataImage = [
  {
    photo_reference:
      'AUjq9jm5GMRM66RoKDjUp6hO4fX84kl86iyu2P9P2HhLQ2CHQfK2XNk_IS2sHN6E_VotZgd439OIXHWmzN08WGKgZD55L17lUjyCFutBvlJ19l1wmlfobFVQ35jhM5u5P-ZJN8hbYvimomRnpuFYQHtMGYOBn0lwdhXktAkaLftSZdpWSQwX',
  },
  {
    photo_reference:
      'AUjq9jnF40G035MrKWx1i6A_y3qse6YXy7kOVAg-P24En4o4Rrc5DWmXsZl3hr8wH_iqCEgt9hHYtPLx5sAC6NKXwtQ2GasutAeqHjwLG-GEi7_hxXdGPFZ_AWcX7-g22ULoYyu3xcTuxoQQfJfKdCMlXDC8dFK85Jkd_zziqLYmStbXOgQ4',
  },
  {
    photo_reference:
      'AUjq9jnvV7LpRC3hvRx_n8X1tUxG3aA627kgSaU44dRzCECjhz7ONQ6U1B-gcRa3kBuOtkAdt8SdZ2x3eggX0NLpPmlgF1s0w-rempoQuqVA0Kb1e_MuzxmE2ApnsPgmh6c_IPhSWdNL6LbY3wQ6WuwRea8H_l2FA5Zd5Sk9rcKI6RsXs903',
  },
  {
    photo_reference:
      'AUjq9jllcPqqOTafuqYh3hkypbBD7F6SlGFJwOAg3NOZEQLhNyrYogJ4KNaFkPhemGnqV94EiM6lhu9lB3sPnEqnqNSKQfmgv3hCBm2y-b6pcHntTtQAvQioWSuJx1pcdArvR1as5FjCqHP4MU5Yi9O7vawEYQ37NGPDqRZ3HYmVtHeD2DCR',
  },
  {
    photo_reference:
      'AUjq9jmPatLo6leE2kXBkW9wjsQnp2EU2dvRmiu6GESpW-nxFgtOEkIZzBNTYWGN4qt3HkkzosXUw4mfPd4Z9lFzdU_AuyAgcCvD8pID6xene_NfsFNNa64xfuc_Hrm1wmuFlpm9Hn4df-QibLT_-UZrNny_r_dV0cKtssmZZ1UnqtRFmZov',
  },
];
const Header = ({
  navigation,
  item,
  booked,
  handleBook,
  setAlert,
  handleRemove,
  removed,
}) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [like, setLike] = useState(false);
  const [result, setResult] = useState();
  const isUser = useSelector(state => state.auth.login);
  const checkFavo = () => {
    isUser?.data?._id === undefined ? setAlert(true) : handleFavo();
  };
  const handleFavo = () => {
    like
      ? DeleteFavo(isUser?.data?._id, item?._id)
      : AddLocationFavorite(isUser?.data?._id, item?._id, setResult);
    console.log(result);
    OnFavo();
  };
  const OnFavo = () => {
    like ? handleRemove() : handleBook();
    setLike(!like);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonBack}>
        <FontAwesome name="angle-left" size={30} color={colors.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => checkFavo()}
        style={[
          styles.buttonFavo,
          like ? {borderColor: colors.RED} : {borderColor: colors.WHITE},
        ]}>
        <FontAwesome
          name="heart"
          size={25}
          color={!like ? colors.WHITE : colors.RED}
        />
      </TouchableOpacity>
      <View style={styles.viewMainContent}>
        <Carousel
          layout="stack"
          layoutCardOffset={9}
          ref={isCarousel}
          data={item?.photos !== null ? item?.photos : dataImage}
          renderItem={CarouselBookingItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={1}
          useScrollView={true}
          onSnapToItem={index => setIndex(index)}
          loop={true}
          activeAnimationType="spring"
          key={item => item._id}
        />
        {<PaginationCarousel data={item?.photos} index={index} />}
        <View style={styles.viewName}>
          <View style={styles.viewNamePrice}>
            <Text style={styles.name} numberOfLines={1}>
              {item?.name ? item?.name : 'BaNa Hills'}
            </Text>
            <Text style={styles.price}>${item?.cost ? item?.cost : '20'}</Text>
          </View>
          <View style={styles.viewPosStar}>
            <View style={styles.viewPos}>
              <FontAwesome
                name="map-marker"
                size={22}
                color={colors.MAINCOLOR}
              />
              <Text style={styles.position} numberOfLines={1}>
                {item?.formatted_address
                  ? item?.formatted_address
                  : 'Son Tra, Da Nang'}
              </Text>
            </View>
            <View style={styles.viewStar}>
              <FontAwesome name="star" size={16} color={colors.WHITE} />
              <Text style={styles.star}>
                {item?.rating ? item?.rating : '4.6'}
              </Text>
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
        top: heightScreen * 0.19,
        alignSelf: 'center',
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.WHITE,
      }}
      inactiveDotStyle={
        {
          // Define styles for inactive dots here
        }
      }
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      key={item => item?.photo_reference}
    />
  );
};
const BookingDetail = ({route}) => {
  const navigation = useNavigation();
  const [see, setSee] = useState(false);
  const [booked, setBooked] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleBook = () => {
    setBooked(!booked);
  };
  const handleRemove = () => {
    setRemoved(!removed);
  };
  const {item} = route.params;
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   Related(item?.types[0], item?._id, setData);
  // }, [item]);
  useEffect(() => {
    setData(item?.relatedLocations);
  }, [item]);
  return (
    <ScrollView style={styles.viewParent} showsVerticalScrollIndicator={false}>
      <Header
        navigation={navigation}
        item={item}
        handleBook={handleBook}
        handleRemove={handleRemove}
        booked={booked}
        removed={removed}
        setAlert={setAlert}
      />
      <Text style={styles.textDetails}>Details</Text>
      <View style={styles.scroll}>
        <Text style={styles.textDes} numberOfLines={see ? null : 6}>
          {item?.overview
            ? item?.overview
            : 'Mui Nghe is one of three mountains associated with the history of the formation of the Son Tra peninsula. The reason it is called Mui Nghe or Hon Nghe comes from the shape of the mountain like a sea lion lying with its head facing the rocky mountain, facing the sea. Mui Nghe Da Nang is famous as a beautiful sunrise spot and most ideal tourists should not miss when visiting Da Nang. It also has a very beautiful natural scenery, so it always attracts a large number of visitors to check-in every day'}
        </Text>
        <TouchableOpacity style={styles.seeMore} onPress={() => setSee(!see)}>
          <Text>{!see ? 'See more' : 'See less'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textRelate}>Some reviews</Text>
      <FlatList
        data={item?.reviews}
        renderItem={({item, index}) => (
          <CommentItem item={item} index={index} key={item._id} />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
      />
      <Text style={styles.textRelate}>Related Place</Text>
      <View style={styles.viewRelated}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <RelatedPlace item={item} index={index} key={item._id} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={item => item?._id}
          horizontal
        />
      </View>
      {booked ? (
        <SuccessfulBooking booked={booked} setBooked={setBooked} />
      ) : null}
      {removed ? (
        <SuccessfullyRemoved removed={removed} setRemoved={setRemoved} />
      ) : null}
      {alert ? <NonAccount setAlert={setAlert} /> : null}
    </ScrollView>
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
    marginTop: widthScreen * 0.5,
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
    width: widthScreen * 0.17,
    justifyContent: 'center',
  },
  position: {
    color: colors.MAINCOLOR,
    fontSize: 16,
    marginLeft: widthScreen * 0.02,
    width: widthScreen * 0.5,
  },
  star: {
    color: colors.WHITE,
    fontSize: 16,
    marginLeft: widthScreen * 0.01,
  },
  textDetails: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.1,
    marginBottom: heightScreen * 0.012,
    marginTop: heightScreen * -0.035,
  },
  textDes: {
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'justify',
    marginHorizontal: widthScreen * 0.1,
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
    width: widthScreen,
  },
  seeMore: {
    marginLeft: widthScreen * 0.1,
  },
  textRelate: {
    fontSize: 20,
    color: colors.BLACK,
    marginVertical: heightScreen * 0.01,
    fontWeight: 600,
    marginLeft: widthScreen * 0.1,
  },
  viewRelated: {
    height: heightScreen * 0.14,
    paddingLeft: widthScreen * 0.1,
  },
  buttonFavo: {
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
    right: widthScreen * 0.05,
  },
});
