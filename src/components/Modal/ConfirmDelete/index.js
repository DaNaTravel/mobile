import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmDelete = ({
  isModalVisible,
  setModalVisible,
  dataId,
  setListLoca,
}) => {
  const handleDelete = async () => {
    let finalData = JSON.parse(await AsyncStorage.getItem('finalDT'));
    console.log('finalData', finalData);
    const result = finalData?.filter(data => data?.description?._id !== dataId);
    setListLoca(result);
    setModalVisible(!isModalVisible);
  };
  const handleCancel = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/delete.json')}
          autoPlay
          style={{height: heightScreen * 0.25, width: widthScreen * 0.9}}
        />
        <Text style={styles.textSure}>
          Are you sure you want to delete this location from your trip?
        </Text>
        <TouchableOpacity onPress={() => handleDelete()} style={styles.viewCon}>
          <Text style={styles.textCon}>Continue delete?</Text>
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

export default ConfirmDelete;

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
    fontSize: 20,
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
