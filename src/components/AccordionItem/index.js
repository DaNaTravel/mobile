import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightScreen, widthScreen} from '../../utility';

const AccordionItem = ({item}) => {
  return (
    <View style={styles.viewParent}>
      <Text>AccordionItem - {item}</Text>
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.85,
    borderWidth: 1,
    marginHorizontal: heightScreen * 0.005,
  },
});
