import {
  Animated,
  Image,
  ImageBackground,
  Keyboard,
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
const Body = ({email, setEmail}) => {
  const navigation = useNavigation();
  const handleSubmit = email => {
    console.log(email);
    navigation.navigate('Submit');
  };
  return (
    <ScrollView style={styles.containerBody}>
      <Image
        source={require('../../assets/images/forgot1.png')}
        resizeMode="cover"
      />
      <FieldTextInput
        stylesContainer={{marginTop: heightScreen * 0.05}}
        placeholder={'Enter your email'}
        onChangeText={email => setEmail(email)}
        onSubmitEditing={() => handleSubmit(email)}
      />
      <FieldButton
        stylesContainer={{marginVertical: heightScreen * 0.03}}
        title={'Submit'}
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
  return (
    <ScrollView style={styles.viewParent}>
      <Header />
      <Body email={email} setEmail={setEmail} />
    </ScrollView>
  );
};

export default ForgotPassword;

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
    textAlign: 'center',
  },
  containerBody: {
    height: heightScreen,
    alignSelf: 'center',
    width: widthScreen * 0.9,
  },
});
