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

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router store={store} />
      <WalletWebView />
    </PersistGate>
  </Provider>
);
