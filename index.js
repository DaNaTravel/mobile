/**
 * @format
 */
import {AppRegistry, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import {AxiosProvider} from './src/context/AxiosContext';
import {persistor, store} from './src/redux/store';

const App_init = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AxiosProvider>
          <View style={{flex: 1}}>
            <App />
          </View>
        </AxiosProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App_init);
