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
import GettingScreen from './src/screens/GettingScreen';
import About1 from './src/screens/GetInfoScreen/About1';
import About2 from './src/screens/GetInfoScreen/About2';
import About3 from './src/screens/GetInfoScreen/About3';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignIn"
          component={SignInScreen}
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
          name="BottomTab"
          component={BottomTab}
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
          options={{
            headerShown: false,
          }}
          name="Start"
          component={GettingScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Getting"
          component={GettingStarted}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
