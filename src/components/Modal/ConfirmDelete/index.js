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
    console.log('dataId', dataId);
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
          style={{height: heightScreen * 0.2, width: widthScreen * 0.7}}
        />
        <Text style={styles.textSure}>
          Are you sure you want to delete this destination from your trip?
        </Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            onPress={() => handleCancel()}
            style={styles.viewCon1}>
            <Text style={styles.textCon1}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete()}
            style={styles.viewCon}>
            <Text style={styles.textCon}>Delete</Text>
          </TouchableOpacity>
        </View>
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
    width: widthScreen * 0.7,
  },
  viewButtons: {
    width: widthScreen * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
