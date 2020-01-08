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
import BlocksList from '../../components/BlocksList';

const SelectBlock = props => {
  const onBlockSelected = useNavigationParam('onSelectToken');

  return (
    <BlocksList
      tokensList={props.tokensList}
      onBlockSelected={onBlockSelected}
    />
  );
};

function mapStateToProps(state) {
  return {
    tokensList: [{name: 'asd'}, {name: 'ddd'}],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectBlock);
