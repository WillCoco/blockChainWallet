import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import useI18n from '../hooks/useI18n';
import {vh, vw, metrics} from '../helpers/metric/index';
import colors from '../helpers/colors/index';

const BlocksList = props => {
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
              key={`asset_${index}`}
              style={StyleSheet.flatten([styles.assetRow, {borderTopWidth}])}
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

BlocksList.defaultProps = {
  blocksList: [{name: 'ASK', value: '1.23123'}, {name: 'USDT', value: '333'}],
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

export default BlocksList;
