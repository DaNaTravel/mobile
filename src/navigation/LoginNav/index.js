import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ForgotPassword from '../../screens/ForgotPasswordScreen';
import SubmitEmail from '../../screens/SubmitEmailScreen';
import BottomTab from '../BottomTab';
import AboutNav from '../AboutNav';
const Stack = createNativeStackNavigator();
const LoginNav = () => {
  return (
    <Stack.Navigator>
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
        name="BottomTabUser"
        component={BottomTab}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AboutNav"
        component={AboutNav}
      />
    </Stack.Navigator>
  );
};

export default LoginNav;

const styles = StyleSheet.create({});
