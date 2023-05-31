// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import {
//   StyleSheet,
//   Text,
//   Platform,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import DayItem from '../../components/DayItem';
// import SortableListComponent from '../../components/SortableList';
// import {colors, widthScreen, heightScreen} from '../../utility';

// const EditItinerary = ({route}) => {
//   const {data} = route.params;
//   const [selectedItem, setSelectedItem] = useState(1);
//   const renderItem = ({item}) => (
//     <DayItem
//       item={item}
//       selected={item === selectedItem}
//       onSelect={setSelectedItem}
//     />
//   );

//   const [day, setDay] = useState([1]);
//   const handleDays = async () => {
//     const data = JSON.parse(await AsyncStorage.getItem('data'));
//     setDay(data?.days);
//   };
//   useEffect(() => {
//     handleDays();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>React Native Sortable List</Text>
//       {/* <TouchableOpacity
//         onPress={() => {
//           console.log(newData);
//         }}>
//         <Text>Get</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           console.log(initialData);
//         }}>
//         <Text>Get data</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           console.log(day);
//         }}>
//         <Text>Generate</Text>
//       </TouchableOpacity>*/}
//       <TouchableOpacity
//         onPress={() => {
//           rearrangeArrayOrder(finalData, newData);
//         }}>
//         <Text>Save</Text>
//       </TouchableOpacity>
//       <View style={styles.viewLists}>
//         <FlatList
//           data={day}
//           renderItem={renderItem}
//           keyExtractor={item => item.toString()}
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           horizontal
//           style={styles.listDays}
//         />
//       </View>
//       {/* <SortableList
//         data={initialData}
//         style={styles.list}
//         contentContainerStyle={styles.contentContainer}
//         ref={sortableListRef}
//         renderRow={({data, active}) => {
//           return (
//             <ItineraryPlace
//               item={data}
//               active={active}
//               type={'edit'}
//               finalData={finalData}
//               setFinalData={setFinalData}
//             />
//           );
//         }}
//         sortingEnabled={true}
//         orderEnabled={true}
//         onChangeOrder={newOrder =>
//           setNewData(newOrder.map(item => parseInt(item)))
//         }
//       /> */}
//       <SortableListComponent data={data} selectedItem={selectedItem} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.WHITE,
//     ...Platform.select({
//       ios: {
//         paddingTop: 20,
//       },
//     }),
//   },
//   title: {
//     fontSize: 20,
//     paddingVertical: 20,
//     color: '#999999',
//   },
//   viewLists: {
//     height: heightScreen * 0.1,
//     width: widthScreen * 0.9,
//     justifyContent: 'center',
//   },
//   listDays: {
//     alignSelf: 'center',
//     marginTop: 13,
//   },
// });

// export default EditItinerary;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DayItem from '../../components/DayItem';
import SortableListComponent from '../../components/SortableList';
import {colors, heightScreen, widthScreen} from '../../utility';

const EditItinerary = ({route}) => {
  const [day, setDay] = useState([1]);
  const [selectedItem, setSelectedItem] = useState(1);
  const [data, setData] = useState([]);
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
  const {dataIti} = route.params;
  const [dataDay, setDataDay] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const getDataDay = () => {
    const arrNew = dataDay.map(str => parseInt(str));
    setNewArray(arrNew);
  };
  const generateData = () => {
    const sortedArray = newArray.map(
      index => data[index]?.description?._id || null,
    );
    console.log(sortedArray);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Sortable List</Text>
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
      />
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            getDataDay();
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            generateData();
          }}>
          <Text>Generate</Text>
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
  viewSave: {
    height: heightScreen * 0.06,
    width: widthScreen * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 20,
  },
  viewButton: {
    flexDirection: 'row',
  },
});

export default EditItinerary;
