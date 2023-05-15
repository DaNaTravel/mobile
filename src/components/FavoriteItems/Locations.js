import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FavoriteItem from '../FavoriteItem';
import {colors, heightScreen, widthScreen} from '../../utility';

const Locations = ({data}) => {
  return (
    <View style={styles.viewParent}>
      {data === null ? (
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
  },
});
