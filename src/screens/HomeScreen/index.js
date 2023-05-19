import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
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
import {ItineraryRoutes} from '../../apis/itineraries';
import DayItem from '../../components/DayItem';

const Tab = createMaterialTopTabNavigator();
const Day = ({data, index}) => {
  return (
    <View style={styles.viewDetailDaily}>
      <FlatList
        data={data?.route}
        renderItem={({item, index}) => <ItineraryPlace item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.description?.name}
        style={styles.detailDay}
      />
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
                children={() => <Day data={data[index]} index={index} />}
                key={index}
              />
            );
          })
        : null}
    </Tab.Navigator>
  );
};
const HomeScreen = () => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState();
  const [data, setData] = useState([]);
  const [dataMap, setDataMap] = useState();
  const [days, setDays] = useState([1]);
  const [mainGoal, setMainGoal] = useState(0);
  const handleTime = async () => {
    const dataTime = JSON.parse(await AsyncStorage.getItem('data'));
    setTime(dataTime?.time);
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setDays(data?.days);
    const goal = JSON.parse(await AsyncStorage.getItem('data'));
    setMainGoal(goal?.mainGoal);
  };

  useLayoutEffect(() => {
    handleTime();
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, []);

  useEffect(() => {
    if (time?.startDate && time?.endDate) {
      ItineraryRoutes(time.startDate, time.endDate, mainGoal, responseData => {
        setData(responseData);
        var transformedData = {};
        responseData.forEach(function (item, index) {
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
      });
    }
  }, [time?.startDate, time?.endDate]);
  const isUser = useSelector(state => state.auth.login);
  const [selectedItem, setSelectedItem] = useState(1);
  const renderItem = ({item}) => (
    <DayItem
      item={item}
      selected={item === selectedItem}
      onSelect={setSelectedItem}
    />
  );
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
        <Text style={styles.textTitle}>Your trip</Text>
        <View style={styles.space}></View>
      </View>
      <View style={styles.map}>
        <MapViewComponent
          dataHT={dataHT}
          index={index}
          dataMap={dataMap}
          selectedItem={selectedItem}
        />
      </View>
      <View style={styles.viewRow}>
        <TouchableOpacity
          style={styles.buttonBottom}
          onPress={() => refRBSheet.current.open()}>
          <AntDesign name="profile" size={28} color={colors.WHITE} />
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
        data={dataHT}
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
          <Text style={styles.priceTour}>$500</Text>
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
  space: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.05,
    backgroundColor: colors.WHITE,
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
    height: 60,
    width: 60,
    borderRadius: 30,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  priceTour: {
    fontSize: 22,
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
});
