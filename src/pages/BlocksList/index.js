import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import useI18n from '../../hooks/useI18n';
import {vh, vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';

const TokensList = props => {
  const {goBack, setParams} = useNavigation();

  const onBlockSelected = () => {
    goBack();
    setParams('aaa', 111);
  };

  return (
    <>
      <ScrollView>
        {props.blocksList.map((block, index) => {
          const borderTopWidth = index !== 0 ? StyleSheet.hairlineWidth : 0;
          return (
            <TouchableOpacity
              key={`block_${index}`}
              style={StyleSheet.flatten([styles.blockRow, {borderTopWidth}])}
              onPress={onBlockSelected || props.onBlockSelected}>
              <PrimaryText>{block.name}</PrimaryText>
              <PrimaryText>{block.value}</PrimaryText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

TokensList.defaultProps = {
  blocksList: [{name: 'ASK', value: ''}, {name: 'USDT', value: ''}],
  onTokenSelected: () => undefined,
};

const styles = StyleSheet.create({
  blockRow: {
    height: vw(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceN,
    borderColor: colors.divider,
  },
});

export default TokensList;
