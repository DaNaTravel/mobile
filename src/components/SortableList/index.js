import {StyleSheet, Platform} from 'react-native';
import SortableList from 'react-native-sortable-list';
import React, {useCallback, useEffect, useState} from 'react';
import ItineraryPlace from '../ItineraryPlace';
import {colors, widthScreen} from '../../utility';

const SortableListComponent = ({dataIti, selectedItem, setDataDay}) => {
  const handleRowOrderChange = useCallback(newOrder => {
    setDataDay(newOrder);
  }, []);
  const [listLoca, setListLoca] = useState(dataIti?.[0]?.route);
  useEffect(() => {
    setListLoca(dataIti?.[selectedItem - 1]?.route);
  }, [selectedItem]);
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
