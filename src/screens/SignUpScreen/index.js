import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';

const Header = ({headerMotion}) => {
  const navigation = useNavigation();
  return (
    <Animated.View style={{marginTop: headerMotion}}>
      <View style={styles.viewBack}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.textHello}>Create Account</Text>
      <Text style={styles.textWelcome}>Let's companion with us</Text>
    </Animated.View>
  );
};
const Body = ({
  last,
  first,
  email,
  password,
  cfpassword,
  setLast,
  setFirst,
  setEmail,
  setPassword,
  setCFPassword,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerBody}>
      <FieldTextInput
        stylesContainer={{marginTop: heightScreen * 0.05}}
        placeholder={'Enter your first name'}
        onChangeText={e => setFirst(e)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldTextInput
        placeholder={'Enter your last name'}
        onChangeText={e => setLast(e)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldTextInput
        placeholder={'Enter your email'}
        onChangeText={e => setEmail(e)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldTextInput
        placeholder={'Enter your password'}
        secureTextEntry={true}
        onChangeText={e => setPassword(e)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldTextInput
        placeholder={'Enter your confirm password'}
        secureTextEntry={true}
        onChangeText={e => setCFPassword(e)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldButton
        stylesContainer={{marginVertical: heightScreen * 0.02}}
        title={'Sign up'}
        onPress={() =>
          console.log(
            'Last name + First name + Email + Pass + confirmPass',
            last,
            first,
            email,
            password,
            cfpassword,
          )
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: heightScreen * 0.075,
        }}>
        <Text
          style={[styles.textForgotPW, {color: 'black', fontStyle: 'italic'}]}>
          Already have an account?
        </Text>
        <Text
          style={[styles.textForgotPW, {fontWeight: 'bold', color: '#619EC0'}]}
          onPress={() => navigation.navigate('SignIn')}>
          {' '}
          Sign in
        </Text>
      </View>
    </View>
  );
};
const SignUpScreen = () => {
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
  const [last, setLast] = useState('');
  const [first, setFirst] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword, setCFPassword] = useState('');
  return (
    <ScrollView style={styles.viewParent}>
      <ImageBackground
        source={{
          uri: 'https://f8-zpcloud.zdn.vn/9186063394465801114/55069b0063e2bebce7f3.jpg',
        }}
        resizeMode="cover"
        style={styles.img}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Header headerMotion={headerMotion} />
          <Body
            last={last}
            setLast={setLast}
            first={first}
            setFirst={setFirst}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            cfpassword={cfpassword}
            setCFPassword={setCFPassword}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignUpScreen;

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
  textWelcome: {fontSize: 20, color: '#707B81', textAlign: 'center'},
  containerBody: {
    height: heightScreen,
    alignSelf: 'center',
  },
  containerHeader: {
    height: heightScreen * 0.32,
    width: widthScreen,
    paddingVertical: heightScreen * 0.1,
    paddingHorizontal: widthScreen * 0.075,
  },
  textForgotPW: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
