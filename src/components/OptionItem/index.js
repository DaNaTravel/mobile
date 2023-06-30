import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';

const OptionItem = ({item, selectedOption, onSelectOption}) => {
  return (
    <TouchableOpacity
      style={[
        styles.viewTouch,
        {backgroundColor: selectedOption ? colors.MAINCOLOR : colors.WHITE},
      ]}
      onPress={() => onSelectOption(item)}>
      <Text style={[styles.textDay, {color: selectedOption ? colors.WHITE : colors.BLACK}]}>Option {item}</Text>
    </TouchableOpacity>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  viewTouch: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDay:{
    fontWeight: 500
  }
});
