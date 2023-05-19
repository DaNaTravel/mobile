import LottieView from 'lottie-react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../../utility';

const SuccessfullyRemoved = ({removed, setRemoved}) => {
  return (
    <View style={styles.viewBlur}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/successful.json')}
          autoPlay
          style={styles.viewLottie}
          loop={false}
        />
        <View style={styles.viewMessage}>
          <Text style={styles.message}>
            Successfully removed it from your favorite locations!
          </Text>
          <Text style={styles.messageSon}>
            Have a safe and enjoyable journey!
          </Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setRemoved(false)}>
            <Text style={styles.textHome}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuccessfullyRemoved;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.5,
    width: widthScreen * 0.9,
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
    height: 300,
    width: 300,
    borderRadius: 30,
  },
  message: {
    fontSize: 25,
    color: colors.BLACK,
    fontWeight: 600,
    textAlign: 'center',
  },
  buttonClose: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.8,
    borderRadius: 30,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBlur: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: 'rgba(0,0,0,0.85)',
    position: 'absolute',
  },
  textHome: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.WHITE,
  },
  messageSon: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.BLACK,
  },
  viewMessage: {
    top: heightScreen * -0.1,
    alignItems: 'center',
    width: widthScreen * 0.8,
    height: heightScreen * 0.25,
    justifyContent: 'space-between',
  },
});
