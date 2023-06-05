import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, {enableLatestRenderer, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import FieldButton from '../../components/FieldButton';

enableLatestRenderer();
const ASPECT_RATIO = widthScreen / (heightScreen * 0.5);
const LATITUDE_DELTA = 0.072;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_PLACES_API_KEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';
// const GOOGLE_MAPS_APIKEY = '';
const PlaceSearch = ({setAddress, navigation, coordinates}) => {
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
        textInputProps={{style: styles.textInput}}
      />
      <Image
        source={require('../../assets/images/searchLoca.png')}
        style={{height: 40, width: 40, position: 'absolute', top: 5, left: 5}}
      />
      <FieldButton
        stylesContainer={styles.buttonNext}
        title={'Next'}
        stylesTitle={styles.textNext}
        icon2={'angle-right'}
        size2={30}
        color2={colors.WHITE}
        onPress={() => {
          navigation.navigate('Home', {coordinates});
        }}
      />
    </View>
  );
};
const ChoosePosition = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState(null);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  useEffect(() => {
    requestLocationPermission();
    refRBSheet.current.open();
  }, []);
  useEffect(() => {
    if (address !== null) getCoordinatesFromAddress(address);
  }, [address]);
  useEffect(() => {
    if (coordinates !== null && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [coordinates]);
  const handlePosition = async (lati, longi) => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    data.latitude = lati;
    data.longitude = longi;
    await AsyncStorage.setItem('data', JSON.stringify(data));
    setCoordinates({latitude: lati, longitude: longi});
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
      <View style={styles.map}>
        {coordinates !== null ? (
          <>
            <MapView
              initialRegion={{
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              ref={mapRef}
              style={styles.map}>
              <Marker
                coordinate={{
                  latitude: coordinates?.latitude,
                  longitude: coordinates?.longitude,
                  longitude: coordinates?.longitude,
                }}>
                <Image
                  source={require('../../assets/images/myPosi.png')}
                  style={styles.img}
                />
              </Marker>
            </MapView>
          </>
        ) : (
          <LottieView
            source={require('../../assets/animations/loading.json')}
            autoPlay
            loop
            style={{
              height: widthScreen * 0.4,
              width: widthScreen * 0.4,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="slide"
        openDuration={400}
        height={heightScreen * 0.4}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
          },
        }}>
        <PlaceSearch
          setAddress={setAddress}
          navigation={navigation}
          coordinates={coordinates}
        />
      </RBSheet>
      <TouchableOpacity
        style={styles.buttonSearch}
        onPress={() => refRBSheet.current.open()}>
        <Image
          source={require('../../assets/images/searchLoca.png')}
          style={{height: 40, width: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChoosePosition;

const styles = StyleSheet.create({
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
  map: {
    height: heightScreen * 0.5,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    marginTop: heightScreen * 0.02,
  },
  img: {
    height: 40,
    width: 40,
  },
  container: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.85,
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
  },
  textInput: {
    borderWidth: 0.5,
    height: heightScreen * 0.06,
    width: widthScreen * 0.85,
    borderRadius: 15,
    paddingHorizontal: 50,
  },
  buttonNext: {
    width: widthScreen * 0.35,
    backgroundColor: colors.MAINCOLOR,
    alignSelf: 'center',
  },
  buttonSearch: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    alignSelf: 'center',
    marginTop: heightScreen * -0.025,
  },
});
