import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GettingStarted from '../../screens/GettingStartedScreen';
import LoginNav from '../LoginNav';
import {useSelector} from 'react-redux';
import BottomTab from '../BottomTab';
import About1 from '../../screens/GetInfoScreen/About1';
import About2 from '../../screens/GetInfoScreen/About2';
import About3 from '../../screens/GetInfoScreen/About3';
import HomeScreen from '../../screens/HomeScreen';
import PlaceDetail from '../../screens/PlaceDetailScreen';
import DetailItineraryPlace from '../../screens/DetailItineraryPlaceScreen';
import BookingScreen from '../../screens/BookingScreen';
import HistoryDetaislScreen from '../../screens/HistoryDetailsScreen';
import BookingDetail from '../../screens/BookingDetailScreen';
import SearchAllScreen from '../../screens/SearchAllScreen';
import ChoosePosition from '../../screens/ChoosePositionScreen';
import LocationDetail from '../../screens/LocationDetailScreen';
import ListItinerariesScreen from '../../screens/ListItinerariesScreen';
import EditItinerary from '../../screens/EditItineraryScreen';

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
        <></>
      )}
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoginNav"
          component={LoginNav}
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
          name="PlaceDetail"
          component={PlaceDetail}
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
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ChoosePosition"
          component={ChoosePosition}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ListItineraries"
          component={ListItinerariesScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LocationDetail"
          component={LocationDetail}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="EditItinerary"
          component={EditItinerary}
        />
      </>
    </Stack.Navigator>
  );
};

export default AboutNav;

const styles = StyleSheet.create({});
