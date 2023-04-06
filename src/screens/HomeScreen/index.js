import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {heightScreen, widthScreen} from '../../utility';

const HomeScreen = () => {
  const getData = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('data'));
    console.log('data ', data);
  };
  return (
    <View style={styles.viewParent}>
      <TouchableOpacity onPress={() => getData()}>
        <Text>Get data </Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
  },
});
