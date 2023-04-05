import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const WelcomeAbout = ({title, styleButtonBack}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewHeader}>
      <View style={styles.viewBack}>
        <TouchableOpacity
          onPress={() => navigation.navigate('About1')}
          style={[styles.buttonBack, styleButtonBack]}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.textHello}>{title}</Text>
      <Text style={styles.textWelcome}>This help us create your plan.</Text>
    </View>
  );
};

export default WelcomeAbout;

const styles = StyleSheet.create({
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
    fontWeight: '500',
    fontSize: 35,
    color: '#000',
    textAlign: 'center',
    width: widthScreen * 0.9,
    alignSelf: 'center',
  },
  textWelcome: {
    fontSize: 20,
    color: '#707B81',
    textAlign: 'center',
  },
  viewHeader: {
    marginBottom: heightScreen * 0.05,
  },
});
