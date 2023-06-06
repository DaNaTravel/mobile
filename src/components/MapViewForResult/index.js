import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
  Callout,
} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableLatestRenderer();
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
    setLat(parseFloat(data.latitude));
    setLng(parseFloat(data.longitude));
  };
  useEffect(() => {
    const selectedRoutes = dataMap?.[`routes${selectedItem}`];
    setData(selectedRoutes);
    getInitialRegion();
  }, [dataMap, selectedItem]);

  const mapView = useRef(null);
  mapView.current?.animateToRegion({
    latitude: dataHT[index].lat,
    longitude: dataHT[index].lon,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  return (
    <MapView
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={styles.map}
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
