/**
 * @author: Xu Ke
 * @date: 2020/2/13 2:40 PM
 * @Description: 闪兑换
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {vh} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import {dappDispatch, VIEW_STATUS, actionTypes} from '../../components/DappsWebview';
import {dapps} from '../../config';

console.log(dapps.otc, 'dapps.otc');

console.log(VIEW_STATUS, dappDispatch, 123123)
const Exchange = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <PrimaryText onPress={() => dappDispatch({type: actionTypes.OPEN, payload: {uri: dapps.otc.url}})}>闪兑换</PrimaryText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
  },
  contentWrapper: {
    backgroundColor: colors.pageBackground,
  },
});

const safeExchange = props => safePage(Exchange, props);

export default safeExchange;
