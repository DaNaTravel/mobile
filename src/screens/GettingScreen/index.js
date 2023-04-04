import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import data from '../../assets/data/index';

const GettingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      <ImageBackground
        source={require('../../assets/images/them1.jpg')}
        resizeMode="cover"
        style={styles.img}>
        <View style={styles.viewHeader}>
          <View style={styles.viewText}>
            <Text style={styles.textMain}>Explore Da Nang city with us</Text>
          </View>
          <View style={styles.viewButtonNext}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Start')}
              style={styles.buttonNext}>
              <FontAwesome name="arrow-right" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewBody}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  height: heightScreen * 0.4,
                  width: widthScreen * 0.7,
                  marginRight: 50,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderTopRightRadius: 50,
                }}>
                <Image source={item.img} />
              </View>
            )}
            keyExtractor={item => item.id}
            style={styles.list}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default GettingScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
  },
  textMain: {
    fontSize: 60,
    color: '#0F3C4D',
    position: 'absolute',
    bottom: 0,
  },
  viewHeader: {
    height: heightScreen * 0.5,
    width: widthScreen,
  },
  viewText: {
    height: heightScreen * 0.4,
    width: widthScreen * 0.8,
    alignSelf: 'center',
  },
  viewButtonNext: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.9,
    alignItems: 'flex-end',
  },
  buttonNext: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3C4D',
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
  },
  viewBody: {
    height: heightScreen * 0.5,
    width: widthScreen,
  },
  list: {flex: 1},
  img: {
    resizeMode: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 50,
  },
});
