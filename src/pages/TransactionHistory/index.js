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
import {useNavigation, useFocusEffect} from 'react-navigation-hooks';
import {vh, vw, metrics} from '../../helpers/metric';
import {getHistory} from '../../helpers/chain33';
import PagingList from '../../components/PagingList';
import NavBar from '../../components/NavBar';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import TxRow from '../../components/TxRow/TxRow';
import PageWrapper from '../../components/PageWrapper';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';

export default () => {
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  const {navigate} = useNavigation();

  /**
   * 刷新方法
   */
  const refresh = React.useRef();

  /**
   * 渲染行
   */
  const renderItem = item => {
    return (
      <TxRow
        {...item}
        onPress={() =>
          navigate({routeName: 'DealDetails', params: {txInfo: item}})
        }
      />
    );
  };

  /**
   * 下拉刷新
   */
  let onRefresh = React.useRef(() => {
    // console.log(currentWallet, 'currentWallet.addressvvvv');
    return getHistory({
      address: currentWallet.address,
      start: 0,
      size: 14,
    });
  });

  React.useEffect(() => {
    onRefresh.current = () => {
      // console.log(currentWallet.address, 'currentWallet.address');
      return getHistory({
        address: currentWallet.address,
        start: 0,
        size: 14,
      });
    };
  }, [currentWallet]);

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
    <PageWrapper
      style={{
        backgroundColor: colors.theme,
      }}
      statusBarProps={{
        backgroundColor: colors.theme,
        barStyle: 'light-content',
      }}>
      <NavBar
        title={currentWallet && currentWallet.name}
        rightElement={
          <Icon
            name="wallet-outline"
            type="material-community"
            color={colors.textWhite}
          />
        }
        onRight={() =>
          navigate({
            routeName: 'SwitchAccount',
            params: {onBackCallback: refresh.current},
          })
        }
        // safeViewStyle={{paddingTop: 0}}
      />
      <PhoneShapeWrapper styles={{marginTop: metrics.spaceN}}>
        <PagingList
          size={14}
          //item显示的布局
          renderItem={({item}) => renderItem(item)}
          //下拉刷新相关
          onRefresh={v => onRefresh.current(v)}
          //加载更多
          onEndReached={onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
        />
      </PhoneShapeWrapper>
    </PageWrapper>
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
