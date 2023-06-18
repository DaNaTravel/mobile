import LottieView from 'lottie-react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NonAccount = ({alert, setAlert}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.viewBlur}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/NonAccount.json')}
          autoPlay
          style={styles.viewLottie}
        />
        <Text style={styles.message}>You are not logged in. Please log in to use this function.</Text>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.textBack}>Back to Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => setAlert(false)}>
          <FontAwesome name="close" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NonAccount;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.55,
    width: widthScreen * 0.9,
    position: 'absolute',
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: heightScreen * 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewLottie: {
    borderRadius: 30,
    height: heightScreen*0.4,
    width: widthScreen*0.9,
    marginTop: heightScreen*-0.05
  },
  message: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: heightScreen*-0.1
  },
  buttonClose: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: heightScreen * -0.035,
    right: widthScreen * -0.025,
  },
  viewBlur: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: 'rgba(0,0,0,0.85)',
    position: 'absolute',
  },
  buttonBack:{
    height: heightScreen * 0.07,
    width: widthScreen * 0.8,
    borderRadius: 30,
    backgroundColor: colors.MAINCOLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen*0.04
  },
  textBack:{
    fontWeight: 600,
    fontSize: 20,
    color: colors.WHITE,
  }
});
