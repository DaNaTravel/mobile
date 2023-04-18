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

const Stack = createNativeStackNavigator();

const App = () => {
  const [lauch, setLauch] = React.useState('');
  const getFlags = async () => {
    let flagFirstUse = await AsyncStorage.getItem('flag');
    console.log(flagFirstUse);
    // setLauch(JSON.stringify(flagFirstUse));
  };
  console.log('lauch', lauch);
  React.useLayoutEffect(() => {
    getFlags();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Getting"
          component={GettingStarted}
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
          name="SignIn"
          component={SignInScreen}
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
          name="BottomTab"
          component={BottomTab}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Forgot"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Submit"
          component={SubmitEmail}
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
          name="History"
          component={History}
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
          name="Weather"
          component={Weather}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
