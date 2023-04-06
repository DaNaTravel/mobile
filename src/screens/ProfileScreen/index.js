import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const handleSignout = () => {
    //delete cache
    AsyncStorage.clear();
    //redirect Sign In
    navigation.navigate('SignIn');
  };
  return (
    <View>
      <Text>Profile</Text>
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
