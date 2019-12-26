import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const localStorageVersion = 1;

// 分级持久化存储配置
const appSettingPersistConfig = {
  key: 'appSetting',
  storage: AsyncStorage,
  version: localStorageVersion,
  whitelist: ['sessionId', 'account'],
  migrate: state => {
    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  ...reducers,
  appSetting: persistReducer(appSettingPersistConfig, reducers.appSetting),
});

const enhancer = composeEnhancers(applyMiddleware(thunk));

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  return {store, persistor: persistStore(store)};
}
const stores = configureStore();

export default stores;
