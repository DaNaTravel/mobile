import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmLogout from '../../components/Modal/ConfirmLogout';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const isUser = useSelector(state => state.auth.login);
  const handleSignout = async () => {
    setModalVisible(!isModalVisible);
  };
  const getData = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    console.log('data ', data);
  };
  const getToken = async () => {
    let data = await isUser?.data?.token;
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
      <ConfirmLogout
        handleSignout={handleSignout}
        isModalVisible={isModalVisible}
        navigation={navigation}
      />
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
