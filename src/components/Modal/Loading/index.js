import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
const Loading = ({isLoading, setIsLoading}) => {
  return (
    <Modal isVisible={isLoading}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/loading1.json')}
          autoPlay
          style={{height: widthScreen * 0.5, width: widthScreen * 0.5}}
          loop
        />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  viewAlert: {
    height: widthScreen * 0.5,
    width: widthScreen * 0.5,
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
