import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Itineraries = ({dataIti}) => {
  const saveDataToStorage = async () => {
    try {
      const ids = dataIti.map(item => item.itineraryId);
      await AsyncStorage.setItem('itineraryIds', JSON.stringify(ids));
      console.log('Itinerary IDs saved to AsyncStorage successfully.');
    } catch (error) {
      console.log('Error saving itinerary IDs to AsyncStorage:', error);
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
