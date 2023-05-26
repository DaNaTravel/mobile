import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, Platform, View, TouchableOpacity} from 'react-native';
import SortableList from 'react-native-sortable-list';
import ItineraryPlace from '../../components/ItineraryPlace';
import {colors, widthScreen, heightScreen} from '../../utility';

const Tab = createMaterialTopTabNavigator();

const Day = ({data, index}) => {
  return (
    <View style={styles.viewDetailDaily}>
      <FlatList
        data={data?.route}
        renderItem={({item, index}) => <ItineraryPlace item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.description?.name}
        style={styles.detailDay}
      />
    </View>
  );
};
const TabView = ({data}) => {
  const [days, setDays] = useState([1]);
  const handleDays = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setDays(data?.days);
  };
  useLayoutEffect(() => {
    handleDays();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.textLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
        tabBarScrollEnabled: true,
      }}>
      {days.length !== 0
        ? days?.map((day, index) => {
            return (
              <Tab.Screen
                name={`Day ${day}`}
                children={() => <Day data={data[index]} index={index} />}
                key={index}
              />
            );
          })
        : null}
    </Tab.Navigator>
  );
};
const EditItinerary = ({route}) => {
  const {data} = route.params;
  const renderRow = useCallback(({data, active}) => {
    return <ItineraryPlace item={data} active={active} type={'edit'} />;
  }, []);
  const [newData, setNewData] = useState();
  const [finalData, setFinalData] = useState();
  const rearrangeArrayOrder = (array, order) => {
    const newArray = [];
    for (let i = 0; i < order?.length; i++) {
      const index = order[i];
      newArray?.push(array[index]);
    }
    const result = [null, ...newArray.filter(item => item !== null), null];
    setFinalData(result);
  };
  const initialValue = () => {
    let arr = [];
    for (let i = 0; i < data[0]?.route.length; i++) {
      arr.push(i);
    }
    setNewData(arr);
  };
  function extractIds(inputArray) {
    const idArray = inputArray.map(item => item.description._id || null);
    setFinalData(idArray);
  }
  useEffect(() => {
    extractIds(data[0]?.route);
    initialValue();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Sortable List</Text>
      <TouchableOpacity
        onPress={() => {
          console.log(newData);
        }}>
        <Text>Get</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(finalData);
        }}>
        <Text>Generate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          rearrangeArrayOrder(finalData, newData);
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
      <SortableList
        data={data[0]?.route}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        renderRow={renderRow}
        sortingEnabled={true}
        orderEnabled={true}
        onChangeOrder={newOrder =>
          setNewData(newOrder.map(item => parseInt(item)))
        }
        finalData={finalData}
        setFinalData={setFinalData}
      />
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
  list: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    width: widthScreen,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  textLabel: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: 600,
  },
  tabBarItem: {
    width: 90,
  },
  tabBar: {
    backgroundColor: colors.WHITE,
    width: widthScreen,
    alignSelf: 'center',
  },
  textDate: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
    textAlign: 'center',
  },
  viewDetailDaily: {
    paddingBottom: heightScreen * 0.02,
    backgroundColor: colors.WHITE,
    width: widthScreen,
    paddingLeft: widthScreen * 0.05,
  },
});

export default EditItinerary;
