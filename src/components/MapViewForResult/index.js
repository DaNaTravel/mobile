import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {enableLatestRenderer, Marker} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableLatestRenderer();

// Rest of your code...

const ASPECT_RATIO = widthScreen / (heightScreen * 0.5);
const LATITUDE_DELTA = 0.072;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';

const GOOGLE_MAPS_APIKEY = '';
const positions = [
  {
    latitude: 16.019110655988168,
    longitude: 108.22903420822459,
    title: 'Place 1',
    description: 'Starting',
  },
  {
    latitude: 16.0383924,
    longitude: 108.2266751,
    title: 'Place 2',
    description: 'Asia Park',
  },
  {
    latitude: 16.0404534,
    longitude: 108.2283843,
    title: 'Place 3',
    description: 'Sunwheel',
  },
  {
    latitude: 16.049417,
    longitude: 108.2233,
    title: 'Place 4',
    description: 'Tran Thi Ly Bridge',
  },
];
const MapViewForResult = ({dataHT, index, dataMap, selectedItem}) => {
  const [data, setData] = useState(positions);
  const [dataHotel, setDataHotel] = useState(dataHT);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const getInitialRegion = async () => {
    let data = await AsyncStorage.getItem('data');
    if (data) {
      const parsedData = JSON.parse(data);
      setLat(parseFloat(parsedData.latitude));
      setLng(parseFloat(parsedData.longitude));
    }
  };
  useEffect(() => {
    const selectedRoutes = dataMap?.[`routes${selectedItem}`];
    setData(selectedRoutes);
    getInitialRegion();
  }, [dataMap, selectedItem]);

  const mapView = useRef(null);
  console.log('data', data);
  return (
    <MapView
      initialRegion={{
        latitude: lat,
        longitude: lng,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
      }}></MapView>
  );
};

export default MapViewForResult;

const styles = StyleSheet.create({
  map: {
    height: heightScreen * 0.5,
    width: widthScreen,
  },
  img: {
    height: 40,
    width: 40,
  },
});
