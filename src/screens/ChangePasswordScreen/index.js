import {
  Button,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const handlePasswordChange = value => {
    setPassword(value);
  };
  const handleNewPasswordChange = value => {
    setNewPass(value);
  };
  const handleConfirmPasswordChange = value => {
    setConfirmPass(value);
  };
  const getPasswordComplexity = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;

    let complexityScore = 0;

    if (uppercaseRegex.test(newPass)) {
      complexityScore += 33.3;
    }

    if (lowercaseRegex.test(newPass)) {
      complexityScore += 33.3;
    }

    if (digitRegex.test(newPass)) {
      complexityScore += 33.3;
    }

    return complexityScore;
  };

  const getPasswordColor = () => {
    const complexity = getPasswordComplexity();
    const red = Math.round((100 - complexity) * 2.55);
    const green = Math.round(complexity * 2.55);
    const color = `rgb(${red}, ${green}, 0)`;
    return color;
  };

  const getConfirmPasswordComplexity = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;

    let complexityScore = 0;

    if (uppercaseRegex.test(confirmPass)) {
      complexityScore += 33.3;
    }

    if (lowercaseRegex.test(confirmPass)) {
      complexityScore += 33.3;
    }

    if (digitRegex.test(confirmPass)) {
      complexityScore += 33.3;
    }

    return complexityScore;
  };

  const getConfirmPasswordColor = () => {
    const complexity = getConfirmPasswordComplexity();
    const red = Math.round((100 - complexity) * 2.55);
    const green = Math.round(complexity * 2.55);
    const color = `rgb(${red}, ${green}, 0)`;
    return color;
  };

  const handleChangePassword = () => {};
  const headerMotion = useRef(new Animated.Value(0)).current;
  const animatedKeyBoard = (motion, value, duration) => {
    Animated.timing(motion, {
      toValue: value,
      duration: duration,
      speed: Platform.OS == 'ios' ? 60 : 50,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    const SHOW_KEYBOARD_EVENT =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const HIDE_KEYBOARD_EVENT =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);
    });
    const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, 0, 400);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const isUser = useSelector(state => state.auth.login);
  return (
    <Animated.View style={styles.viewParent}>
      {isUser?.data?.token === undefined ? (
        <>
          <LottieView
            source={require('../../assets/animations/NonAccount.json')}
            style={{
              height: heightScreen * 0.5,
              width: widthScreen,
            }}
            autoPlay
            loop
          />
          <Text style={styles.textAlert}>
            You are not logged in. Please log in to use this function.
          </Text>
          <TouchableOpacity
            style={styles.viewLogin}
            onPress={() => navigation.replace('LoginNav')}>
            <Text style={styles.textSignin}>Go to Sign in</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.viewWelcome}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonBack}>
              <FontAwesome name="angle-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Change Password</Text>
            <View style={styles.viewSpace}></View>
          </View>
          <Text style={styles.textSubTitle}>Current Password</Text>
          <FieldTextInput
            placeholder={'Your password'}
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.textSubTitle}>New Password</Text>
          <FieldTextInput
            placeholder={'Your new password'}
            secureTextEntry={true}
            onChangeText={handleNewPasswordChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          {newPass.length > 0 ? (
            <View
              style={{
                height: 10,
                width: `${getPasswordComplexity()}%`,
                backgroundColor: getPasswordColor(),
                marginTop: 10,
              }}
            />
          ) : (
            <></>
          )}

          <Text style={styles.textSubTitle}>Confirm Password</Text>
          <FieldTextInput
            placeholder={'Your new password'}
            secureTextEntry={true}
            onChangeText={handleConfirmPasswordChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          {confirmPass.length > 0 ? (
            <View
              style={{
                height: 10,
                width: `${getConfirmPasswordComplexity()}%`,
                backgroundColor: getConfirmPasswordColor(),
                marginTop: 10,
              }}
            />
          ) : (
            <></>
          )}

          <FieldButton
            stylesContainer={styles.buttonConfirm}
            title={'Confirm Password'}
            onPress={() => handleChangePassword()}
            stylesTitle={{fontSize: 18}}
          />
        </>
      )}
    </Animated.View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    paddingHorizontal: widthScreen * 0.05,
    paddingTop: heightScreen * 0.025,
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewSpace: {
    height: 50,
    width: 50,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.BLACK,
  },
  textSubTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: colors.BLACK,
    marginVertical: heightScreen * 0.02,
  },
  buttonConfirm: {
    marginTop: heightScreen * 0.02,
  },
});
