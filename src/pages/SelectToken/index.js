/**
 * @author: Xu Ke
 * @date: 2019/12/25 4:14 PM
 * @Description: 转账选择token
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import TokensList from '../../components/TokensList';

const SelectToken = props => {

  const onSelectToken = useNavigationParam('onSelectToken');

  return (
    <TokensList
      tokensList={props.tokensList}
      onTokenSelected={onSelectToken}
    />
  )
};

function mapStateToProps(state) {
  return {
    tokensList: [{name: 'asd'}, {name: 'ddd'}],
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
)(SelectToken);
