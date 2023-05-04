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
import data from '../../assets/data/dataCarouselHome/index';
import dataFavorite from '../../assets/data/dataFavo/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CarouselItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from '../../components/CarouselItem';
import FavoritePlace from '../../components/FavoritePlace';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendedItinerary from '../../components/RecommendedItinerary';
const Header = ({name}) => {
  return (
    <View style={styles.viewWelcome}>
      <View style={styles.viewHello}>
        <Text style={styles.textHello}>Hi {name}!</Text>
        <Text style={styles.textHello1}>
          LET'S START <Text style={styles.textHello2}>YOUR JOURNEY</Text>
        </Text>
      </View>
      <Image
        style={styles.viewAvt}
        source={require('../../assets/images/bana.jpg')}></Image>
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
            <MaterialCommunityIcons
              name="google-maps"
              size={28}
              color="#2EAD80"
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Itinerary</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo2}
            onPress={() => navigation.navigate('Booking')}>
            <MaterialCommunityIcons
              name="home-search"
              size={28}
              color="#B9AA20"
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Booking</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo3}
            onPress={() => navigation.navigate('Weather')}>
            <FontAwesome5 name="cloud-sun" size={24} color="#3E8AC3" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Weather</Text>
        </View>
        <View style={styles.viewFuncSon}>
          <TouchableOpacity
            style={styles.viewLogo4}
            onPress={() => navigation.navigate('SearchAll')}>
            <MaterialIcons
              name="location-searching"
              size={28}
              color="#D042B9"
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Searching</Text>
        </View>
      </View>
    </>
  );
};
const ViewRecommend = () => {
  return (
    <>
      <Text style={styles.textFavo}>Recommended itinerary</Text>
      <View style={styles.viewRecommendList}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={({item, index}) => <RecommendedItinerary item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={index => index}
          style={styles.viewHistories}
        />
      </View>
    </>
  );
};
const ViewFavorites = ({dataFavo}) => {
  return (
    <>
      <Text style={styles.textFavo}>Favorite places</Text>
      <View style={styles.viewFavo}>
        <FlatList
          data={dataFavo}
          renderItem={({item, index}) => <FavoritePlace item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={item => item?.img}
          horizontal
        />
      </View>
    </>
  );
};
const Itinerary = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const loadName = async () => {
    let nameUser = await AsyncStorage.getItem('token');
    nameUser !== null ? setName('Gracie') : setName('Guess');
    console.log('name', name);
  };
  useLayoutEffect(() => {
    loadName();
  }, []);
  const [dataFavo, setDataFavo] = useState(dataFavorite);
  return (
    <ScrollView
      style={styles.viewParent}
      contentContainerStyle={styles.contentContainerStyle}>
      <Header name={name} />
      <ViewCarousel />
      <ViewFunction navigation={navigation} />
      <ViewFavorites dataFavo={dataFavo} />
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
    fontSize: 24,
    color: colors.BLACK,
    marginBottom: heightScreen * 0.02,
    marginLeft: widthScreen * 0.05,
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
    fontSize: 12,
    color: colors.BLACK,
    textAlign: 'center',
  },
  textFavo: {
    fontSize: 24,
    color: colors.BLACK,
    marginBottom: heightScreen * 0.02,
    marginTop: heightScreen * 0.02,
    marginLeft: widthScreen * 0.05,
  },
  viewFavo: {
    height: heightScreen * 0.24,
    marginLeft: widthScreen * 0.05,
  },
  viewRecommendList: {
    marginBottom: heightScreen * 0.12,
    width: widthScreen * 0.92,
    alignSelf: 'center',
  },
});
