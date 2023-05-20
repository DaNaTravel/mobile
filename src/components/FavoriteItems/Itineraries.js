import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
const Itineraries = ({data}) => {
  return (
    <View style={styles.viewParent}>
      {data.length === 0 ? (
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
