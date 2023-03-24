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
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';
import {SignUp} from '../../apis/controller/accounts/SignUp';

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
  name,
  email,
  password,
  cfpassword,
  setName,
  setEmail,
  setPassword,
  setCFPassword,
  validate,
  errors,
  handleError,
  pressRegister,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerBody}>
      <FieldTextInput
        stylesContainer={{marginTop: heightScreen * 0.05}}
        placeholder={'Enter your full name'}
        onFocus={() => handleError(null, 'name')}
        onChangeText={e => setName(e)}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.name}
      />
      <FieldTextInput
        placeholder={'Enter your email'}
        onFocus={() => handleError(null, 'email')}
        onChangeText={e => setEmail(e)}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.email}
      />
      <FieldTextInput
        placeholder={'Enter your password'}
        secureTextEntry={true}
        onFocus={() => handleError(null, 'password')}
        onChangeText={e => setPassword(e)}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.password}
      />
      <FieldTextInput
        placeholder={'Enter your confirm password'}
        secureTextEntry={true}
        onFocus={() => handleError(null, 'cfpassword')}
        onChangeText={e => setCFPassword(e)}
        onSubmitEditing={pressRegister}
        error={errors.cfpassword}
      />
      <FieldButton
        stylesContainer={{marginVertical: heightScreen * 0.02}}
        title={'Sign up'}
        onPress={validate}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: heightScreen * 0.162,
        }}>
        <Text
          style={[styles.textForgotPW, {color: 'black', fontStyle: 'italic'}]}>
          Already have an account?
        </Text>
        <Text
          style={[
            styles.textForgotPW,
            {fontWeight: 'bold', color: colors.MAINCOLOR},
          ]}
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword, setCFPassword] = useState('');
  const [errors, setErrors] = useState({});
  const regexemail = /\S+@\S+\.\S+/;
  const regexname = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
  const regexpass = /([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/;
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const pressRegister = () => {
    if (password == cfpassword) {
      SignUp(email, name, password);
    } else {
      Alert.alert('Failed', 'Password and Confirm Password not match!', [
        {
          text: 'Try again',
          onPress: () => console.log('Account Registration Failed! '),
        },
      ]);
    }
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!email) {
      handleError('Email is a required field.', 'email');
      isValid = false;
    } else if (!email.match(regexemail)) {
      handleError('Email must be a valid email.', 'email');
      isValid = false;
    }

    if (!name) {
      handleError('Name is a required field.', 'name');
      isValid = false;
    } else if (!name.match(regexname)) {
      handleError('Name must be a valid name.', 'name');
      isValid = false;
    }

    if (!password) {
      handleError('Password is a required field.', 'password');
      isValid = false;
    } else if (password.length < 8) {
      handleError('Password must be at least 8 characters.', 'password');
      isValid = false;
    } else if (!password.match(regexpass)) {
      handleError(
        'Password must include at least 1 number and 1 character.',
        'password',
      );
      isValid = false;
    }

    if (!cfpassword) {
      handleError('Re-Password is a required field.', 'cfpassword');
      isValid = false;
    } else if (cfpassword !== password) {
      handleError('Password confirmation must match password.', 'cfpassword');
      isValid = false;
    }

    if (isValid) {
      pressRegister();
    }
  };
  return (
    <ScrollView style={styles.viewParent}>
      <ImageBackground
        source={{
          uri: 'https://f9-zpcloud.zdn.vn/7073135390479215672/557d015045c79899c1d6.jpg',
        }}
        resizeMode="cover"
        style={styles.img}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Header headerMotion={headerMotion} />
          <Body
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            cfpassword={cfpassword}
            setCFPassword={setCFPassword}
            validate={validate}
            errors={errors}
            handleError={handleError}
            pressRegister={pressRegister}
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