import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HotelItems from '../../components/HotelItems';
import {useNavigation} from '@react-navigation/native';
import {Filter, Search} from '../../apis/search';
import FilterItem from '../../components/FilterItem';
import LottieView from 'lottie-react-native';

const types = [
  {type: 'restaurant', name: 'Restaurant'},
  {type: 'cafe', name: 'Cafe'},
  {type: 'tourist_attraction', name: 'Tourist attraction'},
  {type: 'lodging', name: 'Lodging'},
  {type: 'museum', name: 'Museum'},
  {type: 'amusement_park', name: 'Amusement Park'},
  {type: 'park', name: 'Park'},
  {type: 'church', name: 'Church'},
  {type: 'natural_feature', name: 'Natural Feature'},
];

const SearchAllScreen = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = word => {
    Search(word, arrTypes.join(), 1, 10, setItems, setIsLoading);
  };

  const [arrTypes, setArrTypes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    Filter(arrTypes.join(), 1, 10, setItems, setIsLoading);
  }, [arrTypes]);

  const handleLoadMore = () => {
    if (isLoading || items.length === 0) {
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  const renderFooter = () => {
    return (
      <LottieView
        source={require('../../assets/animations/loading1.json')}
        autoPlay
        loop
        style={{
          height: widthScreen * 0.2,
          width: widthScreen * 0.2,
          alignSelf: 'center',
        }}
      />
    );
  };

  useEffect(() => {
    if (page !== 1) {
      console.log('page', page);
      if (search !== '') {
        setIsLoading(true);
        Search(search, arrTypes.join(), page, 10, setNewData, setIsLoading);
      } else {
        setIsLoading(true);
        Filter(arrTypes.join(), page, 10, setNewData, setIsLoading);
      }
    }
  }, [page]);

  useEffect(() => {
    setItems(prevItems => [...prevItems, ...newData]);
  }, [newData]);

  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Searching</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <View style={styles.viewSearch}>
        <TouchableOpacity onPress={() => handleSearch(search)}>
          <FontAwesome name="search" size={24} color={colors.STRONGGRAY} />
        </TouchableOpacity>
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Search place where you want to go"
          onChangeText={txt => {
            setSearch(txt);
          }}
          onSubmitEditing={() => handleSearch(search)}
          autoFocus={true}>
        </TextInput>
      </View>
      <View style={styles.viewList}>
        <FlatList
          data={types}
          renderItem={({item, index}) => (
            <FilterItem
              item={item}
              setItems={setItems}
              setArrTypes={setArrTypes}
              arrTypes={arrTypes}
            />
          )}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          style={styles.viewFilter}
        />
      </View>
      <View style={styles.viewResult}>
        <FlatList
          data={items}
          renderItem={({item, index}) => (
            <View style={styles.viewHotelItem}>
              <HotelItems item={item} />
            </View>
          )}
          numColumns={2}
          keyExtractor={item => item?._id}
          style={styles.result}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.35}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};

export default SearchAllScreen;

const styles = StyleSheet.create({
  viewParent: {
    flex: 1,
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
  viewResult: {
    height: heightScreen * 0.75,
    width: widthScreen * 0.9,
    alignSelf: 'center',
    paddingBottom: heightScreen * 0.03,
  },
  input: {
    marginLeft: widthScreen * 0.03,
  },
  viewHotelItem: {
    marginBottom: heightScreen * 0.02,
  },
  result: {
    marginTop: heightScreen * 0.02,
  },
  viewList: {
    width: widthScreen * 0.9,
    alignSelf: 'center',
    height: heightScreen * 0.07,
  },
  viewFilter: {
    marginTop: heightScreen * 0.012,
  },
});
