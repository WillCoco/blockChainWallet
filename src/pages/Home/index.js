import React from 'react';
import {StyleSheet} from 'react-native';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';

const Home = props => {
  return (
    <>
      <Dashboard />
      <AssetsList />
      <PasswordValid />
    </>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
    title: '123',
  };
};

const styles = StyleSheet.create({
});


export default Home;
