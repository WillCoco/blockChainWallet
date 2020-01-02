import React from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';

const Home = props => {
  return (
    <RefreshControl 
      style={styles.refreshWrapper}>
      <Dashboard />
      <AssetsList />
      <PasswordValid />
    </RefreshControl>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  refreshWrapper: {
    // flexDirection: 'column',
    height: '100%',
  },  
});


export default Home;
