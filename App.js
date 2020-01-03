/**
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './src/router';
import stores from './src/redux/store';
import WalletWebView from './src/components/WalletWebView';

const {store, persistor} = stores;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router store={store} />
      <WalletWebView />
    </PersistGate>
  </Provider>
);

export default () => {
  try {
    return App();
  } catch (err) {
    console.log(err);
  }
};
