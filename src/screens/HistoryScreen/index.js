import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

const History = () => {
  const isUser = useSelector(state => state.auth.login);
  return (
    <View style={styles.viewParent}>
      {isUser?.message === null ? (
        <>
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
        </>
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
          <TouchableOpacity
            style={styles.viewLogin}
            onPress={() => navigation.replace('LoginNav')}>
            <Text style={styles.textSignin}>Go to Sign in</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen,
    height: heightScreen * 1.2,
    backgroundColor: colors.MEDIUMGRAY,
    // paddingLeft: widthScreen * 0.05,
    // paddingTop: heightScreen * 0.025,
    // paddingRight: widthScreen * 0.05,
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
  textAlert: {
    width: widthScreen * 0.85,
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 500,
    alignSelf: 'center'
  },
  viewLogin: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen * 0.07,
    alignSelf: 'center'
  },
  textSignin: {
    color: colors.WHITE,
    fontWeight: 500,
    fontSize: 20,
  },
});
