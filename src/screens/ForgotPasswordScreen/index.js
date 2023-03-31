import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {heightScreen, widthScreen} from '../../utility';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';
import {OnForgot} from '../../apis/controller/accounts/OnForgot';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.viewBack}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.textHello}>Forgot Password</Text>
    </View>
  );
};
const Body = ({email, setEmail}) => {
  const navigation = useNavigation();
  const handleSubmit = email => {
    if (!email.match(regexemail)) {
      Alert.alert('Failed', 'Email is not correct', [
        {
          text: 'Try again',
        },
      ]);
    } else {
      OnForgot(email) === 'Email not found'
        ? Alert.alert('Failed', 'Email is not verified', [
            {
              text: 'Try again',
            },
          ])
        : navigation.navigate('Submit', {email: email});
    }
  };
  const regexemail = /\S+@\S+\.\S+/;
  return (
    <ScrollView style={styles.containerBody}>
      <Image
        source={require('../../assets/images/forgot123.png')}
        resizeMode="cover"
      />
      <Text style={styles.textEnter}>Enter your email address</Text>
      <FieldTextInput
        stylesContainer={{marginTop: heightScreen * 0.02}}
        placeholder={'Enter your email'}
        onChangeText={email => setEmail(email)}
        onSubmitEditing={() => handleSubmit(email)}
      />
      <FieldButton
        stylesContainer={{marginVertical: heightScreen * 0.03}}
        title={'Send verification link'}
        onPress={() => handleSubmit(email)}
      />
    </ScrollView>
  );
};
const ForgotPassword = () => {
  const navigation = useNavigation();
  const headerMotion = useRef(new Animated.Value(0)).current;
  // function handle animation
  const animatedKeyBoard = (motion, value, duration) => {
    Animated.timing(motion, {
      toValue: value,
      duration: duration,
      speed: Platform.OS == 'ios' ? 60 : 50,
      useNativeDriver: false,
    }).start();
  };
  // hanlde to avoid view when showing key board
  useEffect(() => {
    const SHOW_KEYBOARD_EVENT =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const HIDE_KEYBOARD_EVENT =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, heightScreen * -0.2, 400);
    });
    const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, 0, 400);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const [email, setEmail] = useState('');
  const linkImg = require('../../assets/images/backgroundForgot.png');
  return (
    <ScrollView style={styles.viewParent}>
      <ImageBackground source={linkImg} resizeMode="cover">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Header />
          <Body email={email} setEmail={setEmail} />
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
  },
  viewBack: {
    height: heightScreen * 0.12,
    width: widthScreen,
  },
  buttonBack: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    bottom: 0,
    left: widthScreen * 0.05,
  },
  textHello: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#000',
    textAlign: 'center',
  },
  textEnter: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  containerBody: {
    height: heightScreen,
    alignSelf: 'center',
    width: widthScreen * 0.9,
  },
});
