import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About1 from '../../screens/GetInfoScreen/About1';
import About2 from '../../screens/GetInfoScreen/About2';
import About3 from '../../screens/GetInfoScreen/About3';
import HomeScreen from '../../screens/HomeScreen';
import GettingStarted from '../../screens/GettingStartedScreen';
import BottomTab from '../BottomTab';
import Weather from '../../screens/WeatherScreen';
import History from '../../screens/HistoryScreen';
import PlaceDetail from '../../screens/PlaceDetailScreen';
import Itinerary from '../../screens/ItineraryScreen';
import WeatherDetail from '../../screens/WeatherDetailScreen';
import DetailItineraryPlace from '../../screens/DetailItineraryPlaceScreen';
import HistoryDetaislScreen from '../../screens/HistoryDetailsScreen';
import LoginNav from '../LoginNav';
import {useSelector} from 'react-redux';
import BookingScreen from '../../screens/BookingScreen';
import BookingDetail from '../../screens/BookingDetailScreen';
import SearchAllScreen from '../../screens/SearchAllScreen';

const Stack = createNativeStackNavigator();
const AboutNav = () => {
  const laucher = useSelector(state => state.state.lauch);
  console.log(laucher);
  return (
    <Stack.Navigator>
      {!laucher ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Getting"
            component={GettingStarted}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="LoginNav"
            component={LoginNav}
          />
        </>
      )}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="About1"
        component={About1}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="About2"
        component={About2}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="About3"
        component={About3}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTabGuess"
        component={BottomTab}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Weather"
        component={Weather}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="History"
        component={History}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PlaceDetail"
        component={PlaceDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Itinerary"
        component={Itinerary}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="WeatherDetail"
        component={WeatherDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailItineraryPlace"
        component={DetailItineraryPlace}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailsHistory"
        component={HistoryDetaislScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Booking"
        component={BookingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BookingDetail"
        component={BookingDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchAll"
        component={SearchAllScreen}
      />
    </Stack.Navigator>
  );
};

export default AboutNav;

const styles = StyleSheet.create({});
