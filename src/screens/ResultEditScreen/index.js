import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DayItem from '../../components/DayItem';
import ItineraryPlace from '../../components/ItineraryPlace';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataHT from '../../assets/data/dataMap';
import CarouselItinerary, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from '../../components/CarouselItinerary';
import Carousel from 'react-native-snap-carousel';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ViewMapResult from '../../components/ViewMapResult';
import {UpdateItiTest} from '../../apis/itineraries';
const Tab = createMaterialTopTabNavigator();
const Day = ({data, index}) => {
  return (
    <View style={styles.viewDetailDaily}>
      <FlatList
        data={data?.route}
        renderItem={({item, index}) => <ItineraryPlace item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item?.description?.name}_${index}`}
        style={styles.detailDay}
      />
    </View>
  );
};
const TabView = ({data}) => {
  const [days, setDays] = useState([1]);
  const handleDays = async () => {
    const dataDay = JSON.parse(await AsyncStorage.getItem('data'));
    setDays(dataDay?.days);
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
                children={() => (
                  <Day data={data?.routes[index]} index={index} />
                )}
                key={index}
              />
            );
          })
        : null}
    </Tab.Navigator>
  );
};
const ResultEditScreen = ({route}) => {
  const {data, Id, type} = route.params;
  console.log('data in Result Edit Screen: ', data);
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [days, setDays] = useState([1]);
  const [dataMap, setDataMap] = useState();
  const [time, setTime] = useState();
  const [coordinates, setCoordinates] = useState(null);
  const [dataReturn, setDataReturn] = useState(null);
  const handleDataToSent = arr1 => {
    let newArray = arr1.map(obj =>
      obj.route.map(item => {
        if (item.description._id !== null) {
          return {_id: item.description._id};
        } else {
          return {
            latitude: item.description.latitude,
            longitude: item.description.longitude,
          };
        }
      }),
    );

    console.log(newArray);
    UpdateItiTest(Id, isUser?.data?.token, newArray, true, setDataReturn);
  };
  const handleDataStillSave = arr1 => {
    let newArray = arr1.map(obj =>
      obj.route.map(item => {
        if (item.description._id !== null) {
          return {_id: item.description._id};
        } else {
          return {
            latitude: item.description.latitude,
            longitude: item.description.longitude,
          };
        }
      }),
    );

    console.log(newArray);
    UpdateItiTest(Id, isUser?.data?.token, newArray, false);
    navigation.navigate('BottomTab');
  };
  const handleTime = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setTime(data?.time);
    setDays(data?.days);
    setCoordinates({latitude: data?.latitude, longitude: data?.longitude});
  };

  useLayoutEffect(() => {
    handleTime();
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, []);
  useEffect(() => {
    var transformedData = {};
    data?.routes?.forEach(function (item, index) {
      var key = `routes${index + 1}`;
      transformedData[key] = [];

      item?.route?.forEach(function (routeItem) {
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
  }, [time?.startDate && time?.endDate]);
  const isUser = useSelector(state => state.auth.login);
  const [selectedItem, setSelectedItem] = useState(1);
  const handleTotal = num => {
    let formattedNum = num
      .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace(',00', '')
      .slice(0, -1);
    return formattedNum;
  };
  const renderItem = ({item}) => (
    <DayItem
      item={item}
      selected={item === selectedItem}
      onSelect={setSelectedItem}
    />
  );
  useEffect(() => {
    if (dataReturn !== null) {
      if (dataReturn?.message === 'Success') {
        Alert.alert('Success', 'Your itinerary has been saved successfully!', [
          {
            text: 'Back to Home',
            onPress: () => navigation.navigate('BottomTab'),
          },
        ]);
      } else {
        Alert.alert(
          'Warning',
          `Your trip requires careful attention due to some encountered issues: 
          ${dataReturn?.message}`,
          [
            {
              text: 'Cancel',
            },
            {
              text: 'Still save',
              onPress: () => handleDataStillSave(data?.routes),
            },
          ],
        );
      }
    }
  }, [dataReturn]);

  return (
    <View style={styles.viewParent}>
      <View style={styles.viewHeader}>
        {type === 'update' ? (
          <TouchableOpacity
            onPress={() =>
              isUser?.data?._id !== undefined
                ? navigation.navigate('BottomTab')
                : navigation.navigate('BottomTabGuess')
            }>
            <Feather name="home" size={24} color={'#222222'} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home', {coordinates})}>
              <FontAwesome name="undo" size={24} color={'#222222'} />
            </TouchableOpacity>
            <Text style={styles.textReset}>Reset</Text>
          </View>
        )}
        <Text style={styles.textTitle}>
          {type === 'update' ? 'Your trip' : 'Your new trip'}
        </Text>
        {type === 'update' ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditItinerary', {dataIti: data, Id: Id})
            }>
            <Feather name="edit" size={24} color={'#222222'} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => handleDataToSent(data?.routes)}
              style={styles.button}>
              <FontAwesome name="save" size={24} color={'#222222'} />
            </TouchableOpacity>
            <Text style={styles.textReset}>Save</Text>
          </View>
        )}
      </View>
      <View style={styles.map}>
        <ViewMapResult
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
          <View>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.priceTour}>
              {data?.cost ? handleTotal(data?.cost) : null} VND
            </Text>
          </View>
        </View>
        <TabView data={data} />
      </RBSheet>
    </View>
  );
};

export default ResultEditScreen;

const styles = StyleSheet.create({
  viewSpace: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    backgroundColor: colors.WHITE,
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
  viewParent: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  viewHeader: {
    height: heightScreen * 0.1,
    width: widthScreen,
    backgroundColor: '#F1F0F0',
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
    backgroundColor: colors.RED,
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
  viewLists: {
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
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
  button: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.18,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textReset: {
    textAlign: 'center',
  },
});
