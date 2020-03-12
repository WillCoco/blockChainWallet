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
import PageWrapper from '../../components/PageWrapper';
import DotsNet from '../../components/PageWrapper/PageBackgrounds/DotsNet';
import device from '../../helpers/utils/device';

const AssetDetail = props => {
  const {navigate} = useNavigation();
  const assetsList = useSelector(state =>
    _get(state, ['assets', 'assetsList']),
  );

  const token = useNavigationParam('token') || {};

  const tokenSymbol = token.symbol;

  const findTokenBySymbol = symbol => {
    const tokenIndex = _findIndex(assetsList, o => symbol === o.symbol);
    return assetsList[tokenIndex];
  };

  // 当前币种
  const currentToken = findTokenBySymbol(tokenSymbol);

  return (
    <PageWrapper style={styles.wrapper} pageBackgroundImg={<DotsNet />}>
      <NavBar
        isAbsolute
        title={tokenSymbol}
        absoluteViewStyle={{
          backgroundColor: 'transparent',
          paddingTop: device.statusBarHeight,
        }}
      />
      <AssetCard asset={currentToken} />
      <Histories />
    </PageWrapper>
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
