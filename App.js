import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import GettingStarted from './src/screens/GettingStartedScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import SubmitEmail from './src/screens/SubmitEmailScreen';

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
          name="Submit"
          component={SubmitEmail}
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
