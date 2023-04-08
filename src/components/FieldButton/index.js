import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
const FieldButton = ({
  onPress,
  title,
  stylesContainer,
  stylesTitle,
  stylesIcon,
  icon,
  size,
  color,
  icon2,
  size2,
  color2,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, stylesContainer]}>
      {icon ? (
        <FontAwesome
          style={[styles.icon, stylesIcon]}
          name={icon}
          size={size}
          color={color}></FontAwesome>
      ) : (
        <></>
      )}
      <Text style={[styles.title, stylesTitle]}>{title}</Text>
      {icon2 ? (
        <FontAwesome
          style={[styles.icon, stylesIcon]}
          name={icon2}
          size={size2}
          color={color2}></FontAwesome>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
export default FieldButton;

const styles = StyleSheet.create({
  container: {
    width: widthScreen * 0.885,
    height: heightScreen * 0.07,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.MAINCOLOR,
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
  icon: {
    marginHorizontal: widthScreen * 0.045,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    color: colors.WHITE,
  },
});
