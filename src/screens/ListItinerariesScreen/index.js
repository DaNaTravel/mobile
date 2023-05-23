import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HistoryItem from '../../components/HistoryItem';
import {GetItineraries} from '../../apis/itineraries';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItinerariesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const isUser = useSelector(state => state.auth.login);
  const [listFavo, setListFavo] = useState([]);
  const handleListFavo = async () => {
    let list = JSON.parse(await AsyncStorage.getItem('listItiFavo'));
    setListFavo(list);
  };
  useEffect(() => {
    GetItineraries(setData);
    handleListFavo();
  }, []);
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() =>
            isUser?.data?._id !== undefined
              ? navigation.navigate('BottomTab')
              : navigation.navigate('BottomTabGuess')
          }
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Itineraries</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <View style={styles.viewList}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <HistoryItem
              item={item}
              index={index}
              key={item?._id}
              type={'itineraries'}
              listFavo={listFavo}
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={item => item?._id}
        />
      </View>
    </View>
  );
};

export default ListItinerariesScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK,
  },
  viewSpace: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    backgroundColor: colors.WHITE,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.9,
    alignSelf: 'center',
    marginTop: heightScreen * 0.035,
    alignItems: 'center',
  },
  viewList: {
    paddingBottom: heightScreen * 0.1,
  },
});
