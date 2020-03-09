import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {Icon, Divider} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {metrics} from '../../helpers/metric';
import {useSelector, useDispatch} from 'react-redux';
import {wallet} from '../../redux/actions';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import PageWrapper from '../../components/PageWrapper';

export default () => {
  const walletsList = useSelector(
    state => _get(state, ['wallets', 'walletsList']) || [],
  );
  const currentWallet =
    useSelector(state => _get(state, ['wallets', 'currentWallet'])) || {};
  const dispatch = useDispatch();
  const {goBack} = useNavigation();

  // 切换钱包
  const checkWallet = address => {
    dispatch(wallet.updateCurrentWallet(address));
    requestAnimationFrame(() => {
      goBack();
    });
  };

  return (
    <PageWrapper style={{backgroundColor: colors.theme}}>
      <PhoneShapeWrapper style={{marginTop: metrics.spaceN}}>
        {walletsList.map((item, index) => {
          return (
            <View style={styles.walletItem} key={item.address}>
              {index !== 0 && (
                <Divider style={{backgroundColor: colors.divider}} />
              )}
              <TouchableOpacity
                style={styles.accountItem}
                onPress={() => checkWallet(item.address)}>
                <PrimaryText>{item.name}</PrimaryText>
                {item.address === currentWallet.address && (
                  <Icon name="check" color={colors.theme} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </PhoneShapeWrapper>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
  },
  walletItem: {
    paddingHorizontal: metrics.spaceS,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});