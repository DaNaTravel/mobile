import React, {useEffect, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';

const ChoosePosition = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        getCurrentLocation();
      } else {
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getCoordinatesFromAddress = async address => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU`,
      );
      const {results} = response.data;
      if (results.length > 0) {
        const {lat, lng} = results[0].geometry.location;
        console.log('data', lat, lng);
        return {latitude: lat, longitude: lng};
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error retrieving coordinates:', error);
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Enter an address"
        value={address}
        onChangeText={setAddress}
      />
      <Button
        title="Get Coordinates"
        onPress={() => {
          getCurrentLocation();
          getCoordinatesFromAddress(address);
        }}
      />
      {coordinates && (
        <MapView
          style={{width: '100%', height: 300}}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker coordinate={coordinates} />
        </MapView>
      )}
    </View>
  );
};

export default ChoosePosition;
