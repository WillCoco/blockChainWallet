import React from 'react';
import TransferPage from './Transfer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';

const Transfer = () => <TransferPage />;

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfer);
