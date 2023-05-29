import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
const Loading = () => {
  return (
    <Modal>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/loading.json')}
          autoPlay
          style={{height: heightScreen * 0.25, width: widthScreen * 0.9}}
        />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.38,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    alignItems: 'center',
  },
});
