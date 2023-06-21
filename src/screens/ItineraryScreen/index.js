import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../../assets/data/dataCarouselHome/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CarouselItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from '../../components/CarouselItem';
import FavoritePlace from '../../components/FavoritePlace';
import {useNavigation} from '@react-navigation/native';
import RecommendedItinerary from '../../components/RecommendedItinerary';
import {useSelector} from 'react-redux';
import {
  GetItineraryRecommend,
  GetLocationRecommend,
} from '../../apis/itineraries';
const Header = ({name, isUser}) => {
  return (
    <View style={styles.viewWelcome}>
      <View style={styles.viewHello}>
        <Text style={styles.textHello}>Hi {name}!</Text>
        <Text style={styles.textHello1}>
          LET'S START <Text style={styles.textHello2}>YOUR JOURNEY</Text>
        </Text>
      </View>
      <View style={styles.viewParentAvt}>
        <Image
          style={styles.viewAvt}
          source={
            isUser?.data?.token !== undefined
              ? require('../../assets/images/get3.jpg')
              : require('../../assets/images/img-logo.png')
          }
        />
      </View>
    </View>
  );
};
const ViewCarousel = () => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.viewForCarousel}>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={1}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
        loop={true}
        activeAnimationType="spring"
        slideStyle={{borderRadius: 20}}
      />
    </View>
  );
};
const ViewFunction = ({navigation}) => {
  return (
    <>
      <Text style={styles.textFunc}>Functions</Text>
      <View style={styles.viewFunctions}>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo}
            onPress={() => navigation.navigate('About1')}>
            <Ionicons
              name="create-outline"
              size={32}
              color="#2EAD80"
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Creation</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo2}
            onPress={() => navigation.navigate('ListItineraries')}>
            <FontAwesome5 name="route" size={28} color="#B9AA20" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Trips</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo4}
            onPress={() => navigation.navigate('SearchAll')}>
            <FontAwesome5 name="search-location" size={28} color="#D042B9" />
          </TouchableOpacity>
          <Text style={styles.textTitle} numberOfLines={1}>Destinations</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo3}
            onPress={() => console.log('Event')}>
            <FontAwesome5 name="calendar" size={24} color="#3E8AC3" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Events</Text>
        </View>
      </View>
    </>
  );
};
const ViewRecommend = () => {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    GetItineraryRecommend(setData);
  }, []);

  return (
    <>
      <Text style={styles.textRecom}>Suggested trips</Text>
      <View style={styles.viewRecommendList}>
        <FlatList
          data={data}
          renderItem={({item, index}) => <RecommendedItinerary item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item._id}
          style={styles.viewHistories}
        />
      </View>
    </>
  );
};
const ViewFavorites = () => {
  const [listLoca, setListLoca] = useState([]);

  useLayoutEffect(() => {
    GetLocationRecommend(setListLoca);
  }, []);

  return (
    <>
      <Text style={styles.textFavo}>Popular destinations</Text>
      <View style={styles.viewFavo}>
        <FlatList
          data={listLoca}
          renderItem={({item, index}) => <FavoritePlace item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={item => item?._id}
          horizontal
        />
      </View>
    </>
  );
};
const Itinerary = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const isUser = useSelector(state => state.auth.login);

  const loadName = async () => {
    isUser?.message === null ? setName('Duke') : setName('Guest');
  };

  useLayoutEffect(() => {
    loadName();
  }, []);

  return (
    <ScrollView
      style={styles.viewParent}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <Header name={name} isUser={isUser} />
      <ViewCarousel />
      <ViewFunction navigation={navigation} />
      <ViewFavorites />
      <ViewRecommend />
    </ScrollView>
  );
};

export default Itinerary;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen,
    height: heightScreen * 1.2,
    backgroundColor: colors.WHITE,
    paddingTop: heightScreen * 0.025,
  },
  viewWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.9,
    alignSelf: 'center',
  },
  viewAvt: {
    height: 47,
    width: 47,
    borderRadius: 23.5,
  },
  textHello: {
    fontSize: 38,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  textHello1: {
    fontSize: 12,
    color: colors.BLACK,
  },
  textHello2: {
    fontSize: 12,
    color: colors.MAINCOLOR,
  },
  viewForCarousel: {
    height: heightScreen * 0.3,
    marginVertical: heightScreen * 0.03,
    alignItems: 'center',
    borderRadius: 20,
  },
  textFunc: {
    fontSize: 22,
    color: colors.MAINCOLOR,
    marginBottom: heightScreen * 0.02,
    marginLeft: widthScreen * 0.05,
    fontWeight: 600,
  },
  viewFunctions: {
    height: heightScreen * 0.085,
    width: widthScreen * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewFuncSon: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.16,
  },
  viewLogo: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.16,
    backgroundColor: '#E4F7F0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLogo2: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.16,
    backgroundColor: '#FEFFB8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLogo3: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.16,
    backgroundColor: '#E6F3FC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLogo4: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.16,
    backgroundColor: '#FFEDFC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 11,
    color: colors.BLACK,
    textAlign: 'center',
  },
  textFavo: {
    fontSize: 22,
    color: colors.MAINCOLOR,
    marginBottom: heightScreen * 0.01,
    marginTop: heightScreen * 0.03,
    marginLeft: widthScreen * 0.05,
    fontWeight: 600,
  },
  viewFavo: {
    height: heightScreen * 0.32,
    marginLeft: widthScreen * 0.05,
  },
  viewRecommendList: {
    marginBottom: 100,
    width: widthScreen * 0.92,
    alignSelf: 'center',
  },
  textRecom: {
    fontSize: 22,
    color: colors.MAINCOLOR,
    marginBottom: heightScreen * 0.01,
    marginTop: heightScreen * 0.03,
    marginLeft: widthScreen * 0.05,
    fontWeight: 600,
  },
  viewParentAvt: {
    height: 52,
    width: 52,
    borderRadius: 26,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
