import React from 'react';
import _get from 'lodash/get';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import Empty from '../../components/Empty';
import {vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';
import safePage from '../../helpers/safePage';

const AssetsList = props => {
  const {navigate} = useNavigation();

  /**
   * 前往详情
   */
  const goAssetDetail = symbol => {
    navigate({routeName: 'AssetDetail', params: {tokenSymbol: symbol}});
  };

  /**
   * 是否显示资产
   */
  const isShowAssets = useSelector(state =>
    _get(state, ['appSetting', 'isShowAssets']),
  );

  /**
   * 资产列表
   */
  const assetsList = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  return (
    <View style={{backgroundColor: '#fff', minHeight: '100%', height: '100%', flex: 1}}>
      {props.isLoaded && assetsList.length === 0 ? (
        <Empty />
      ) : (
        assetsList.map((asset, index) => {
          return (
            <View style={styles.wrapper} key={`asset_${index}`}>
              {index !== 0 && (
                <Divider style={{backgroundColor: colors.divider}} />
              )}
              <TouchableOpacity
                style={StyleSheet.flatten([styles.assetRow])}
                onPress={() => goAssetDetail(asset.symbol)}>
                <PrimaryText color="">{asset.symbol}</PrimaryText>
                <PrimaryText color="title">
                  {isShowAssets ? asset.balanceFmt : '****'}
                </PrimaryText>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
};

AssetsList.defaultProps = {
  assetsList: [],
  isLoaded: false,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: vw(4),
  },
  assetRow: {
    height: vw(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceS,
    borderColor: colors.divider,
  },
});

export default props => safePage(AssetsList, props);
