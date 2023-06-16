import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import HistoryItem from '../../components/HistoryItem';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {AxiosContext} from '../../context/AxiosContext';

const History = () => {
  const isUser = useSelector(state => state.auth.login);
  const isFocused = useIsFocused();
  const axiosContext = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([
    {
      label: 'All',
      value: 'all',
      icon: () => (
        <Image
          source={require('../../assets/images/all.png')}
          style={{height: 24, width: 24}}
        />
      ),
    },
    {
      label: 'Public',
      value: true,
      icon: () => (
        <Image
          source={require('../../assets/images/public.png')}
          style={{height: 24, width: 24}}
        />
      ),
    },
    {
      label: 'Private',
      value: false,
      icon: () => (
        <Image
          source={require('../../assets/images/private.png')}
          style={{height: 24, width: 24}}
        />
      ),
    },
  ]);
  const hanldeData = () => {
    value === 'all' || value === null
      ? setData(initialData)
      : setData(initialData.filter(item => item?.isPublic === value));
  };
  useLayoutEffect(() => {
    hanldeData();
  }, [value]);

  useEffect(() => {
    if (isFocused) {
      axiosContext.GetHistories(page, data => {
        setInitialData(data);
        setData(data);
      });
    }
  }, [isFocused]);
  return (
    <View style={styles.viewParent}>
      {isUser?.message === null ? (
        <>
          <View style={styles.viewWelcome}>
            <Text style={styles.textTitle}>Your Histories</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.viewFilter}
              placeholder="Status"
              placeholderStyle={styles.placeHolder}
              containerStyle={styles.containerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.viewList}>
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <HistoryItem item={item} key={item._id} type="history" />
              )}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              keyExtractor={item => item._id}
            />
          </View>
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
  },
  viewWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightScreen * 0.09,
    width: widthScreen,
    zIndex: 1,
  },
  viewFilter: {
    height: heightScreen * 0.055,
    width: widthScreen * 0.4,
    borderRadius: 24,
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 'bold',
    marginLeft: widthScreen * 0.05,
  },
  textAlert: {
    width: widthScreen * 0.85,
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 500,
    alignSelf: 'center',
  },
  viewLogin: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.5,
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen * 0.07,
    alignSelf: 'center',
  },
  textSignin: {
    color: colors.WHITE,
    fontWeight: 500,
    fontSize: 20,
  },
  viewList: {
    width: widthScreen,
    height: heightScreen,
    paddingBottom: heightScreen * 0.2,
    paddingTop: heightScreen * 0.03,
  },
  placeHolder: {
    fontSize: 14,
    fontWeight: 600,
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  containerStyle: {
    width: widthScreen * 0.4,
    marginLeft: widthScreen * 0.08,
  },
  dropDownContainerStyle: {
    borderRadius: 24,
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.BLACK,
    marginLeft: widthScreen * 0.02,
  },
});
