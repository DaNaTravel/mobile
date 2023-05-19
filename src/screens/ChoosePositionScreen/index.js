import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {heightScreen, widthScreen} from '../../utility';
import axios from 'axios';
const GOOGLE_PLACES_API_KEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';

const PlaceSearch = ({setAddress}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data);
          setAddress(data?.description);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:vn',
        }}
      />
    </View>
  );
};
const ChoosePosition = () => {
  const [address, setAddress] = useState();
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
        )}&key=${GOOGLE_PLACES_API_KEY}`,
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
      <Button
        title="Get Current Location"
        onPress={() => {
          getCurrentLocation();
        }}
      />
      <Button
        title="Get Input Location"
        onPress={() => {
          getCoordinatesFromAddress(address);
        }}
      />
      <PlaceSearch setAddress={setAddress} />
    </View>
  );
};

export default ChoosePosition;

const styles = StyleSheet.create({
  container: {
    height: heightScreen,
    width: widthScreen,
  },
  autocompleteContainer: {
    width: '80%',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: widthScreen * 0.3,
  },
});
