import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const handleSignout = () => {
    //delete cache
    AsyncStorage.clear();
    //redirect Sign In
    navigation.navigate('SignIn');
  };
  const getData = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    console.log('data ', data);
  };
  const getToken = async () => {
    let data = await AsyncStorage.getItem('token');
    console.log('token ', data);
  };
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => getData()}>
        <Text>Get data </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getToken()}>
        <Text>Get token </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOut} onPress={() => handleSignout()}>
        <Text style={{}}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  signOut: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
