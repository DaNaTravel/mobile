import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Itineraries = ({data}) => {
  const saveFavouriteItineraries = async () => {
    try {
      const itineraryIds = data?.map(item => item.itineraryId);
      await AsyncStorage.setItem('listItiFavo', JSON.stringify(itineraryIds));
      console.log('Lưu trữ danh sách itineraryId thành công');
    } catch (error) {
      console.log('Lưu trữ thất bại:', error);
    }
  };
  useEffect(() => {
    saveFavouriteItineraries();
  }, [data]);

  return (
    <View style={styles.viewParent}>
      {data?.length === 0 ? (
        <Text>You don't have any favorite itinerary items</Text>
      ) : (
        <View style={styles.viewList}>
          <FlatList
            data={data}
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
