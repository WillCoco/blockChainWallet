import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
<<<<<<< HEAD
import {useNavigation} from 'react-navigation-hooks';
import {Icon} from 'react-native-elements';
=======
import {Icon, Divider} from 'react-native-elements';
>>>>>>> 995b9af4701d7b0049dc65f086fa37822da5a637
import {PrimaryText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {metrics} from '../../helpers/metric';
import {useSelector, useDispatch} from 'react-redux';
import {wallet} from '../../redux/actions';

export default () => {
  const walletsList = useSelector(
    state => _get(state, ['wallets', 'walletsList']) || [],
  );
  const currentWallet =
    useSelector(state => _get(state, ['wallets', 'currentWallet'])) || {};
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  // 切换钱包
  const checkWallet = address => {
    dispatch(wallet.updateCurrentWallet(address));
    navigate('TransactionHistory');
  };

  return walletsList.map((item, index) => {
    return (
      <View style={styles.wrapper}>
        {index !== 0 && <Divider style={{backgroundColor: colors.divider}} />}
        <TouchableOpacity
          style={styles.accountItem}
          key={item.address}
          onPress={() => checkWallet(item.address)}>
          <PrimaryText>{item.name}</PrimaryText>
          {item.address === currentWallet.address && (
            <Icon name="check" color={colors.theme} />
          )}
        </TouchableOpacity>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: metrics.spaceS
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});