import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FavoriteItem from '../FavoriteItem';
import {colors, heightScreen, widthScreen} from '../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Locations = ({dataLoca}) => {
  const saveDataToStorage = async () => {
    try {
      if (dataLoca) {
        const ids = dataLoca.map(item => item.locationId);
        if (ids.length > 0) {
          await AsyncStorage.setItem('LocationIds', JSON.stringify(ids));
          console.log('Location IDs saved to AsyncStorage successfully.');
        } else {
          await AsyncStorage.removeItem('LocationIds');
          console.log('Location IDs removed from AsyncStorage.');
        }
      }
    } catch (error) {
      console.log(
        'Error saving/removing Location IDs to/from AsyncStorage:',
        error,
      );
    }
  };
  const [data, setData] = useState([]);
  const [tempDataLoca, setTempDataLoca] = useState([]);

  useEffect(() => {
    saveDataToStorage();
    setTempDataLoca(dataLoca);
  }, [dataLoca]);

  useEffect(() => {
    setData(tempDataLoca);
  }, [tempDataLoca]);

  useEffect(() => {}, [data]);
  return (
    <View style={styles.viewParent}>
      {dataLoca?.length === 0 ? (
        <Text>You don't have any favorite location items</Text>
      ) : (
        <View style={styles.viewList}>
          <FlatList
            data={dataLoca}
            renderItem={({item, index}) => (
              <FavoriteItem item={item} key={item._id} />
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

export default Locations;

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
