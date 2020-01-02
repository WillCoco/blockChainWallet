import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import _get from 'lodash/get';
import useI18n from '../hooks/useI18n';
import {vh, vw, metrics} from '../helpers/metric/index';
import colors from '../helpers/colors/index';

const TokensList = props => {
  const {goBack} = useNavigation();

  const onSelectToken = token => {
    goBack();
    props.onSelectToken(token);
  };

  const tokenslist = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  console.log(tokenslist, 'tokenslist');

  return (
    <>
      <ScrollView>
        {tokenslist.map((token, index) => {
          const borderTopWidth = index !== 0 ? StyleSheet.hairlineWidth : 0;
          return (
            <TouchableOpacity
              key={`asset_${index}`}
              style={StyleSheet.flatten([styles.assetRow, {borderTopWidth}])}
              onPress={() => onSelectToken(token)}>
              <PrimaryText>{token.symbol}</PrimaryText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

TokensList.defaultProps = {
  tokensList: [],
  onTokenSelected: () => undefined,
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

export default TokensList;
