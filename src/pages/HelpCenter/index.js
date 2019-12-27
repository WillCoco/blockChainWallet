import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';

export default () => {

  const [empty, setEmpty] = React.useState(true);
  return (
    <>
      {
        empty
        && <PrimaryText style={styles.empty}>哎呀，页面跑丢了~</PrimaryText>
        || <Text>{i18n.t('helpCenter')}</Text>
      }
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
