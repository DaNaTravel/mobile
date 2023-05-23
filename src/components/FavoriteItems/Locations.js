import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FavoriteItem from '../FavoriteItem';
import {colors, heightScreen, widthScreen} from '../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetFavo} from '../../apis/favorite';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Locations = ({dataCate}) => {
  const [data, setData] = useState(null);
  const handleData = () => {
    GetFavo(dataCate, isUser?.data?._id, setData);
  };
  const isUser = useSelector(state => state.auth.login);
  const saveFavouriteLocations = async () => {
    try {
      const locationIds = data?.map(item => item?.locationId);
      await AsyncStorage.setItem('listLocaFavo', JSON.stringify(locationIds));
      console.log('Lưu trữ danh sách locationId thành công');
    } catch (error) {
      console.log('Lưu trữ thất bại:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleData();
      saveFavouriteLocations();
    }, []),
  );
  // useEffect(() => {
  //   handleData();
  //   saveFavouriteLocations();
  // }, []);
  return (
    <View style={styles.viewParent}>
      {data?.length === 0 ? (
        <Text>You don't have any favorite location items</Text>
      ) : (
        <View style={styles.viewList}>
          <FlatList
            data={data}
            renderItem={({item, index}) => <FavoriteItem item={item} />}
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
