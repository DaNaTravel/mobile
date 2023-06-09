import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Search, SearchLoca} from '../../apis/search';
import LottieView from 'lottie-react-native';
import HotelItems from '../../components/HotelItems';
import AddedItem from '../../components/AddedItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../assets/data';

const PlaceSelectionScreen = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [dataAdded, setDataAdded] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const handleSearch = word => {
    SearchLoca(word, 1, 40, setItems, setIsLoading);
  };
  const handleSearchInput = (word, data) => {
    if (word !== '') {
      const filterName = data.filter(item => {
        return Object.values(item?.name)
          .join('')
          .toLowerCase()
          .includes(word.toLowerCase());
      });
      setFilterData(filterName);
    }
  };
  useEffect(() => {
    const resultArray = items.filter(item1 => {
      const found = dataAdded.some(item2 => item2._id === item1._id);
      return !found;
    });
    setItems(resultArray);
  }, [dataAdded]);
  useEffect(() => {
    SearchLoca(search, 1, 40, setItems, setIsLoading);
  }, []);
  useEffect(() => {
    setFilterData(items);
  }, [items]);

  const handleNext = async () => {
    let newPoints = [];
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    newPoints = dataAdded?.map(item => item?._id);
    if (dataAdded.length === 0) {
      data.point = [];
    } else data.point = newPoints;
    await AsyncStorage.setItem('data', JSON.stringify(data));
    navigation.navigate('ChoosePosition');
  };
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Select</Text>
        <TouchableOpacity
          onPress={() => handleNext()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewSearch}>
        <TouchableOpacity onPress={() => handleSearch(search)}>
          <FontAwesome name="search" size={24} color={colors.STRONGGRAY} />
        </TouchableOpacity>
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Search location where you want to go"
          onChangeText={txt => {
            setSearch(txt);
            handleSearchInput(search, items);
          }}
          autoFocus={true}></TextInput>
      </View>
      {dataAdded.length !== 0 ? (
        <View style={styles.viewAdded}>
          <FlatList
            data={dataAdded}
            renderItem={({item, index}) => (
              <AddedItem
                item={item}
                index={index}
                setDataAdded={setDataAdded}
                dataAdded={dataAdded}
                setFilterData={setFilterData}
              />
            )}
            keyExtractor={item => item?._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            horizontal
          />
        </View>
      ) : (
        <></>
      )}

      <View
        style={[
          styles.viewResult,
          dataAdded.length !== 0
            ? {height: heightScreen * 0.8}
            : {height: heightScreen * 0.94},
        ]}>
        <FlatList
          data={filterData}
          renderItem={({item, index}) => (
            <View style={styles.viewHotelItem}>
              <HotelItems
                item={item}
                type="select"
                setDataAdded={setDataAdded}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={item => item?._id}
          style={styles.result}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          //   onEndReached={handleLoadMore}
          //   onEndReachedThreshold={0.35}
          //   ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};

export default PlaceSelectionScreen;

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
  viewSearch: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
    alignItems: 'center',
    paddingHorizontal: widthScreen * 0.07,
    flexDirection: 'row',
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
  input: {
    marginLeft: widthScreen * 0.03,
  },
  viewResult: {
    height: heightScreen * 0.8,
    width: widthScreen,
    alignItems: 'center',
    paddingBottom: heightScreen * 0.15,
    marginTop: heightScreen * 0.02,
  },
  viewHotelItem: {
    marginBottom: heightScreen * 0.02,
  },
  viewAdded: {
    height: heightScreen * 0.16,
    width: widthScreen,
    paddingLeft: widthScreen * 0.04,
  },
});
