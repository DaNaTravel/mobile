import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AboutNav from '../AboutNav';
import {useSelector} from 'react-redux';
import {HomeNav} from '../HomeNav';

const AppNavigation = () => {
  const isUser = useSelector(state => state.auth.login);
  console.log(isUser);
  return (
    <NavigationContainer>
      {(isUser?.message === null) !== '' ? <HomeNav /> : <AboutNav />}
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
