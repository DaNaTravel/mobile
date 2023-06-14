import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, heightScreen, widthScreen} from '../../utility';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';
import axios from 'axios';
import FieldWebView from '../../components/WebView';
import {useDispatch} from 'react-redux';
import {Login} from '../../redux/action/auth/authRequests';
const Header = () => {
  return (
    <View>
      {/* <View style={styles.viewBack}></View> */}
      <View style={styles.viewHello}>
        <Image
          source={require('../../assets/images/img-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.textHello}>Welcome, DaNaTravel</Text>
      </View>
    </View>
  );
};
const Body = ({email, setEmail, password, setPassword}) => {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSignIn = () => {
    Login(dispatch, email, password);
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
  const handleSignInWithGuess = () => {
    navigation.navigate('BottomTabGuess');
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
      <Text style={styles.textOtherSign}>Or</Text>
      <View style={styles.viewOther}>
        <TouchableOpacity
          onPress={() => {
            handleSignInWithGG();
          }}
          style={styles.viewButtonGG}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.img}
          />
          <Text style={styles.title}>Google</Text>
        </TouchableOpacity>
        <FieldButton
          stylesContainer={styles.viewButtonFB}
          title={'Login as Guest'}
          stylesTitle={styles.textFB}
          icon={'user'}
          color="#fff"
          size={30}
          onPress={() => handleSignInWithGuess()}
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
  viewBack: {
    height: heightScreen * 0.12,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  viewHello: {
    alignSelf: 'center',
    width: widthScreen * 0.59,
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
    marginTop: heightScreen * 0.12,
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
    height: heightScreen * 0.07,
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textGG: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewButtonFB: {
    width: widthScreen * 0.4,
    backgroundColor: '#3498DB',
    justifyContent: 'space-evenly',
  },
  textFB: {
    color: colors.WHITE,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: widthScreen * -0.04,
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
  title: {
    fontSize: 13,
    fontWeight: 600,
    alignSelf: 'center',
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
  },
  img: {
    height: 35,
    width: 35,
  },
  logo: {
    height: 150,
    width: 180,
    alignSelf: 'center',
  },
});
