import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';
import {SignIn} from '../../apis/controller/accounts/SignIn';
import axios from 'axios';
import FieldWebView from '../../components/WebView';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.viewBack}>
        <TouchableOpacity
          onPress={() => navigation.navigate('About1')}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewHello}>
        <Text style={styles.textHello}>Welcome, DaNaTravel</Text>
      </View>
    </View>
  );
};
const Body = ({email, setEmail, password, setPassword}) => {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  const handleNavi = () => {
    SignIn(email, password);
    navigation.navigate('BottomTab');
  };
  const handleSignIn = (email, password) => {
    const regexemail = /\S+@\S+\.\S+/;
    !email.match(regexemail)
      ? Alert.alert('Failed', 'Email is not correct', [
          {
            text: 'Try again',
          },
        ])
      : email.trim() === '' || password.trim() === ''
      ? Alert.alert('Failed', 'Please enter in full', [
          {
            text: 'Try again',
          },
        ])
      : SignIn(email, password) !== null
      ? Alert.alert('Failed', 'Email or password is wrong!', [
          {
            text: 'Try again',
          },
        ])
      : navigation.navigate('BottomTab');
  };
  const handleForgot = async () => {
    navigation.navigate('Forgot');
  };
  const handleSignInWithGG = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://192.168.21.63:5000/accounts/google',
    };

    await axios
      .request(config)
      .then(response => {
        setData(response?.data);
        console.log(typeof data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.containerBody}>
      <FieldTextInput
        stylesContainer={styles.inputMail}
        placeholder={'Enter your email'}
        onChangeText={email => setEmail(email)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <FieldTextInput
        placeholder={'Enter your password'}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        onSubmitEditing={Keyboard.dismiss}
      />
      <TouchableOpacity
        style={styles.buttonForgotPW}
        onPress={() => handleForgot()}>
        <Text style={styles.textForgotPW}>Forgot Password?</Text>
      </TouchableOpacity>
      <FieldButton
        stylesContainer={styles.buttonSignin}
        title={'Sign in'}
        onPress={() => handleSignIn(email, password)}
      />
      <Text style={styles.textOtherSign}>Or sign in using</Text>
      <View style={styles.viewOther}>
        <FieldButton
          stylesContainer={styles.viewButtonGG}
          title={'Google'}
          stylesTitle={styles.textGG}
          icon={'google'}
          size={30}
          onPress={() => {
            handleSignInWithGG();
          }}
        />
        <FieldButton
          stylesContainer={styles.viewButtonFB}
          title={'Facebook'}
          stylesTitle={styles.textFB}
          icon={'facebook-f'}
          color="#fff"
          size={30}
          onPress={() => handleSignInWithGG()}
        />
      </View>
      {data ? <FieldWebView HTML={data} /> : <></>}
      <View style={styles.viewSignup}>
        <Text style={styles.textDont}>Don't have an account?</Text>
        <Text
          style={[
            styles.textForgotPW,
            {fontWeight: 'bold', color: colors.MAINCOLOR},
          ]}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </View>
    </ScrollView>
  );
};
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.viewParent}>
      <Header />
      <Body
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  img: {
    tintColor: 'gray',
  },
  viewBack: {
    height: heightScreen * 0.12,
    width: widthScreen,
  },
  buttonBack: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    bottom: 0,
    left: widthScreen * 0.06,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewHello: {
    width: widthScreen * 0.59,
    alignSelf: 'center',
  },
  textHello: {
    fontWeight: 'bold',
    fontSize: 43,
    color: '#000',
    textAlign: 'center',
  },
  containerBody: {
    width: widthScreen * 0.885,
    height: heightScreen,
    alignSelf: 'center',
  },
  buttonForgotPW: {
    alignSelf: 'flex-end',
  },
  textForgotPW: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000',
  },
  textOtherSign: {
    textAlign: 'center',
    color: '#000',
    marginVertical: heightScreen * 0.015,
    fontSize: 12,
  },
  viewSignup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightScreen * 0.15,
  },
  inputMail: {
    marginTop: heightScreen * 0.05,
  },
  buttonSignin: {
    marginVertical: heightScreen * 0.02,
  },
  viewOther: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButtonGG: {
    width: widthScreen * 0.4,
    backgroundColor: colors.WHITE,
  },
  textGG: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewButtonFB: {
    width: widthScreen * 0.4,
    backgroundColor: '#3498DB',
  },
  textFB: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textDont: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000',
    fontStyle: 'italic',
  },
  textSignup: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.MAINCOLOR,
  },
});
