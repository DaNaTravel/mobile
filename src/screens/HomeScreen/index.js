import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ItineraryPlace from '../../components/ItineraryPlace';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MapViewComponent from '../../components/MapViewComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataHT from '../../assets/data/dataMap';
import CarouselItinerary, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from '../../components/CarouselItinerary';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {ItineraryRoutes, ItineraryRoutesTest} from '../../apis/itineraries';
import DayItem from '../../components/DayItem';
import {AxiosContext} from '../../context/AxiosContext';
import LottieView from 'lottie-react-native';
import OptionItem from '../../components/OptionItem';

const Tab = createMaterialTopTabNavigator();
const Day = ({data, index}) => {
  return (
    <View style={styles.viewDetailDaily}>
      {data?.route === undefined ? (
        <View style={{height: heightScreen * 0.58,
          width: widthScreen,
          justifyContent: 'center',
          alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/animations/loading1.json')}
          autoPlay
          loop
          style={{
            height: widthScreen * 0.3,
            width: widthScreen *0.3,
          }}
        />
        </View>
      ) : (
        <FlatList
          data={data?.route}
          renderItem={({item, index}) => <ItineraryPlace item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item?.description?.name}_${index}`}
          style={styles.detailDay}
        />
      )}
    </View>
  );
};

const TabView = ({data}) => {
  const [days, setDays] = useState([1]);
  const handleDays = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setDays(data?.days);
  };
  useLayoutEffect(() => {
    handleDays();
    console.log('data', data);
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.textLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
        tabBarScrollEnabled: true,
      }}>
      {days.length !== 0
        ? days?.map((day, index) => {
            return (
              <Tab.Screen
                name={`Day ${day}`}
                children={() => <Day data={data?.[index]} index={index} />}
                key={index}
              />
            );
          })
        : null}
    </Tab.Navigator>
  );
};

const HomeScreen = ({route}) => {
  const {coordinates} = route.params;
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState();
  const [dataTotal, setDataTotal] = useState([])
  const [data, setData] = useState([]);
  const [dataMap, setDataMap] = useState();
  const [days, setDays] = useState([1]);
  const [mainGoal, setMainGoal] = useState(0);
  const [cost, setCost] = useState([]);
  const [number, setNumber] = useState();
  const [point, setPoint] = useState(null);
  const [total, setTotal] = useState();
  const [dataHotels, setDataHotels] = useState([])
  const [listHotels, setListHotels] = useState(dataHT);
  const [Id, setId] = useState();
  const axiosContext = useContext(AxiosContext);

  const handleTotal = num => {
    let formattedNum = num?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})?.replace(',00', '')?.slice(0, -1);
    return formattedNum;
  };

  const handleTime = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setTime(data?.time);
    setDays(data?.days);
    setMainGoal(data?.mainGoal);
    setCost(data?.expense);
    setNumber(data?.number);
    setPoint(data?.point);
  };

  useLayoutEffect(() => {
    handleTime();
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, []);

  useEffect(() => {
    if (
      time?.startDate &&
      time?.endDate &&
      cost.length !== 0 &&
      point !== null
    ) {
      isUser?.data?._id === undefined
        ? ItineraryRoutes(
            coordinates.latitude,
            coordinates.longitude,
            time.startDate,
            time.endDate,
            mainGoal,
            cost,
            number,
            point,
            setTotal,
            setDataHotels,
            setDataTotal,
            responseData => {
              setData(responseData);
            },
          )
        : ItineraryRoutesTest(
            coordinates.latitude,
            coordinates.longitude,
            time.startDate,
            time.endDate,
            mainGoal,
            cost,
            number,
            point,
            isUser?.data?.token,
            setTotal,
            setId,
            setDataHotels,
            setDataTotal,
            responseData => {
              setData(responseData);
            },
          );
    }
  }, [time?.startDate, time?.endDate, cost, point]);

  const isUser = useSelector(state => state.auth.login);
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedItemOption, setSelectedItemOption] = useState(1);

  const renderItem = ({item}) => (
    <DayItem
      item={item}
      selected={item === selectedItem}
      onSelect={setSelectedItem}
    />
  );

  const renderItemOption = ({item}) => (
    <OptionItem 
      item={item}
      selectedOption={item === selectedItemOption}
      onSelectOption={setSelectedItemOption}
    />
  );

  useEffect(() => {
    console.log('dataHotels', dataHotels); 
    if(dataHotels?.length > 0){
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      Promise.all(dataHotels?.slice(0, 3)?.map(hotelId =>
        fetch(`https://api.content.tripadvisor.com/api/v1/location/${hotelId}/details?key=8FB16E9A710F47FD95919C9A00CBB69F&language=en&currency=USD`, options)
          .then(response => response.json())
      ))
        .then(responses => {
          const arrHotels = responses.map((response, i) => ({
            id: i + 1,
            price: '250.000 VND',
            rating: response?.rating,
            title: response?.name,
            address: response?.address_obj?.street1,
            lat: Number.parseFloat(response?.latitude),
            lon: Number.parseFloat(response?.longitude),
            imgUrl: 'https://images.trvl-media.com/lodging/12000000/12000000/11998700/11998656/d5787bee_z.jpg',
            hotelId: dataHotels[i]
          }));
          console.log('mang Hotels:', arrHotels);
          setListHotels(arrHotels);
        })
        .catch(err => console.error(err));
    } 
  }, [dataHotels]);
  
  useEffect(() => {
    const apiUrl = 'https://api.content.tripadvisor.com/api/v1/location/';
    const apiKey = '8FB16E9A710F47FD95919C9A00CBB69F';
    const language = 'en';

    const fetchImageUrl = async (hotel) => {
      const url = `${apiUrl}${hotel.hotelId}/photos?key=${apiKey}&language=${language}`;
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      return await fetch(url, options)
        .then(response => response.json())
        .then(json => {
          console.log('url: ',json?.data?.[0]?.images?.original?.url);
          const photoUrl = json?.data?.[0]?.images?.original?.url;
          if (photoUrl) {
            hotel.imgUrl = photoUrl;
          }
          return hotel;
        })
        .catch(err => {
          console.error('Error:', err);
          return hotel;
        });
    }
    const fetchImageUrls = async () => {
      const updatedHotels = await Promise.all(listHotels.map(hotel => fetchImageUrl(hotel)));
      console.log('updatedHotels', updatedHotels);
    };

    fetchImageUrls();
  }, [listHotels]);

  useEffect(() => {
    setData(dataTotal?.[selectedItemOption - 1]?.routes);
    setDataHotels(dataTotal?.[selectedItemOption - 1]?.recommendedHotels);
    setTotal(dataTotal?.[selectedItemOption - 1]?.cost);
  }, [selectedItemOption]);

  useEffect(()=>{
    var transformedData = {};
    dataTotal?.[selectedItemOption - 1]?.routes.forEach(function (item, index) {
      var key = `routes${index + 1}`;
      transformedData[key] = [];

      item.route.forEach(function (routeItem) {
        var place = {
          latitude: routeItem.description.latitude,
          longitude: routeItem.description.longitude,
          name: routeItem.description.name,
          address: routeItem.description.address,
        };
        transformedData[key].push(place);
      });
    });
    setDataMap(transformedData);
  },[dataTotal, selectedItemOption]);

  return (
    <View style={styles.viewParent}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() =>
            isUser?.data?._id !== undefined
              ? navigation.navigate('BottomTab')
              : navigation.navigate('BottomTabGuess')
          }>
          <Feather name="home" size={24} color={'#222222'} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Your itinerary</Text>
        {isUser?.data?._id !== undefined ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditItinerary', {dataIti: data, Id: Id})
            }>
            <Feather name="edit" size={24} color={'#222222'} />
          </TouchableOpacity>
        ) : (
          <Feather name="edit" size={24} color={colors.WHITE} />
        )}
      </View>
      <View style={styles.map}>
        <MapViewComponent
          dataHT={listHotels}
          index={index}
          dataMap={dataMap}
          selectedItem={selectedItem}
          coordinates={coordinates}
        />
      </View>
      <View style={styles.viewRow}>
        <View style={styles.viewLists}>
          <FlatList
            data={[1,2,3]}
            renderItem={renderItemOption}
            keyExtractor={item => item.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            style={styles.listDays}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonBottom}
          onPress={() => refRBSheet.current.open()}>
          <AntDesign name="profile" size={24} color={colors.WHITE} />
        </TouchableOpacity>
        <View style={styles.viewLists}>
          <FlatList
            data={days}
            renderItem={renderItem}
            keyExtractor={item => item.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            style={styles.listDays}
          />
        </View>
      </View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={listHotels}
        renderItem={CarouselItinerary}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={1}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
        loop={true}
        activeAnimationType="spring"
        slideStyle={{borderRadius: 20}}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        openDuration={400}
        height={heightScreen * 0.7}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
          },
        }}>
        <View style={styles.viewTour}>
          <Text style={styles.textTour}>Tour details</Text>
          <View>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.priceTour}>
              {total ? handleTotal(total) : null} VND
            </Text>
          </View>
        </View>
        <TabView data={data} />
      </RBSheet>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  viewParent: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  viewHeader: {
    height: heightScreen * 0.08,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.BLACK,
  },
  map: {
    height: heightScreen * 0.5,
    width: widthScreen,
  },
  header: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.85,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.05,
  },
  contentWeather: {
    width: widthScreen * 0.85,
    height: heightScreen * 0.3,
    alignSelf: 'center',
  },
  content: {
    width: widthScreen * 0.85,
    height: heightScreen * 0.17,
    alignSelf: 'center',
  },
  buttonBottom: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonSee: {
    alignSelf: 'flex-end',
  },
  textSee: {
    fontStyle: 'italic',
    color: colors.MAINCOLOR,
    fontWeight: 500,
  },
  viewTour: {
    width: widthScreen * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textTour: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  priceTour: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GREEN,
  },
  textLabel: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  tabBarItem: {
    width: 90,
  },
  tabBar: {
    backgroundColor: colors.WHITE,
    width: widthScreen,
    alignSelf: 'center',
  },
  textDate: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
    textAlign: 'center',
  },
  viewDetailDaily: {
    paddingBottom: heightScreen * 0.02,
    backgroundColor: colors.WHITE,
    width: widthScreen,
    paddingLeft: widthScreen * 0.05,
  },
  detailDay: {
    marginTop: heightScreen * 0.02,
    width: widthScreen * 0.85,
  },
  viewLists: {
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightScreen * 0.08,
    width: widthScreen,
    justifyContent: 'space-evenly',
  },
  listDays: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 13,
  },
  textTotal: {
    fontSize: 13,
    color: colors.STRONGGRAY,
  },
});
