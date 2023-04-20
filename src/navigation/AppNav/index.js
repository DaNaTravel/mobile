import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AboutNav from '../AboutNav';
import {useSelector} from 'react-redux';

const AppNavigation = () => {
  const laucher = useSelector(state => state.state.lauch);
  return (
    <NavigationContainer>
      <AboutNav />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
