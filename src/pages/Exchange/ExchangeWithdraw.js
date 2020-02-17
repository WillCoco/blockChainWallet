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
import {StyleSheet, View} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import safePage from '../../helpers/safePage';
import TabviewList from '../../components/TabviewList';


const Withdraw = () => {
  useSelector(state => _get(state, ['appSetting', 'language']));

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 兑换
  const onPressExchange = () => {
    alert('');
  };

  return (
    <View style={{}}>
      <View>
        <PrimaryText>{i18n.t('frozen')}</PrimaryText>
        <PrimaryText>{i18n.t('available')}</PrimaryText>
      </View>
      <SmallText>{i18n.t('frozen')} {}</SmallText>
      <View>
        <SmallText>{i18n.t('available')} {}</SmallText>
        <Button
          iconRight
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('withdraw')}
          onPress={onPressExchange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

const safeWithdraw = props => safePage(Withdraw, props);

export default safeWithdraw;
