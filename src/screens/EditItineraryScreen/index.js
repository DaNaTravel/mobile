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

const EditItinerary = ({route}) => {
  const {data} = route.params;
  const [initialData, setInitialData] = useState(data[0]?.route);
  const [newData, setNewData] = useState();
  const [finalData, setFinalData] = useState([]);
  const sortableListRef = useRef(null);

  const rearrangeArrayOrder = (array, order) => {
    const newArray = [];
    for (let i = 0; i < order?.length; i++) {
      const index = order[i];
      newArray?.push(array[index]);
    }
    const result = [null, ...newArray?.filter(item => item !== null), null];
    setFinalData(result);
  };

  const initialValue = () => {
    let arr = [];
    for (let i = 0; i < initialData?.length; i++) {
      arr.push(i);
    }
    setNewData(arr);
  };

  const extractIds = inputArray => {
    const idArray = inputArray?.map(item => item.description._id || null);
    setFinalData(idArray);
  };

  const fetchData = async () => {
    await extractIds(initialData);
    initialValue();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (finalData.length !== 0) {
      handleDeleted();
    }
  }, [finalData]);

  useEffect(() => {
    if (newData) {
      rearrangeArrayOrder(finalData, newData);
    }
  }, [newData]);

  const handleDeleted = () => {
    const result = initialData?.filter(
      item =>
        finalData?.includes(item?.description?._id) ||
        item.description._id === undefined,
    );
    const updatedArr = finalData.map(item =>
      item === null ? undefined : item,
    );
    const sortedArray = updatedArr.map(id =>
      result.find(item => item.description?._id === id),
    );
    sortedArray.splice(
      sortedArray.length - 1,
      1,
      initialData[initialData.length - 1],
    );
    setInitialData(sortedArray);
  };

  const updateSortableListOrder = newOrder => {
    const sortableList = sortableListRef.current;
    if (sortableList && sortableList.updateOrder) {
      sortableList.updateOrder(newOrder.map(item => parseInt(item)));
    }
  };

  useEffect(() => {
    const saveData = () => {
      updateSortableListOrder(newData);
    };

    saveData();
  }, [newData]);

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
          console.log(initialData);
        }}>
        <Text>Get data</Text>
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
        data={initialData}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        ref={sortableListRef}
        renderRow={({data, active}) => {
          return (
            <ItineraryPlace
              item={data}
              active={active}
              type={'edit'}
              finalData={finalData}
              setFinalData={setFinalData}
            />
          );
        }}
        sortingEnabled={true}
        orderEnabled={true}
        onChangeOrder={newOrder =>
          setNewData(newOrder.map(item => parseInt(item)))
        }
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
