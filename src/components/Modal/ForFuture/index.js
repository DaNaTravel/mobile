import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
const ForFuture = ({isModalVisible, setModalVisible, type, setType}) => {
  const handleCancel = () => {
    setModalVisible(!isModalVisible);
    setType(null);
  };
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.viewAlert}>
        <LottieView
          source={type === 'alert' ? require('../../../assets/animations/successful.json') : require('../../../assets/animations/logout.json')}
          autoPlay
          style={type === 'alert' ? styles.viewAniSuccessful : styles.viewAniFuture}
          loop={type === 'alert' ? false : true}
        />
        <View style={{position: 'absolute', bottom: heightScreen*0.03}}>
          <Text style={[styles.textAlert, type === 'alert' ? {fontSize: 18} : {fontSize: 16}]}>
            {type === 'alert' ? 'Successful change' :'We will develop this feature in the future'}
          </Text>
          <TouchableOpacity style={styles.viewCan} onPress={() => handleCancel()}>
            <Text style={styles.textCan}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ForFuture;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.38,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    alignItems: 'center',
  },
  textAlert: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.BLACK,
    textAlign: 'center'
  },
  viewCan: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 20,
    marginTop: heightScreen * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textCan: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 500,
  },
  viewAniFuture: {
    height: heightScreen * 0.23, 
    width: widthScreen * 0.9
  },
  viewAniSuccessful: {
    height: heightScreen * 0.3, 
    width: widthScreen * 0.9
  }
});
