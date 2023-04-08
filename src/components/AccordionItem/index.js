import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AccordionItem = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.viewParent}
      onPress={() => console.log(`See place detail of id ${item}`)}>
      <Image
        source={require('../../assets/images/mariamaria.jpeg')}
        resizeMode="cover"
        style={styles.viewImg}
      />
      <View style={styles.viewContent}>
        <Text style={styles.textMain}>Marina Son Tra - {item}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="place" size={25} color={'#F87265'} />
          <Text>74 Tran Phu - 5.6km</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome name="star" size={17} color="#E8AD16" />
          <FontAwesome name="star" size={17} color="#E8AD16" />
          <FontAwesome name="star" size={17} color="#E8AD16" />
          <FontAwesome name="star" size={17} color="#E8AD16" />
          <FontAwesome name="star-half" size={17} color="#E8AD16" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen * 0.13,
    width: widthScreen * 0.75,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    marginHorizontal: heightScreen * 0.005,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  viewImg: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.2,
    borderRadius: 15,
  },
  viewContent: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.45,
    paddingLeft: widthScreen * 0.008,
    justifyContent: 'space-between',
  },
  viewDel: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.07,
  },
  textMain: {
    fontSize: 16,
    fontWeight: 600,
  },
});
