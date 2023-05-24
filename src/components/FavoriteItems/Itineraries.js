import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Itineraries = ({dataIti}) => {
  const saveDataToStorage = async () => {
    try {
      if (dataIti) {
        const ids = dataIti.map(item => item.itineraryId);
        if (ids.length > 0) {
          await AsyncStorage.setItem('itineraryIds', JSON.stringify(ids));
          console.log('Itinerary IDs saved to AsyncStorage successfully.');
        } else {
          await AsyncStorage.removeItem('itineraryIds');
          console.log('Itinerary IDs removed from AsyncStorage.');
        }
      }
    } catch (error) {
      console.log(
        'Error saving/removing itinerary IDs to/from AsyncStorage:',
        error,
      );
    }
  };
  useEffect(() => {
    saveDataToStorage();
  }, [dataIti]);
  return (
    <View style={styles.viewParent}>
      {dataIti?.length === 0 ? (
        <Text>You don't have any favorite itinerary items</Text>
      ) : (
        <View style={styles.viewList}>
          <FlatList
            data={dataIti}
            renderItem={({item, index}) => (
              <HistoryItem item={item} type={'favorite'} />
            )}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Itineraries;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  viewList: {
    width: widthScreen,
    paddingBottom: 185,
  },
});
