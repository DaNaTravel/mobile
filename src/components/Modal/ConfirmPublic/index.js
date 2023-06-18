import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AxiosContext} from '../../../context/AxiosContext';

const ConfirmPublic = ({
  isModalVisible1,
  setModalVisible1,
  dataId,
  setIsEnabled,
  isEnabled,
}) => {
  const axiosContext = useContext(AxiosContext);

  const handlePublic = () => {
    axiosContext.ChangeStatusForIti(dataId, !isEnabled);
    setIsEnabled(previousState => !previousState);
    setModalVisible1(!isModalVisible1);
  };

  const handleCancel = () => {
    setModalVisible1(!isModalVisible1);
  };

  return (
    <Modal isVisible={isModalVisible1}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/logout.json')}
          autoPlay
          style={{height: heightScreen * 0.23, width: widthScreen * 0.9}}
        />
        <Text style={styles.textSure}>
          Do you want to pubic your planned trip?
        </Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            onPress={() => handleCancel()}
            style={styles.viewCon1}>
            <Text style={styles.textCon1}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePublic()}
            style={styles.viewCon}>
            <Text style={styles.textCon}>Yes, sure.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPublic;

const styles = StyleSheet.create({
  viewAlert: {
    height: heightScreen * 0.38,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    alignItems: 'center',
  },
  viewCon: {
    height: heightScreen * 0.075,
    width: widthScreen * 0.25,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textCon: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.WHITE,
  },
  textSure: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.BLACK,
    marginTop: heightScreen * -0.03,
    marginBottom: heightScreen * 0.01,
    textAlign: 'center',
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
  viewButtons: {
    width: widthScreen * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  viewCon1: {
    height: heightScreen * 0.075,
    width: widthScreen * 0.25,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textCon1: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.BLACK,
  },
});
