import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';

const History = () => {
  const isUser = useSelector(state => state.auth.login);
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewWelcome}>
        <Text style={styles.textTitle}>Your Histories</Text>
        <Image
          style={styles.viewAvt}
          source={require('../../assets/images/bana.jpg')}></Image>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({item, index}) => <HistoryItem item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        keyExtractor={index => index}
        style={styles.viewHistories}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen,
    height: heightScreen * 1.2,
    backgroundColor: colors.MEDIUMGRAY,
    paddingLeft: widthScreen * 0.05,
    paddingTop: heightScreen * 0.025,
    paddingRight: widthScreen * 0.05,
  },
  viewWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAvt: {
    height: 47,
    width: 47,
    borderRadius: 23.5,
  },
  textTitle: {
    fontSize: 30,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  viewHistories: {
    flex: 1,
    alignSelf: 'center',
    marginTop: heightScreen * 0.04,
    marginBottom: heightScreen * 0.29,
  },
});
