import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {colors, heightScreen, widthScreen} from '../../../utility';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../../redux/action/auth/authRequests';
import {DeleteFavo, DeleteItineraryFavo} from '../../../apis/favorite';
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
  const handleDelete = async () => {
    type === 'delete'
      ? await axiosContext.DeleteFavo(dataId, setResult)
      : await axiosContext.DeleteItineraryFavo(dataId, setResult);
    result === undefined ? updateListItiFavo(dataId) : null;
    if (result === undefined) {
      const updatedData = data?.filter(item => item?.itineraryId !== dataId);
      setData(updatedData);
    }
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
        <Text style={styles.textSure}>Are you sure?</Text>
        <TouchableOpacity
          onPress={
            type === 'delete' || type === 'deleteIti'
              ? handleDelete
              : handleConLogout
          }
          style={styles.viewCon}>
          {type === 'delete' || type === 'deleteIti' ? (
            <Text style={styles.textCon}>Continue delete?</Text>
          ) : (
            <Text style={styles.textCon}>Sign out</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClose} onPress={handleSignout}>
          <FontAwesome name="close" size={30} color={colors.WHITE} />
        </TouchableOpacity>
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
