import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {PrimaryText} from 'react-native-normalization-text';
import {vh, vw, metrics} from '../../helpers/metric';
import {getHistory} from '../../helpers/chain33';
import PagingList from '../../components/PagingList';
import NavBar from '../../components/NavBar';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {useNavigation} from 'react-navigation-hooks';

export default () => {
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  const {navigate} = useNavigation();

  /**
   * 渲染行
   */
  const renderItem = item => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.left}>
          <Icon name="subdirectory-arrow-right" />
          <View>
            <PrimaryText>{item.name}</PrimaryText>
            <PrimaryText>{item.amount}</PrimaryText>
          </View>
        </View>
        <PrimaryText style={styles.right}>{item.time}</PrimaryText>
      </View>
    );
  };

  /**
   * 下拉刷新
   */
  const onRefresh = () => {
    return getHistory({
      address: currentWallet.address,
      start: 0,
      size: 14,
    });
  };

  /**
   * 加载更多
   */
  const onEndReached = (page, size) => {
    return getHistory({
      address: currentWallet.address,
      start: page.current * size,
      size,
    });
  };

  return (
    <>
      <NavBar
        title={currentWallet && currentWallet.name}
        rightElement={
          <Icon
            name="wallet-outline"
            type="material-community"
            color={colors.textWhite}
          />
        }
        onRight={() => navigate('SwitchAccount')}
      />
      <PagingList
        size={14}
        //item显示的布局
        renderItem={({item}) => renderItem(item)}
        //下拉刷新相关
        onRefresh={onRefresh}
        //加载更多
        onEndReached={onEndReached}
        // ItemSeparatorComponent={separator}
        keyExtractor={(item, index) => 'index' + index + item}
        initialNumToRender={14}
      />
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: vw(2),
  },
  left: {
    flexDirection: 'row',
  },
});
