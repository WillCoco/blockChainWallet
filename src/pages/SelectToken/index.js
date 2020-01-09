/**
 * @author: Xu Ke
 * @date: 2019/12/25 4:14 PM
 * @Description: 转账选择token
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useNavigationParam} from 'react-navigation-hooks';
import TokensList from '../../components/TokensList';

const SelectToken = props => {
  const onSelectToken = useNavigationParam('onSelectToken');

  return (
    <TokensList tokensList={props.tokensList} onSelectToken={onSelectToken} />
  );
};

export default SelectToken;
