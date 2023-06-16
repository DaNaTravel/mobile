import {
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ConfirmLogout from '../Modal/ConfirmLogout';
import {AxiosContext} from '../../context/AxiosContext';
import ConfirmPublic from '../Modal/ConfirmPublic';
const HistoryItem = ({item, type, listFavo, setListFavo, data, setData}) => {
  const navigation = useNavigation();
  const [dataImg, setDataImg] = useState([]);
  const axiosContext = useContext(AxiosContext);
  const isUser = useSelector(state => state.auth.login);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSure = async () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = id => {
    setModalVisible(!isModalVisible);
  };

  const handleTotal = num => {
    let formattedNum = num
      ?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      ?.replace(',00', '')
      ?.slice(0, -1);
    return formattedNum;
  };

  const CreateListImg = routes => {
    const result = routes
      ?.map(route => route.photos)
      .filter(photo => photo !== null);
    setDataImg(result);
  };

  const handleExist = id => {
    const updatedListFavo = listFavo?.filter(item => item !== id);
    setListFavo(updatedListFavo);
    axiosContext.DeleteItineraryFavo(id);
  };

  const handleNotExist = id => {
    const updatedListFavo = listFavo ? [...listFavo, id] : [id];
    setListFavo(updatedListFavo);
    axiosContext.AddItineraryFavorite(id);
  };

  const handleDate = day => {
    const date = new Date(day);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const CreateListImgForFavo = routes => {
    const photoArray = routes
      .filter(item => item.description.photos !== null)
      .map(item => item.description.photos);
    setDataImg(photoArray);
  };

  const [isEnabled, setIsEnabled] = useState(item?.isPublic);

  const toggleSwitch = () => {
    if (!isEnabled) setModalVisible(!isModalVisible);
    else {
      axiosContext.ChangeStatusForIti(item?._id, !isEnabled);
      setIsEnabled(previousState => !previousState);
    }
  };

  useEffect(() => {
    type === 'favorite'
      ? CreateListImgForFavo(item?.routes?.[0]?.route)
      : CreateListImg(item?.routes);
  }, []);

  return (
    <View style={styles.viewParent}>
      <View style={styles.viewContainer0}>
        <Text style={styles.textName} numberOfLines={1}>
          {item?.name !== undefined ? item?.name : 'Unnamed Journey'}
        </Text>
        {type === 'history' ? (
          <View style={styles.viewSwitch}>
            <Image
              source={
                item?.isPublic
                  ? require('../../assets/images/public.png')
                  : require('../../assets/images/private.png')
              }
              style={{height: 24, width: 24, marginRight: widthScreen * 0.02}}
            />
            <Switch
              trackColor={{false: '#C4C4C4', true: '#4059F2'}}
              thumbColor={isEnabled ? '#FEFEFE' : '#FEFEFE'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.viewContainer1}>
        <FlatList
          data={dataImg}
          renderItem={({item, index}) => (
            <Image
              style={styles.viewImg}
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${item}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
              }}
              resizeMode="cover"
            />
          )}
          keyExtractor={index => index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={styles.viewContainer1}
          horizontal
        />
      </View>
      <View style={styles.viewContainer2}>
        <View style={styles.viewDate}>
          <FontAwesome name="calendar" size={30} color={colors.MAINCOLOR} />
          <View style={styles.viewDetailDate}>
            <Text style={styles.textDate}>
              {item?.itinerary?.days !== undefined
                ? item?.itinerary?.days
                : item?.days}{' '}
              {item?.itinerary?.days <= 1 || item?.days <= 1 ? 'Day' : 'Days'}
            </Text>
            <Text style={styles.textDetailDate}>
              {handleDate(item?.startDate)} - {handleDate(item?.endDate)}
            </Text>
          </View>
        </View>
        <View style={styles.viewPeople}>
          <Ionicons name="person" size={30} color={colors.MAINCOLOR} />
          <View style={styles.viewDetailDate}>
            <Text style={styles.textDate}>
              {item?.itinerary?.people !== undefined
                ? item?.itinerary?.people
                : item?.people}{' '}
              {item?.itinerary?.people <= 1 || item?.people <= 1
                ? 'person'
                : 'people'}
            </Text>
            <Text style={styles.textDetailDate}>Join</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewContainer3}>
        <View style={styles.viewPrice}>
          <Text style={styles.textDetailDate}>Total</Text>
          <Text style={styles.textPrice}>
            {item?.itinerary?.cost !== undefined
              ? handleTotal(item?.itinerary?.cost)
              : handleTotal(item?.cost)}
            <Text style={styles.textUnit}>VND</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonDetails}
          onPress={() => navigation.navigate('DetailsHistory', {item: item})}>
          <Text style={styles.textDetail}>Details</Text>
        </TouchableOpacity>
        {type === 'favorite' ? (
          <TouchableOpacity
            style={styles.Heart}
            onPress={() => handleDelete(item?.itineraryId)}>
            <FontAwesome name="heart" size={32} color={colors.RED} />
          </TouchableOpacity>
        ) : type === 'itineraries' ? (
          <TouchableOpacity
            style={styles.Heart}
            onPress={() =>
              listFavo?.includes(item?._id)
                ? handleExist(item?._id)
                : handleNotExist(item?._id)
            }>
            <FontAwesome
              name="heart"
              size={32}
              color={
                listFavo?.includes(item?._id) ? colors.RED : colors.STRONGGRAY
              }
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <ConfirmLogout
        handleSignout={handleSure}
        isModalVisible={isModalVisible}
        navigation={navigation}
        type={'deleteIti'}
        dataId={item?.itineraryId}
        setModalVisible={setModalVisible}
        data={data}
        setData={setData}
      />
      <ConfirmPublic
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        dataId={item?._id}
        setIsEnabled={setIsEnabled}
        isEnabled={isEnabled}
      />
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.41,
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    paddingVertical: heightScreen * 0.015,
    paddingHorizontal: widthScreen * 0.035,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: heightScreen * 0.015,
    zIndex: 999,
  },
  viewContainer1: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
    padding: 3,
    flexDirection: 'row',
  },
  viewContainer2: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    alignSelf: 'center',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImg: {
    height: heightScreen * 0.085,
    width: widthScreen * 0.2,
    borderRadius: 20,
    marginRight: widthScreen * 0.02,
  },
  viewDate: {
    width: widthScreen * 0.4,
    height: heightScreen * 0.085,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailDate: {
    width: widthScreen * 0.3,
    height: heightScreen * 0.085,
    justifyContent: 'space-evenly',
    marginLeft: widthScreen * 0.05,
  },
  viewPeople: {
    width: widthScreen * 0.4,
    height: heightScreen * 0.085,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDate: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textDetailDate: {
    fontSize: 13,
    color: colors.STRONGGRAY,
  },
  viewContainer3: {
    height: heightScreen * 0.103,
    width: widthScreen * 0.83,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonDetails: {
    height: 0.06 * heightScreen,
    width: widthScreen * 0.3,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  viewPrice: {
    height: heightScreen * 0.085,
    justifyContent: 'space-around',
  },
  textDetail: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.WHITE,
  },
  textPrice: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  textUnit: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  viewContainer0: {
    height: heightScreen * 0.07,
    width: widthScreen * 0.83,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 600,
    maxWidth: 250,
  },
  switch: {
    transform: [{scaleX: 1.25}, {scaleY: 1.25}],
  },
  viewSwitch: {
    flexDirection: 'row',
  },
});
