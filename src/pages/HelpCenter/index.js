import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vh} from '../../helpers/metric';
import colors from '../../helpers/colors';

export default () => {
  return (
    <>
      <PrimaryText>{i18n.t('helpCenter')}</PrimaryText>
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    color: colors.pageBackground,
    textAlign: 'center',
    height: vh(100),
  },
});
