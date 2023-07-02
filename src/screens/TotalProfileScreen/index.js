import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import Feather from 'react-native-vector-icons/Feather';
import ConfirmLogout from '../../components/Modal/ConfirmLogout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import NonAccount from '../../components/Modal/NonAccount';
import { AxiosContext } from '../../context/AxiosContext';

const FunctionTouch = ({
  nameIcon,
  nameTitle,
  isLogout,
  press,
  navigation,
  handleSignout,
  isUser,
  data
}) => {
  const handlePress = () => {
    if (!isLogout) {
      if (isUser?.data?.token !== undefined) {
        navigation.navigate(press,{data});
      }
    } else handleSignout();
  };
  return (
    <>
      <TouchableOpacity style={styles.viewTouch} onPress={() => handlePress()}>
        <View
          style={[
            styles.viewCircle,
            isLogout
              ? {backgroundColor: '#FF3333'}
              : {backgroundColor: colors.MAINCOLOR},
          ]}>
          <Feather
            name={nameIcon}
            size={24}
            color={isLogout ? colors.BLACK : colors.WHITE}
          />
        </View>
        <View style={styles.viewSubTitle}>
          <Text style={styles.textSubTitle}>{nameTitle}</Text>
        </View>
        <Feather name="chevron-right" size={30} color={colors.BLACK} />
      </TouchableOpacity>
    </>
  );
};
const TotalProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const handleSignout = async () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();
  const isUser = useSelector(state => state.auth.login);
  const axiosContext = useContext(AxiosContext);
  
  useFocusEffect(
    React.useCallback(() => {
      axiosContext.GetProfile(setData);    
    }, []))

  useEffect(() => {
    if(data !== null){
      console.log(data);
    }
  }, [data])
  

  return (
    <View style={styles.viewParent}>
      <Text style={styles.textTitle}>My Profile</Text>
      <View style={styles.viewParentAvt}>
        <Image
          source={
            isUser?.data?.token === undefined || data?.avatar === undefined
              ? require('../../assets/images/img-logo.png')
              : {uri: data?.avatar}
          }
          style={styles.viewAvt}
        />
      </View>
      <Text style={styles.textName}>
        {isUser?.data?.token === undefined ? 'Anonymous' : data?.name}
      </Text>
      <Text style={styles.textPhone}>
        {isUser?.data?.token === undefined ? '' : data?.email}
      </Text>
      <FunctionTouch
        nameIcon={'edit-3'}
        nameTitle={'Edit Profile'}
        isLogout={false}
        press={'EditProfile'}
        navigation={navigation}
        isUser={isUser}
        data={data}
      />
      <FunctionTouch
        nameIcon={'lock'}
        nameTitle={'Change Password'}
        press={'ChangePassword'}
        isLogout={false}
        navigation={navigation}
        isUser={isUser}
      />
      <FunctionTouch
        nameIcon={'log-out'}
        nameTitle={'Sign Out'}
        isLogout={true}
        handleSignout={handleSignout}
      />
      <ConfirmLogout
        handleSignout={handleSignout}
        isModalVisible={isModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

export default TotalProfileScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    paddingHorizontal: widthScreen * 0.065,
    paddingTop: heightScreen * 0.025,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK,
  },
  viewAvt: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  viewParentAvt: {
    height: 110,
    width: 110,
    borderRadius: 55,
    borderColor: colors.MAINCOLOR,
    borderWidth: 1,
    marginVertical: heightScreen * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textPhone: {
    marginVertical: heightScreen * 0.01,
    fontSize: 15,
  },
  viewTouch: {
    width: widthScreen * 0.87,
    height: heightScreen * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSubTitle: {
    width: widthScreen * 0.62,
    height: heightScreen * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: widthScreen * 0.05,
  },
  textSubTitle: {
    fontSize: 17,
    color: colors.BLACK,
    fontWeight: 500,
  },
});
