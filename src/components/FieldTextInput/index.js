import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heightScreen, widthScreen} from '../../utility/index';
const FieldTextInput = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  stylesContainer,
  stylesTitle,
  stylesInput,
  onFocus = () => {},
  error,
  errortxt,
  onSubmitEditing,
  pattern,
  icon,
  styleIcon,
}) => {
  let [state, setState] = useState(secureTextEntry);
  const [isFocus, setisFocus] = useState(false);

  return (
    <View style={[styles.container, stylesContainer]}>
      <TextInput
        style={[styles.input, stylesInput]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={state}
        onFocus={() => {
          onFocus();
          setisFocus(true);
        }}
        onBlur={() => {
          setisFocus(false);
        }}
        pattern={pattern}
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}>
      </TextInput>
      {secureTextEntry ? (
        <View style={styles.icon}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => setState(!state)}>
            <Ionicons name={state ? 'eye' : 'eye-off'} size={20} color={'#A2CAE2'}></Ionicons>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default FieldTextInput;

const styles = StyleSheet.create({
  container: {
    height: heightScreen * 0.095,
    width: widthScreen * 0.9,
  },
  input: {
    height: heightScreen * 0.06,
    paddingLeft: widthScreen * 0.04,
    paddingRight: widthScreen * 0.12,
    borderRadius: 20,
    fontStyle: 'normal',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  icon: {
    height: heightScreen * 0.03,
    width: widthScreen * 0.06,
    position: 'absolute',
    right: widthScreen * 0.04,
    top: heightScreen * 0.018,
  },
});
