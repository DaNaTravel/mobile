import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Favorite from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utility';

const Tabs = AnimatedTabBarNavigator();

export default () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: colors.MAINCOLOR,
      inactiveTintColor: '#ECF2FF',
      activeBackgroundColor: '#ECF2FF',
    }}>
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <FontAwesome
            name="home"
            size={size ? size : 24}
            color={focused ? color : '#222222'}
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
            size={size ? size : 24}
            color={focused ? color : '#222222'}
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
            size={size ? size : 24}
            color={focused ? color : '#222222'}
            focused={focused}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
