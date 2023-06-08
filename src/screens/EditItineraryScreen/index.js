import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DayItem from '../../components/DayItem';
import SortableListComponent from '../../components/SortableList';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {AxiosContext} from '../../context/AxiosContext';
import {GenerateItiTest, UpdateItiTest} from '../../apis/itineraries';
import {useSelector} from 'react-redux';

const EditItinerary = ({route}) => {
  const [day, setDay] = useState([1]);
  const [selectedItem, setSelectedItem] = useState(1);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <DayItem
      item={item}
      selected={item === selectedItem}
      onSelect={setSelectedItem}
    />
  );
  const handleDays = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setDay(data?.days);
  };
  useEffect(() => {
    handleDays();
  }, []);
  useEffect(() => {
    setData(dataIti?.[selectedItem - 1]?.route);
  }, [selectedItem]);
  const {dataIti, Id} = route.params;
  console.log('Id', Id);
  const [dataDay, setDataDay] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [newArrayById, setNewArrayById] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [dataToSent, setDataToSent] = useState(null);
  const [dataToSentMap, setDataToSentMap] = useState(null);
  const [dataReturn, setDataReturn] = useState(null);
  const getDataDay = () => {
    const arrNew = dataDay.map(str => parseInt(str));
    console.log('arrNew', arrNew);
    setNewArray(arrNew);
  };
  const sortArrayByOrder = (arr1, arr2) => {
    const filteredArr2 = arr2.filter(item => item !== null);

    const sortedArr = [];
    for (const index of filteredArr2) {
      if (index >= 0 && index < arr1.length) {
        sortedArr.push(arr1[index]);
      }
    }
    return sortedArr;
  };
  const setFinalDT = async () => {
    await AsyncStorage.setItem('finalDT', JSON.stringify(finalData));
  };
  useEffect(() => {
    setFinalDT();
  }, [finalData]);
  useEffect(() => {
    generateData();
  }, [newArray]);
  useEffect(() => {
    getDataDay();
  }, [dataDay]);

  useEffect(() => handleDatatoSent(dataIti), []);
  const axiosContext = useContext(AxiosContext);
  const generateData = () => {
    const sortedArray = newArray.map(
      index => data[index]?.description?._id || null,
    );
    console.log('sortedArray', sortedArray);
    setNewArrayById(sortedArray);
    const sortArrByOrder = sortArrayByOrder(data, newArray);
    console.log('sortArrByOrder', sortArrByOrder);
    setFinalData(sortArrByOrder);
  };
  const handleDatatoSent = arr1 => {
    const arr2 = {routes: []};

    for (const obj of arr1) {
      const route = [];
      for (const routeObj of obj.route) {
        const newObj = {};
        if (!routeObj.description._id) {
          newObj.latitude = routeObj.description.latitude;
          newObj.longitude = routeObj.description.longitude;
        } else {
          newObj._id = routeObj.description._id;
        }
        route.push(newObj);
      }
      arr2.routes.push(route);
    }
    setDataToSent(arr2, null, 2);
    console.log(JSON.stringify(arr2, null, 2));
  };
  const isUser = useSelector(state => state.auth.login);
  const handleUpdateButton = status => {
    if (newArrayById.length !== 0) {
      dataToSent.routes[selectedItem - 1] = newArrayById.map(i =>
        i === null
          ? {
              latitude: 16.0683088,
              longitude: 108.1490164,
            }
          : i,
      );
    }
    const Reresult = dataToSent?.routes?.map(subArr =>
      subArr.map(item => {
        if (typeof item === 'string') {
          return {_id: item};
        }
        return item;
      }),
    );
    console.log(Reresult);
    UpdateItiTest(Id, isUser?.data?.token, Reresult, status, setDataReturn);
  };
  const handleGenerateButton = () => {
    if (newArrayById.length !== 0) {
      dataToSent.routes[selectedItem - 1] = newArrayById.map(i =>
        i === null
          ? {
              latitude: 16.0683088,
              longitude: 108.1490164,
            }
          : i,
      );
    }
    const Reresult = dataToSent?.routes?.map(subArr =>
      subArr.map(item => {
        if (typeof item === 'string') {
          return {_id: item};
        }
        return item;
      }),
    );
    console.log(Reresult);
    // axiosContext.GenerateNewIti(Id, Reresult);
    GenerateItiTest(Id, isUser?.data?.token, Reresult, setDataToSentMap);
  };
  useEffect(() => {
    if (dataToSentMap !== null) {
      navigation.navigate('ResultEdit', {data: dataToSentMap, Id: Id});
    }
  }, [dataToSentMap]);
  useEffect(() => {
    if (dataReturn !== null) {
      if (dataReturn === 'Success') {
        Alert.alert('Success', 'Your itinerary has been saved successfully!', [
          {
            text: 'Go to Map',
            onPress: () =>
              navigation.navigate('ResultEdit', {data: finalData, Id: Id}),
          },
        ]);
      } else {
        Alert.alert(
          'Warning',
          `Your trip requires careful attention due to some encountered issues: 
          ${dataReturn}`,
          [
            {
              text: 'Cancel',
            },
            {
              text: 'Still save',
              onPress: () => handleUpdateButton(false),
            },
          ],
        );
      }
    }
  }, [dataReturn]);
  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Edit Travel Itinerary</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <View style={styles.viewLists}>
        <FlatList
          data={day}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          style={styles.listDays}
        />
      </View>
      <SortableListComponent
        dataIti={dataIti}
        selectedItem={selectedItem}
        setDataDay={setDataDay}
        finalData={finalData}
      />

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            handleUpdateButton(true);
          }}>
          <Text style={styles.textDay}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            handleGenerateButton();
          }}>
          <Text style={styles.textDay}>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  viewLists: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.9,
    justifyContent: 'center',
  },
  listDays: {
    alignSelf: 'center',
    marginTop: 13,
  },
  viewButton: {
    height: heightScreen * 0.1,
    width: widthScreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewSave: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 20,
  },
  textDay: {
    fontSize: 24,
    color: colors.WHITE,
    fontWeight: 600,
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
});

export default EditItinerary;
