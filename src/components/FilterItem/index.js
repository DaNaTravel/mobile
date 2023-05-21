import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import {Filter} from '../../apis/search';

const FilterItem = ({item, setItems, setArrTypes, arrTypes}) => {
  const [active, setActive] = useState(false);
  const handleFilter = item => {
    !active
      ? setArrTypes([...arrTypes, item?.type])
      : setArrTypes(arrTypes.filter(e => e !== item?.type));
    setActive(!active);
  };
  return (
    <TouchableOpacity
      style={[
        styles.viewType,
        active
          ? {backgroundColor: colors.MAINCOLOR}
          : {backgroundColor: colors.WHITE},
      ]}
      onPress={() => handleFilter(item)}
      key={item?.name}>
      <Text style={[styles.textitem, active
          ? {color: colors.WHITE}
          : {color: colors.BLACK}]}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  textType: {
    fontWeight: 600,
    color: colors.BLACK,
  },
  viewType: {
    width: widthScreen * 0.2,
    height: heightScreen * 0.05,
    borderRadius: 20,
    marginHorizontal: widthScreen * 0.006,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    padding:3
  },
  textitem:{
    fontWeight: 500,
    textAlign: 'center'
  }
});
