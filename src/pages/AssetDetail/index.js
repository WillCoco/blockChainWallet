import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import {H2, H4} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import AssetCard from './AssetCard';
import Histories from './Histories';
import NavBar from '../../components/NavBar';

const AssetDetail = props => {
  const {navigate} = useNavigation();
  const assetsList = useSelector(state =>
    _get(state, ['assets', 'assetsList']),
  );

  const tokenSymbol = useNavigationParam('tokenSymbol');
  const findTokenBySymbol = symbol => {
    const tokenIndex = _findIndex(assetsList, o => symbol === o.symbol);
    return assetsList[tokenIndex];
  };

  // 当前币种
  const currentToken = findTokenBySymbol(tokenSymbol);

  return (
    <View style={styles.wrapper}>
      <NavBar
        isAbsolute
        title={tokenSymbol}
        absoluteViewStyle={{backgroundColor: 'transparent'}}
      />
      <AssetCard asset={currentToken} />
      <Histories />
    </View>
  );
};

AssetDetail.defaultProps = {
  token: {amount: 1},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
});

export default AssetDetail;
