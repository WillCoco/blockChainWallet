import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import colors from '../../helpers/colors';
import {useSelector, useDispatch} from 'react-redux';
import {wallet} from '../../redux/actions';
import _get from 'lodash/get';

export default () => {
  const walletsList = useSelector(state => _get(state, ['wallets', 'walletsList']) || []);
  const currentWallet = useSelector(state => _get(state, ['wallets', 'currentWallet'])) || {};
  const dispatch = useDispatch();

    // 切换钱包
  const checkWallet = address => {
    dispatch(wallet.updateCurrentWallet(address));
  };

  return (
    <>
      {
        walletsList.map((item) => {
          return (
            <TouchableOpacity 
              style={styles.accountItem} 
              key={item.address}
              onPress={() => checkWallet(item.address)}
            >
              <PrimaryText>{item.name}</PrimaryText>
              {
                item.address === currentWallet.address && <Icon name='check' color={colors.theme} />
              }
            </TouchableOpacity>
          )
        })
      }
    </>
  );
};

const styles = StyleSheet.create({
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});