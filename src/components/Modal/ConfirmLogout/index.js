import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../../redux/action/auth/authRequests';
import {AxiosContext} from '../../../context/AxiosContext';

const ConfirmLogout = ({
  handleSignout,
  isModalVisible,
  navigation,
  type,
  dataId,
  setModalVisible,
  data,
  setData,
}) => {
  const dispatch = useDispatch();
  const axiosContext = useContext(AxiosContext);
  const isUser = useSelector(state => state.auth.login);
  const [result, setResult] = useState();

  const handleConLogout = async () => {
    isUser?.data?._id === undefined ? navigation.replace('LoginNav') : null;
    Logout(dispatch);
    await AsyncStorage.clear();
  };

  const updateListItiFavo = async id => {
    let listItiFavo = await AsyncStorage.getItem('itineraryIds');
    let updatedlist = JSON.parse(listItiFavo)?.filter(item => item !== id);
    await AsyncStorage.setItem('itineraryIds', JSON.stringify(updatedlist));
  };

  const updateListLocaFavo = async id => {
    let LocationIds = await AsyncStorage.getItem('LocationIds');
    let updatedlist = JSON.parse(LocationIds)?.filter(item => item !== id);
    await AsyncStorage.setItem('LocationIds', JSON.stringify(updatedlist));
  };

  const handleDelete = async () => {
    try {
      if (type === 'delete') {
        let result = await axiosContext.DeleteFavo(dataId, setResult);
        updateListLocaFavo(dataId);
        const updatedData = data?.filter(item => item?.locationId !== dataId);
        setData(updatedData);
      } else {
        let result = await axiosContext.DeleteItineraryFavo(dataId, setResult);
        if (result === undefined) {
          updateListItiFavo(dataId);
          const updatedData = data?.filter(
            item => item?.itineraryId !== dataId,
          );
          setData(updatedData);
        }
      }

      setModalVisible(!isModalVisible);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.viewAlert}>
        <LottieView
          source={require('../../../assets/animations/logout.json')}
          autoPlay
          style={{height: heightScreen * 0.23, width: widthScreen * 0.9}}
        />
        <Text style={styles.textSure}>
          {type === 'delete' || type === 'deleteIti'
            ? 'Are you sure want to delete it?'
            : 'Are you sure want to Sign out?'}
        </Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity style={styles.viewCon} onPress={handleSignout}>
            <Text style={styles.textCon}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              type === 'delete' || type === 'deleteIti'
                ? handleDelete
                : handleConLogout
            }
            style={styles.viewCon1}>
            {type === 'delete' || type === 'deleteIti' ? (
              <Text style={styles.textCon1}>Delete</Text>
            ) : (
              <Text style={styles.textCon1}>Sign out</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmLogout;

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
  textCon: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textSure: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.BLACK,
    marginTop: heightScreen * -0.03,
    marginBottom: heightScreen * 0.01,
    width: widthScreen * 0.7,
    textAlign: 'center',
  },
  viewButtons: {
    flexDirection: 'row',
    width: widthScreen * 0.7,
    justifyContent: 'space-around',
  },
  viewCon1: {
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
  textCon1: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.WHITE,
  },
});
