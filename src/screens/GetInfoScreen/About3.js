import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const About3 = ({route}) => {
  const {data} = route.params;
  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default About3;

const styles = StyleSheet.create({});
