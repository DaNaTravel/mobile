import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListItinerariesScreen from '../../screens/ListItinerariesScreen';
const Stack = createNativeStackNavigator();

const AboutCommonNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ListItineraries"
        component={ListItinerariesScreen}
      />
    </Stack.Navigator>
  );
};

export default AboutCommonNavigation;

const styles = StyleSheet.create({});
