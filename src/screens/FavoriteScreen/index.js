import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LottieView from 'lottie-react-native';

const Favorite = () => {
  return (
    <View style={styles.viewParent}>
      <LottieView
        source={require('../../assets/animations/NonAccount.json')}
        style={{
          height: heightScreen * 0.5,
          width: widthScreen,
        }}
        loop={true}
      />
      <Text style={styles.textAlert}>
        If you want to use this function, you have to log in to use it.
      </Text>
      <TouchableOpacity style={styles.viewLogin}>
        <Text style={styles.textSignin}>Back to Sign in</Text>
      </TouchableOpacity>
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
    height: heightScreen * 0.1,
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
});
