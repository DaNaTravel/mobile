import { Image, ImageBackground, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { heightScreen, widthScreen } from '../../utility';
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
        <Text style={styles.textHello}>Forgot Password!</Text>
        <Text style={styles.textWelcome}>Welcome Back To DaNaTravel</Text>
      </View>
    );
  };
const Body = ({email, setEmail, password, setPassword}) => {
    const navigation = useNavigation();
    const handleSignIn = (email, password) => {
      SignIn(email, password);
      navigation.navigate('Home');
    };
    return (
      <ScrollView style={styles.containerBody}>
        {/* <Image source={require('../../assets/images/forgot1.png')}
        resizeMode="cover"
        style={{flex:0.5}}/> */}
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
        <FieldButton
          stylesContainer={{marginVertical: heightScreen * 0.03}}
          title={'Sign in'}
          onPress={() => handleSignIn(email, password)}
        />
      </ScrollView>
    );
  };
const ForgotPassword = () => {
  return (
    <View style={styles.viewParent}>
        <Header />
        <Body />
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    viewParent: {
        height: heightScreen,
        width: widthScreen,
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
      textWelcome: {
        fontSize: 20, 
        color: '#707B81', 
        textAlign: 'center'
    },
    containerBody: {
        height: heightScreen,
        alignSelf: 'center',
      },
})