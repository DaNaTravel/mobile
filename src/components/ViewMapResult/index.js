import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';

const ASPECT_RATIO = widthScreen / (heightScreen * 0.5);
const LATITUDE_DELTA = 0.072;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';
const GOOGLE_MAPS_APIKEY = '';

const ViewMapResult = ({dataHT, index, dataMap, selectedItem, coordinates}) => {
  const [data, setData] = useState(null);
  const [dataHotel, setDataHotel] = useState(dataHT);
  const [dataDes, setDataDes] = useState(dataMap)
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const mapView = useRef(null);

  const getInitialRegion = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    setLat(data?.latitude);
    setLng(data?.longitude);
  };


  useEffect(() => {
    setDataDes(dataMap)
  }, [dataMap]);

  useEffect(() => {
    const selectedRoutes =  dataDes?.[`routes${selectedItem}`];
    setData(selectedRoutes);
    getInitialRegion();
  }, [selectedItem, dataDes]);

  useEffect(() => {
    setDataHotel(dataHT)
  }, [dataHT]);

  mapView.current?.animateToRegion({
    latitude: dataHT[index].lat,
    longitude: dataHT[index].lon,
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

export default ViewMapResult;

const styles = StyleSheet.create({
  map: {
    flex: 1,
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
