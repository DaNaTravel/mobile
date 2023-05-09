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
import {Search} from '../../apis/search';
const Header = ({search, setSearch, setFilter, items, setItems}) => {
  // console.log('data', items);
  // const handleSearch = (word, data) => {
  //   if (word !== '') {
  //     const filterName = data.filter(item => {
  //       return Object.values(item?.name)
  //         .join('')
  //         .toLowerCase()
  //         .includes(word.toLowerCase());
  //     });
  //     setFilter(filterName);
  //   }
  // };
  const handleSearch = word => {
    Search(word, 1, 10, setItems);
  };
  const navigation = useNavigation();
  return (
    <>
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
            // handleSearch(search, items);
          }}
          onSubmitEditing={() => handleSearch(search)}
          autoFocus={true}></TextInput>
      </View>
    </>
  );
};
const Body = ({filter, items}) => {
  console.log('items', items);
  return (
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
      />
    </View>
  );
};
const SearchAllScreen = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState([]);
  return (
    <View style={styles.viewParent}>
      <Header
        search={search}
        setSearch={setSearch}
        items={items}
        setFilter={setFilter}
        setItems={setItems}
      />
      <Body filter={filter} items={items} search={search} />
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
    height: heightScreen * 0.77,
    width: widthScreen * 0.9,
    alignSelf: 'center',
  },
  input: {
    marginLeft: widthScreen * 0.03,
  },
  viewHotelItem: {
    marginRight: widthScreen * 0.02,
    marginBottom: heightScreen * 0.02,
  },
  result: {
    marginTop: heightScreen * 0.05,
  },
});
