import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {heightScreen, widthScreen} from '../../utility';
const FieldButton = ({
  onPress,
  title,
  stylesContainer,
  stylesTitle,
  stylesIcon,
  icon,
  size,
  color
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, stylesContainer]}>
      {icon ? (
        <FontAwesome style={[styles.icon, stylesIcon]} name={icon} size={size} color={color}></FontAwesome>
      ) : (
        <></>
      )}
      <Text style={[styles.title, stylesTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default FieldButton;

const styles = StyleSheet.create({
  container: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.06,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#A2CAE2',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: widthScreen * 0.06,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'white',
  },
});
