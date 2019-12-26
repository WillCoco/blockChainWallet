import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import useI18n from '../hooks/useI18n';
import {vh, vw, metrics} from '../helpers/metric/index';
import i18n from '../helpers/i18n/index';
import colors from '../helpers/colors/index';

const TokensList = props => {
  const {goBack, setParams} = useNavigation();

  const onTokenSelected = () => {
    goBack();
    setParams('aaa', 111);
  };

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      <PrimaryText>{i18n.t('transactionTableTitle')}</PrimaryText>
      <ScrollView>
        {props.tokensList.map((token, index) => {
          const borderTopWidth = index !== 0 ? StyleSheet.hairlineWidth : 0;
          return (
            <TouchableOpacity
              key={`asset_${index}`}
              style={StyleSheet.flatten([styles.assetRow, {borderTopWidth}])}
              onPress={onTokenSelected || props.onTokenSelected}>
              <PrimaryText>{token.name}</PrimaryText>
              <PrimaryText>{token.value}</PrimaryText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

TokensList.defaultProps = {
  tokensList: [{name: 'ASK', value: '1.23123'}, {name: 'USDT', value: '333'}],
  onTokenSelected: () => undefined,
  wrapperStyle: undefined,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetRow: {
    height: vw(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceN,
    borderColor: colors.divider,
  },
});

export default TokensList;
