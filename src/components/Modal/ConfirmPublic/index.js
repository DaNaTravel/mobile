import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AxiosContext} from '../../../context/AxiosContext';

const ConfirmPublic = ({
  isModalVisible,
  setModalVisible,
  dataId,
  setIsEnabled,
  isEnabled,
}) => {
  const axiosContext = useContext(AxiosContext);

  const handlePublic = () => {
    axiosContext.ChangeStatusForIti(dataId, !isEnabled);
    setIsEnabled(previousState => !previousState);
    setModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/logout.json')}
          autoPlay
          style={{height: heightScreen * 0.25, width: widthScreen * 0.9}}
        />

        <Text style={styles.textSure}>
          Can you confirm that you want to make this itinerary public for
          everyone?
        </Text>
        <TouchableOpacity onPress={() => handlePublic()} style={styles.viewCon}>
          <Text style={styles.textCon}>Yes, sure.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => handleCancel()}>
          <FontAwesome name="close" size={30} color={colors.WHITE} />
        </TouchableOpacity>
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
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textCon: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.WHITE,
  },
  textSure: {
    fontSize: 15,
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
});
