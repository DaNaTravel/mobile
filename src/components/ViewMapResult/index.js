import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';

const ASPECT_RATIO = widthScreen / (heightScreen * 0.5);
const LATITUDE_DELTA = 0.072;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';
// const GOOGLE_MAPS_APIKEY = '';
const ViewMapResult = ({dataHT, index, dataMap, selectedItem, coordinates}) => {
  const [data, setData] = useState(null);
  const [dataHotel, setDataHotel] = useState(dataHT);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const mapView = useRef(null);
  const getInitialRegion = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    setLat(data?.latitude);
    setLng(data?.longitude);
  };
  useEffect(() => {
    const selectedRoutes = dataMap?.[`routes${selectedItem}`];
    setData(selectedRoutes);
  }, [dataMap, selectedItem]);
  useLayoutEffect(() => {
    getInitialRegion();
  }, []);
  mapView.current?.animateToRegion({
    latitude: dataHT[index].lat,
    longitude: dataHT[index].lon,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: lat ? lat : 16.019135701777493,
        longitude: lng ? lng : 108.22906327878498,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      ref={mapView}>
      {data?.map((coordinate, index) => (
        <Marker
          key={`coordinate_${index}`}
          coordinate={coordinate}
          description={coordinate?.address?.slice(0, 40)}
          title={coordinate?.name}
        />
      ))}
      {dataHotel.map((coordinate, index) => (
        <Marker
          key={`coordinate_${index}`}
          coordinate={{latitude: coordinate.lat, longitude: coordinate.lon}}
          description={coordinate.address}
          title={coordinate.title}>
          <Image
            source={require('../../assets/images/building.png')}
            style={styles.img}
          />
        </Marker>
      ))}
      {data?.length >= 2 && (
        <MapViewDirections
          origin={data?.[0]}
          waypoints={data?.length > 2 ? data?.slice(1, -1) : undefined}
          destination={data?.[data?.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onError={errorMessage => {
            console.log('GOT AN ERROR');
          }}
        />
      )}
    </MapView>
  );
};

export default ViewMapResult;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  img: {
    height: 40,
    width: 40,
  },
});
