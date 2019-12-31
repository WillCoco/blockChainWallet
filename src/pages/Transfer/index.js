import React from 'react';
import {Text} from 'react-native';
import TransferPage from './Transfer';
import _get from 'lodash/get';

const Transfer = (props) => <TransferPage props={props}/>;

Transfer.navigationOptions = {
  headerTitle: '页面内',
  headerRight: options => {
    // console.log(options, 'options');
    return <Text onPress={() => alert(1111)}>3333</Text>;
  },
  // headerLeft: () => {}
};

export default Transfer;
