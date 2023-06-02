import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {GetFavo} from '../../apis/favorite';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Itineraries from '../../components/FavoriteItems/Itineraries';
import Locations from '../../components/FavoriteItems/Locations';
import {useNavigation} from '@react-navigation/native';
import {AxiosContext} from '../../context/AxiosContext';

const Tab = createMaterialTopTabNavigator();

const TabView = ({}) => {
  const [dataIti, setDataIti] = useState(null);
  const [dataLoca, setDataLoca] = useState(null);
  const axiosContext = useContext(AxiosContext);
  const handleData = category => {
    category === 'itinerary'
      ? axiosContext.GetFavo(category, setDataIti)
      : axiosContext.GetFavo(category, setDataLoca);
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.textLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
        tabBarScrollEnabled: true,
      }}>
      <Tab.Screen
        name={'Itineraries'}
        children={() => <Itineraries dataIti={dataIti} />}
        listeners={{
          focus: () => handleData('itinerary'),
        }}
      />
      <Tab.Screen
        name={'Locations'}
        children={() => <Locations dataLoca={dataLoca} />}
        listeners={{
          focus: () => handleData('location'),
        }}
      />
    </Tab.Navigator>
  );
};
const Favorite = () => {
  const isUser = useSelector(state => state.auth.login);
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      {isUser?.message === null ? (
        <TabView />
      ) : (
        <>
          <LottieView
            source={require('../../assets/animations/NonAccount.json')}
            style={{
              height: heightScreen * 0.5,
              width: widthScreen,
            }}
          />
          <Text style={styles.textAlert}>
            If you want to use this function, you have to log in to use it.
          </Text>
          <TouchableOpacity
            style={styles.viewLogin}
            onPress={() => navigation.replace('LoginNav')}>
            <Text style={styles.textSignin}>Go to Sign in</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  viewParent: {
    backgroundColor: colors.WHITE,
    height: heightScreen,
    width: widthScreen,
    alignItems: 'center',
  },
  textAlert: {
    width: widthScreen * 0.85,
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 500,
  },
  viewLogin: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen * 0.07,
  },
  textSignin: {
    color: colors.WHITE,
    fontWeight: 500,
    fontSize: 20,
  },
  textLabel: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  tabBarItem: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.08,
  },
  tabBar: {
    backgroundColor: colors.WHITE,
    width: widthScreen,
    alignSelf: 'center',
    height: heightScreen * 0.08,
  },
  viewList: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.9,
    alignItems: 'center',
    marginTop: heightScreen * 0.03,
  },
  selectedTabBarItem: {
    backgroundColor: colors.MAINCOLOR,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.WHITE,
  },
});
