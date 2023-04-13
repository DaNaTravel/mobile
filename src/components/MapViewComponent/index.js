import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  enableLatestRenderer,
  Marker,
} from 'react-native-maps';
import {heightScreen, widthScreen} from '../../utility';

enableLatestRenderer();
const MapViewComponent = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsTraffic={true}
      scrollDuringRotateOrZoomEnabled={false}
      loadingEnabled={true}
      initialRegion={{
        latitude: 16.016667,
        longitude: 108.202778,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker
        coordinate={{latitude: 16.016667, longitude: 108.202778}}
        title={'Begin'}
        description={'Start your life'}
      />
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
