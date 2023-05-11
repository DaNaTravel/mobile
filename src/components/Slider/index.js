import {
  Animated,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../assets/data/index';
import {heightScreen, widthScreen} from '../../utility';
import SlideItem from '../SlideItem';
import Pagination from '../Pagination';
import FieldButton from '../FieldButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLauch} from '../../redux/features/state/stateSlice';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  const handleGet = () => {
    navigation.navigate('About1');
    dispatch(setLauch(true));
  };
  return (
    <View style={styles.viewParent}>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      <FieldButton
        stylesContainer={styles.viewGet}
        title={'Get started'}
        onPress={() => handleGet()}
        stylesTitle={styles.textGetstarted}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  textGetstarted: {
    fontSize: 26,
    fontWeight: 500,
  },
  viewParent: {
    alignItems: 'center',
  },
  viewGet: {
    bottom: heightScreen * 0.17,
  },
});
