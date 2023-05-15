import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import FavoriteItem from '../../components/FavoriteItem';
import {GetFavo} from '../../apis/favorite';
const FavoriteTab = () => {
  const [selectedItem, setSelectedItem] = useState('Itineraries');
  const [data, setData] = useState(null);
  useEffect(() => {
    GetFavo(selectedItem === 'Itineraries' ? 'itinerary' : 'location', setData);
  }, [selectedItem]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.tabBarItem,
        selectedItem === item && styles.selectedTabBarItem,
      ]}
      onPress={() => setSelectedItem(item)}>
      <Text
        style={[
          styles.textLabel,
          selectedItem === item && styles.selectedLabel,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={styles.viewList}>
        <FlatList
          data={['Itineraries', 'Locations']}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
        />
      </View>
      {data === null ? (
        <Text>You don't have any favorite</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
              <FavoriteItem item={item} />
          )}
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
const Favorite = () => {
  const isUser = useSelector(state => state.auth.login);
  return (
    <View style={styles.viewParent}>
      {isUser?.message === null ? (
        <FavoriteTab />
      ) : (
        <>
          <LottieView
            source={require('../../assets/animations/NonAccount.json')}
            style={{
              height: heightScreen * 0.5,
              width: widthScreen,
            }}
          />
          <Text style={styles.textAlert}>
            If you want to use this function, you have to log in to use it.
          </Text>
          <TouchableOpacity style={styles.viewLogin}>
            <Text style={styles.textSignin}>Back to Sign in</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  viewParent: {
    backgroundColor: colors.WHITE,
    height: heightScreen,
    width: widthScreen,
    alignItems: 'center',
  },
  textAlert: {
    width: widthScreen * 0.85,
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 500,
  },
  viewLogin: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen * 0.07,
  },
  textSignin: {
    color: colors.WHITE,
    fontWeight: 500,
    fontSize: 20,
  },
  tabBarItem: {
    width: widthScreen * 0.4,
    height: heightScreen * 0.1,
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthScreen * 0.02,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.BLACK,
  },
  viewList: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.9,
    alignItems: 'center',
    marginTop: heightScreen * 0.03,
  },
  selectedTabBarItem: {
    backgroundColor: colors.MAINCOLOR,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.WHITE,
  },
});
