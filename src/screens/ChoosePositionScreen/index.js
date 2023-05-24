import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors, heightScreen, widthScreen} from '../../utility';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FieldButton from '../../components/FieldButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';

const PlaceSearch = ({setAddress}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search your position"
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
  const [address, setAddress] = useState(null);
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const handlePosition = async (lati, longi) => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    data.latitude = lati;
    data.longitude = longi;
    await AsyncStorage.setItem('data', JSON.stringify(data));
  };
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
        // getCurrentLocation();
      } else {
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      });
      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);
      handlePosition(latitude, longitude);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
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
        console.log(lat, lng);
        handlePosition(lat, lng);
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error retrieving coordinates:', error);
    }
  };
  const [selectedItem, setSelectedItem] = useState(2);
  const navigation = useNavigation();
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Your Position</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <TouchableOpacity
        style={[
          styles.viewMyPosition,
          selectedItem === 1
            ? {backgroundColor: colors.MAINCOLOR}
            : {backgroundColor: colors.WHITE},
        ]}
        onPress={() => {
          setSelectedItem(1);
        }}>
        <MaterialIcons
          name="location-searching"
          size={70}
          color={selectedItem === 1 ? colors.WHITE : colors.BLACK}
        />
      </TouchableOpacity>
      <Text style={styles.textCurrent}>Use your input position</Text>
      {selectedItem === 1 ? <PlaceSearch setAddress={setAddress} /> : null}
      <TouchableOpacity
        style={[
          styles.viewMyPosition,
          selectedItem === 2
            ? {backgroundColor: colors.MAINCOLOR}
            : {backgroundColor: colors.WHITE},
        ]}
        onPress={() => {
          getCurrentLocation();
          setSelectedItem(2);
        }}>
        <MaterialIcons
          name="my-location"
          size={70}
          color={selectedItem === 2 ? colors.WHITE : colors.BLACK}
        />
      </TouchableOpacity>
      <Text style={styles.textCurrent}>Use your current position</Text>
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={styles.textNext}
        icon2={'angle-right'}
        size2={30}
        color2={colors.WHITE}
        onPress={() => {
          address !== null
            ? getCoordinatesFromAddress(address)
            : selectedItem === 1
            ? Alert.alert('Failed', 'Please choose your input position!', [
                {
                  text: 'Try again',
                },
              ])
            : getCurrentLocation();
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default ChoosePosition;

const styles = StyleSheet.create({
  container: {
    height: heightScreen * 0.22,
    width: widthScreen,
  },
  autocompleteContainer: {
    width: '80%',
  },
  textInput: {
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  viewParent: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.9,
    alignSelf: 'center',
    marginTop: heightScreen * 0.035,
    alignItems: 'center',
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.BLACK,
  },
  viewSpace: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    backgroundColor: colors.WHITE,
  },
  viewMyPosition: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
    marginBottom: heightScreen * 0.01,
  },
  textCurrent: {
    textAlign: 'center',
    color: colors.BLACK,
  },
  buttonNext: {
    position: 'absolute',
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
    bottom: heightScreen * 0.107,
  },
});
