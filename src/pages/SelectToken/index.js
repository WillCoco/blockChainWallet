/**
 * @author: Xu Ke
 * @date: 2019/12/25 4:14 PM
 * @Description: 转账选择token
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import TokensList from '../../components/TokensList';
import colors from '../../helpers/colors';

const SelectToken = props => {
  const onSelectToken = useNavigationParam('onSelectToken');

  return (
    <>
      <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
      <TokensList tokensList={props.tokensList} onSelectToken={onSelectToken} />
    </>
  );
};

export default SelectToken;
