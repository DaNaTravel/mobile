import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import GettingStarted from './src/screens/GettingStartedScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import SubmitEmail from './src/screens/SubmitEmailScreen';
import BottomTab from './src/navigation/BottomTab';
import About1 from './src/screens/GetInfoScreen/About1';
import About2 from './src/screens/GetInfoScreen/About2';
import About3 from './src/screens/GetInfoScreen/About3';
import PlaceDetail from './src/screens/PlaceDetailScreen';
import History from './src/screens/HistoryScreen';
import Itinerary from './src/screens/ItineraryScreen';
import Weather from './src/screens/WeatherScreen';
import WeatherDetail from './src/screens/WeatherDetailScreen';
import DetailItineraryPlace from './src/screens/DetailItineraryPlaceScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryDetaislScreen from './src/screens/HistoryDetailsScreen';
import {AppRegistry, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {heightScreen, widthScreen} from './src/utility';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './src/navigation/AppNav';

const Stack = createNativeStackNavigator();

const App = () => {
  return <AppNavigation />;
};

export default App;
