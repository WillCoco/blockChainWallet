/**
 * @author: Xu Ke
 * @date: 2019/12/25 5:02 PM
 * @Description: 创建钱包
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import CreateWalletPage from './CreateWallet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';

const CreateWallet = () => <CreateWalletPage />;

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
)(CreateWallet);
