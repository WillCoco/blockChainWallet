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
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import {Toast} from '../../components/Toast/index';
import {vh, vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';

const AssetsList = props => {
  const {navigate} = useNavigation();

  const goAssetDetail = symbol => {
    navigate({routeName: 'AssetDetail', params: {tokenSymbol: symbol}});
  };

  const assetsList = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  return (
    <>
      <View
        style={{backgroundColor: '#fff'}}>
        {assetsList.map((asset, index) => {
          const borderTopWidth = index !== 0 ? StyleSheet.hairlineWidth : 0;
          return (
            <TouchableOpacity
              key={`asset_${index}`}
              style={StyleSheet.flatten([styles.assetRow, {borderTopWidth}])}
              onPress={() => goAssetDetail(asset.symbol)}>
              <PrimaryText>{asset.symbol}</PrimaryText>
              <PrimaryText>{asset.balanceFmt}</PrimaryText>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

AssetsList.defaultProps = {
  assetsList: [],
};

const styles = StyleSheet.create({
  assetRow: {
    height: vw(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceN,
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
