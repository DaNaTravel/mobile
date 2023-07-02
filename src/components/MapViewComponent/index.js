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

const GOOGLE_MAPS_APIKEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';
// const GOOGLE_MAPS_APIKEY = '';
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
const MapViewComponent = ({
  dataHT,
  index,
  dataMap,
  selectedItem,
  coordinates,
}) => {
  const [data, setData] = useState(positions);
  const [dataHotel, setDataHotel] = useState(dataHT);
  const [dataDes, setDataDes] = useState(dataMap)
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const getInitialRegion = async () => {
    let data = await AsyncStorage.getItem('data');
    setLat(parseFloat(data.latitude));
    setLng(parseFloat(data.longitude));
  };

  useEffect(() => {
    setDataDes(dataMap)
  }, [dataMap])

  useEffect(() => {
    const selectedRoutes =  dataDes?.[`routes${selectedItem}`];
    setData(selectedRoutes);
    getInitialRegion();
  }, [selectedItem, dataDes]);

  useEffect(() => {
    setDataHotel(dataHT)
  }, [dataHT])
  
  const mapView = useRef(null);
  mapView.current?.animateToRegion({
    latitude: dataHotel[index]?.lat,
    longitude: dataHotel[index]?.lon,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  const markerImage = number => (
    <>
      <Image
        style={styles.marker}
        source={require('../../assets/images/placeholder.png')}></Image>
      <Image
        style={styles.markerImage}
        source={{
          uri: `https://dummyimage.com/50x50/fd003a/000000&text=${number}`,
        }}
        resizeMode="contain"
      />
    </>
  );
  return (
    <MapView
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
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
          title={coordinate?.name}>
          {markerImage(index)}
        </Marker>
      ))}
      {dataHotel ? dataHotel.map((coordinate, index) => (
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
      )): null}
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

export default MapViewComponent;

const styles = StyleSheet.create({
  map: {
    height: heightScreen * 0.5,
    width: widthScreen,
  },
  img: {
    height: 30,
    width: 30,
  },
  marker: {
    width: 30,
    height: 30,
  },
  markerImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 5,
    top: 1,
  },
});
