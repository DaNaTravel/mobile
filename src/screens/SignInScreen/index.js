import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FieldTextInput from '../../components/FieldTextInput';
import FieldButton from '../../components/FieldButton';

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
      <Text style={styles.textHello}>Hello!</Text>
      <Text style={styles.textWelcome}>Welcome Back To DaNaTravel</Text>
    </View>
  );
};
const Body = ({email, setEmail, password, setPassword}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerBody}>
      <FieldTextInput
        stylesContainer={{marginTop: heightScreen * 0.05}}
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
      <TouchableOpacity style={styles.buttonForgotPW}>
        <Text style={styles.textForgotPW} pressForgotPW={() => pressForgotPW()}>
          {' '}
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <FieldButton
        stylesContainer={{marginVertical: heightScreen * 0.03}}
        title={'Sign in'}
        onPress={() => console.log('email + pass', email, password)}
      />
      <Text style={styles.textOtherSign}>Or sign in using</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <FieldButton
          stylesContainer={{
            width: widthScreen * 0.4,
            backgroundColor: '#fff',
          }}
          title={'Google'}
          stylesTitle={{color: '#000', fontSize: 15, fontWeight: 'bold'}}
          icon={'google'}
          size={30}
        />
        <FieldButton
          stylesContainer={{
            width: widthScreen * 0.4,
            backgroundColor: '#3498DB',
          }}
          title={'Facebook'}
          stylesTitle={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}
          icon={'facebook-f'}
          color="#fff"
          size={30}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: heightScreen * 0.2,
        }}>
        <Text
          style={[styles.textForgotPW, {color: 'black', fontStyle: 'italic'}]}>
          Don't have an account?
        </Text>
        <Text
          style={[styles.textForgotPW, {fontWeight: 'bold', color: '#619EC0'}]}
          onPress={() => navigation.navigate('SignUp')}>
          {' '}
          Sign up
        </Text>
      </View>
    </View>
  );
};
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.viewParent}>
      <ImageBackground
        source={{
          uri: 'https://f8-zpcloud.zdn.vn/9186063394465801114/55069b0063e2bebce7f3.jpg',
        }}
        resizeMode="cover"
        style={styles.img}
        >
          <Header />
        <Body
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
  },
  img:{
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
  buttonForgotPW: {
    alignSelf: 'flex-end',
  },
  textForgotPW: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  textOtherSign: {
    textAlign: 'center',
    color: '#000',
    marginVertical: heightScreen * 0.015,
    fontSize: 12,
  },
});
