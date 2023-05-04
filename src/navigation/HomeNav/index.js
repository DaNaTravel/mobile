import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingDetail from '../../screens/BookingDetailScreen';
import BookingScreen from '../../screens/BookingScreen';
import DetailItineraryPlace from '../../screens/DetailItineraryPlaceScreen';
import About1 from '../../screens/GetInfoScreen/About1';
import About2 from '../../screens/GetInfoScreen/About2';
import About3 from '../../screens/GetInfoScreen/About3';
import HistoryDetaislScreen from '../../screens/HistoryDetailsScreen';
import HomeScreen from '../../screens/HomeScreen';
import PlaceDetail from '../../screens/PlaceDetailScreen';
import SearchAllScreen from '../../screens/SearchAllScreen';
import WeatherDetail from '../../screens/WeatherDetailScreen';
import Weather from '../../screens/WeatherScreen';
import BottomTab from '../BottomTab';

const Stack = createNativeStackNavigator();

export const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTab"
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
        name="Weather"
        component={Weather}
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
