import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ForgotPassword from '../../screens/ForgotPasswordScreen';
import SubmitEmail from '../../screens/SubmitEmailScreen';
import BottomTab from '../BottomTab';
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
    </Stack.Navigator>
  );
};

export default LoginNav;

const styles = StyleSheet.create({});
