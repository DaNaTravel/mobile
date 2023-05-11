import LottieView from 'lottie-react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NonAccount = ({alert, setAlert}) => {
  return (
    <View style={styles.viewBlur}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/successful.json')}
          autoPlay
          style={styles.viewLottie}
          loop={false}
        />
        <Text style={styles.message}>Booking successful!</Text>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => setAlert(!alert)}>
          <FontAwesome name="close" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NonAccount;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.4,
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
    flex: 1,
    borderRadius: 30,
  },
  message: {
    fontSize: 25,
    color: colors.BLACK,
    fontWeight: 600,
    marginTop: heightScreen * 0.25,
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
});
