import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-elements';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import {Toast} from '../../components/Toast';
import Empty from '../../components/Empty';
import {vh, vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';

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
    _get(state, ['appSetting', 'isShowAssets'])
  );

  /**
   * 资产列表
   */
  const assetsList = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  console.log(isShowAssets, 'isShowAssets');

  return (
    <View style={{backgroundColor: '#fff'}}>
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
                <PrimaryText color="title">{isShowAssets ? asset.balanceFmt : '****'}</PrimaryText>
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
)(AssetsList);
