import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Favorite from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utility';
import History from '../screens/HistoryScreen';

const Tabs = AnimatedTabBarNavigator();

export default () => (
  <Tabs.Navigator
    tabBarOptions={{
      inactiveTintColor: '#ECF2FF',
      activeBackgroundColor: '#ECF2FF',
    }}
    appearance={{
      whenActiveShow: 'icon-only',
      activeColors: colors.WHITE,
      activeTabBackgrounds: colors.MAINCOLOR,
      horizontalPadding: 20,
      dotCornerRadius: 15,
      dotSize: 'small',
      floating: true,
    }}>
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <FontAwesome
            name="home"
            size={size ? size : 35}
            color={focused ? color : colors.STRONGGRAY}
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Favorite"
      component={Favorite}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <FontAwesome
            name="heart"
            size={size ? size : 35}
            color={focused ? color : colors.STRONGGRAY}
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <FontAwesome
            name="history"
            size={size ? size : 35}
            color={focused ? color : colors.STRONGGRAY}
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <FontAwesome
            name="user"
            size={size ? size : 35}
            color={focused ? color : colors.STRONGGRAY}
            focused={focused}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
