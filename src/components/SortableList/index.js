// import {StyleSheet} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {colors, widthScreen} from '../../utility';
// import ItineraryPlace from '../ItineraryPlace';
// import SortableList from 'react-native-sortable-list';

// const SortableListComponent = ({data, selectedItem}) => {
//   const [initialData, setInitialData] = useState(data[0]?.route);
//   const [newData, setNewData] = useState();
//   const [finalData, setFinalData] = useState([]);
//   const sortableListRef = useRef(null);
//   const rearrangeArrayOrder = (array, order) => {
//     const newArray = [];
//     for (let i = 0; i < order?.length; i++) {
//       const index = order[i];
//       newArray?.push(array[index]);
//     }
//     const result = [null, ...newArray?.filter(item => item !== null), null];
//     setFinalData(result);
//   };

//   const initialValue = () => {
//     let arr = [];
//     for (let i = 0; i < initialData?.length; i++) {
//       arr.push(i);
//     }
//     setNewData(arr);
//   };

//   const extractIds = inputArray => {
//     const idArray = inputArray?.map(item => item.description._id || null);
//     setFinalData(idArray);
//   };
//   const fetchData = async () => {
//     await extractIds(initialData);
//     initialValue();
//   };

//   useEffect(() => {
//     fetchData();
//     console.log('load');
//   }, [selectedItem]);

//   useEffect(() => {
//     if (finalData.length !== 0) {
//       handleDeleted();
//     }
//   }, [finalData]);

//   useEffect(() => {
//     if (newData) {
//       rearrangeArrayOrder(finalData, newData);
//     }
//   }, [newData]);

//   const handleDeleted = () => {
//     const result = initialData?.filter(
//       item =>
//         finalData?.includes(item?.description?._id) ||
//         item?.description?._id === undefined,
//     );
//     const updatedArr = finalData.map(item =>
//       item === null ? undefined : item,
//     );
//     const sortedArray = updatedArr.map(id =>
//       result.find(item => item?.description?._id === id),
//     );
//     sortedArray.splice(
//       sortedArray.length - 1,
//       1,
//       initialData[initialData.length - 1],
//     );
//     setInitialData(sortedArray);
//   };

//   const updateSortableListOrder = newOrder => {
//     const sortableList = sortableListRef.current;
//     if (sortableList && sortableList.updateOrder) {
//       sortableList.updateOrder(newOrder.map(item => parseInt(item)));
//     }
//   };

//   useEffect(() => {
//     const saveData = () => {
//       updateSortableListOrder(newData);
//     };

//     saveData();
//   }, [newData]);
//   useEffect(() => {
//     setInitialData(data[selectedItem - 1]?.route);
//   }, [selectedItem]);
//   return (
//     <SortableList
//       data={initialData}
//       style={styles.list}
//       contentContainerStyle={styles.contentContainer}
//       ref={sortableListRef}
//       renderRow={({data, active}) => {
//         return (
//           <ItineraryPlace
//             item={data}
//             active={active}
//             type={'edit'}
//             finalData={finalData}
//             setFinalData={setFinalData}
//           />
//         );
//       }}
//       sortingEnabled={true}
//       orderEnabled={true}
//       onChangeOrder={newOrder =>
//         setNewData(newOrder.map(item => parseInt(item)))
//       }
//     />
//   );
// };

// export default SortableListComponent;

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: colors.WHITE,
//   },
//   contentContainer: {
//     width: widthScreen,
//     ...Platform.select({
//       ios: {
//         paddingHorizontal: 30,
//       },
//       android: {
//         paddingHorizontal: 0,
//       },
//     }),
//   },
// });
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ItineraryPlace from '../ItineraryPlace';
import {colors, widthScreen} from '../../utility';
const window = Dimensions.get('window');

const SortableListComponent = ({
  dataIti,
  selectedItem,
  setDataDay,
}) => {
  const handleRowOrderChange = useCallback(newOrder => {
    setDataDay(newOrder);
  }, []);
  const [listLoca, setListLoca] = useState(dataIti?.[0]?.route);
  useEffect(() => {
    setListLoca(dataIti?.[selectedItem-1]?.route)
  }, [selectedItem])
  
  return (
    <>
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={listLoca}
        renderRow={useCallback(({data, active}) => {
          return (
            <ItineraryPlace
              item={data}
              type={'edit'}
              listLoca={listLoca}
              setListLoca={setListLoca}
            />
          );
        }, [])}
        onChangeOrder={handleRowOrderChange}
      />
    </>
  );
};

export default SortableListComponent;

const styles = StyleSheet.create({
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
});
