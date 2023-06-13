import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FieldTextInput from '../../components/FieldTextInput';

const Profile = () => {
  const navigation = useNavigation();
  const isUser = useSelector(state => state.auth.login);
  const [name, setName] = useState('Nguyen Thanh Duke');
  const [email, setEmail] = useState('nguyenthanhduong1002@gmail.com');
  const [phone, setPhone] = useState('0336364692');
  const [isEdit, setIsEdit] = useState(false);

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
  return (
    <Animated.View style={[styles.viewParent, {marginTop: headerMotion}]}>
      <View style={styles.viewWelcome}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => setIsEdit(!isEdit)}
          style={styles.buttonBack}>
          <Feather name="edit-3" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require('../../assets/images/get3.jpg')}
          style={styles.viewAvt}
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={13} color={colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.textName}>{name}</Text>
      </View>
      <View>
        <Text style={styles.textField}>Full Name</Text>
        <FieldTextInput
          stylesContainer={{marginBottom: 0}}
          placeholder={'Enter your full name'}
          onChangeText={txt => setName(txt)}
          onSubmitEditing={Keyboard.dismiss}
          editable={isEdit}
          value={name}
          stylesInput={styles.stylesInput}
        />
        <Text style={styles.textField}>Email Address</Text>
        <FieldTextInput
          stylesContainer={{marginBottom: 0}}
          placeholder={'Enter your email address'}
          onChangeText={txt => setEmail(txt)}
          onSubmitEditing={Keyboard.dismiss}
          editable={isEdit}
          value={email}
          stylesInput={styles.stylesInput}
        />
        <Text style={styles.textField}>Phone Number</Text>
        <FieldTextInput
          stylesContainer={{marginBottom: 0}}
          placeholder={'Enter your phone number'}
          onChangeText={txt => setPhone(txt)}
          onSubmitEditing={Keyboard.dismiss}
          editable={isEdit}
          value={phone}
          stylesInput={styles.stylesInput}
        />
      </View>
      {isEdit ? (
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => console.log('Save')}>
          <Text style={styles.textSignout}>Save</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </Animated.View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  signOut: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    paddingHorizontal: widthScreen * 0.05,
    paddingTop: heightScreen * 0.025,
  },
  viewWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  textTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK,
  },
  viewSpace: {
    height: 50,
    width: 50,
  },
  viewAvt: {
    height: 110,
    width: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
  },
  cameraButton: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: 113,
  },
  textName: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 24,
    color: colors.BLACK,
    marginTop: heightScreen * 0.02,
  },
  textField: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.BLACK,
    marginTop: heightScreen * 0.02,
    marginBottom: heightScreen * 0.01,
  },
  textSignout: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 600,
  },
  stylesInput: {
    fontSize: 16,
  },
});
