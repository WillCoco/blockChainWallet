import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {metrics, vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import TxsList from '../../components/TxsList';

const AssetDetail = props => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <H2>{props.token.amount}</H2>
        <PrimaryText>¥ {props.token.amount}</PrimaryText>
      </View>
      <TxsList wrapperStyle={{marginTop: metrics.spaceS}} />
      <View style={styles.buttonsWrapper}>
        <Button
          title={i18n.t('transfer')}
          containerStyle={styles.leftBtnContainerStyle}
          buttonStyle={styles.leftButtonStyle}
          onPress={() => navigate('Transfer')}
        />
        <Button
          title={i18n.t('collect')}
          containerStyle={styles.rightBtnContainerStyle}
          buttonStyle={{borderRadius: 0, height: vw(12)}}
          onPress={() => navigate('Collect')}
        />
      </View>
    </View>
  );
};

AssetDetail.defaultProps = {
  token: {amount: 1},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  headerWrapper: {
    backgroundColor: '#fff',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBtnContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 0,
  },
  leftButtonStyle: {
    borderRadius: 0,
    backgroundColor: '#4EC059',
    height: vw(12),
  },
  rightBtnContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 0,
  },
  rightButtonStyle: {
    borderRadius: 0,
    backgroundColor: '#4EC059',
    height: vw(12),
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
});

export default AssetDetail;
