import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, heightScreen, widthScreen} from '../../utility/index';
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
  editable,
  value,
}) => {
  let [state, setState] = useState(secureTextEntry);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, stylesContainer]}>
      <TextInput
        style={[styles.input, stylesInput]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={state}
        onFocus={() => {
          onFocus();
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        pattern={pattern}
        autoCorrect={false}
        editable={editable}
        value={value}
        onSubmitEditing={onSubmitEditing}></TextInput>
      {error && <Text style={[styles.errortxt, errortxt]}>{error}</Text>}
      {secureTextEntry ? (
        <View style={styles.icon}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => setState(!state)}>
            <Ionicons
              name={state ? 'eye' : 'eye-off'}
              size={20}
              color={colors.MAINCOLOR}></Ionicons>
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
    width: widthScreen * 0.88,
    alignSelf: 'center',
  },
  input: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.88,
    paddingLeft: widthScreen * 0.08,
    paddingRight: widthScreen * 0.12,
    borderRadius: 30,
    fontStyle: 'normal',
    fontSize: 14,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
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
    top: heightScreen * 0.0225,
  },
  errortxt: {
    fontSize: 12,
    color: '#FF0000',
    paddingLeft: widthScreen * 0.03,
    paddingTop: heightScreen * 0.01,
  },
});
