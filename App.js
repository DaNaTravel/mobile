import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {View} from 'react-native/Libraries/Components/View/View';
import GettingStarted from './src/screens/GettingStartedScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
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
          name="Getting"
          component={GettingStarted}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Getting')}
    />
  );
};

export default App;
