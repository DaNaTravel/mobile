import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ItineraryPlace from '../../components/ItineraryPlace';
const Tab = createMaterialTopTabNavigator();
const Day = ({data}) => {
  return (
    <View style={styles.viewDetailDaily}>
      <FlatList
        data={data}
        renderItem={({item, index}) => <ItineraryPlace item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={index => index}
        style={{marginTop: heightScreen * 0.02}}
      />
    </View>
  );
};
const TabView = ({item}) => {
  const days = [];
  for (let i = 1; i <= item?.days; i++) {
    days.push(i);
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.textLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
        tabBarScrollEnabled: true,
      }}>
      {days.map((day, index) => {
        return (
          <Tab.Screen
            name={`Day ${day}`}
            children={() => <Day data={item[index]} />}
            key={index}
          />
        );
      })}
    </Tab.Navigator>
  );
};
const HistoryDetaislScreen = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewWelcome}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.viewAvt}
          source={require('../../assets/images/bana.jpg')}></Image>
      </View>
      <View style={styles.viewPeoDate}>
        <View style={styles.viewPeo}>
          <Ionicons name="person" size={30} color={colors.BLACK} />
          <Text style={styles.textPeoDate}>2 people</Text>
        </View>
        <View style={styles.viewDate}>
          <FontAwesome name="calendar" size={30} color={colors.BLACK} />
          <Text style={styles.textPeoDate}>6 days</Text>
        </View>
      </View>
      <TabView item={item} />
    </View>
  );
};

export default HistoryDetaislScreen;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen,
    height: heightScreen * 1.2,
    paddingLeft: widthScreen * 0.05,
    paddingTop: heightScreen * 0.025,
    paddingRight: widthScreen * 0.05,
    backgroundColor: colors.WHITE,
  },
  viewWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAvt: {
    height: 47,
    width: 47,
    borderRadius: 23.5,
  },
  textHello: {
    fontSize: 38,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  viewPeoDate: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.7,
    backgroundColor: colors.QUIETGRAY,
    borderRadius: 16,
    marginVertical: heightScreen * 0.035,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  viewPeo: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.35,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDate: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.35,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPeoDate: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
  },
  viewDetailDaily: {
    flex: 1,
    paddingBottom: heightScreen * 0.2,
    backgroundColor: colors.WHITE,
  },
  textLabel: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  tabBarItem: {
    width: 90,
  },
  tabBar: {
    backgroundColor: colors.WHITE,
  },
  textDate: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
    textAlign: 'center',
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
