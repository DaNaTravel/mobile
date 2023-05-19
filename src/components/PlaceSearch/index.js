import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {heightScreen, widthScreen} from '../../utility';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU';

const PlaceSearch = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data);
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
export default PlaceSearch;
const styles = StyleSheet.create({
  container: {
    height: heightScreen,
    width: widthScreen,
    backgroundColor: 'red',
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
