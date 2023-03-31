const {useNavigation} = require('@react-navigation/native');
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import axiosInstance from '../../utils/axiosInstance';

const HomeScreen = () => {
  const navigation = useNavigation();
  const baseURL = 'http://192.168.21.63:5000';
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}/accounts`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    axiosInstance
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Opps!', 'login session expired', [
          {
            text: 'Please sign-in again',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      });
  };
  const handleSignout = () => {
    //delete cache
    AsyncStorage.clear();
    //redirect Sign In
    navigation.navigate('SignIn');
  };
  return (
    <View>
      <TouchableOpacity onPress={() => getData()}>
        <Text>Get data </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'gray',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleSignout()}>
        <Text style={{}}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
