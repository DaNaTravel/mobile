import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
  Callout,
} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';
import MapViewDirections from 'react-native-maps-directions';

enableLatestRenderer();
const ASPECT_RATIO = widthScreen / (heightScreen * 0.5);
const LATITUDE_DELTA = 0.072;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';
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
const MapViewComponent = ({dataHT}) => {
  const [data, setData] = useState(positions);
  const [dataHotel, setDataHotel] = useState(dataHT)
  const onMapPress = e => {
    setData([...data, e.nativeEvent.coordinate]);
  };
  return (
    <MapView
      initialRegion={{
        latitude: positions[0].latitude,
        longitude: positions[0].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={styles.map}
      onPress={onMapPress}>
      {data.map((coordinate, index) => (
        <Marker
          key={`coordinate_${index}`}
          coordinate={coordinate}
          description={coordinate.description}
          title={coordinate.title}
        />
      ))}
      {dataHotel.map((coordinate, index) => (
        <Marker
          key={`coordinate_${index}`}
          coordinate={{latitude:coordinate.lat,longitude: coordinate.lon}}
          description={coordinate.address}
          title={coordinate.title}
          image={require('../../assets/images/building.png')}
        />
      ))}
      {data.length >= 2 && (
        <MapViewDirections
          origin={data[0]}
          waypoints={data.length > 2 ? data.slice(1, -1) : undefined}
          destination={data[data.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
          }}
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
});
