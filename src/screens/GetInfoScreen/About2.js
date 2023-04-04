import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const About2 = ({route}) => {
  const {numberPeople} = route.params;
  return (
    <View>
      <Text>{numberPeople}</Text>
    </View>
  );
};

export default About2;

const styles = StyleSheet.create({});
