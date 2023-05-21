import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';

const DayItem = ({item, selected, onSelect}) => {
  return (
    <TouchableOpacity
      style={[
        styles.viewTouch,
        {backgroundColor: selected ? colors.MAINCOLOR : colors.WHITE},
      ]}
      onPress={() => onSelect(item)}>
      <Text style={[styles.textDay, {color: selected ? colors.WHITE : colors.BLACK}]}>Day {item}</Text>
    </TouchableOpacity>
  );
};

export default DayItem;

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
