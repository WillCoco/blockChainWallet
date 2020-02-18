import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useSelector} from 'react-redux';
import {useFocusEffect, useIsFocused} from 'react-navigation-hooks';
import _get from 'lodash/get';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {vw} from '../../helpers/metric';
import Empty from '../../components/Empty';

const PagingList = props => {
  const [isRefreshing, setIsRefreshing] = React.useState(false); // 下拉刷新
  const [isLoading, setIsLoading] = React.useState(false); // 加载中
  const [listData, setListData] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  const [noMore, setNoMore] = React.useState();

  /**
   * 分页
   */
  let size = props.size;
  let page = React.useRef(props.initPage);

  /**
   * 下拉刷新
   */
  const onRefresh = async ({withRefreshAnimation} = {}) => {
    if (withRefreshAnimation) {
      setIsRefreshing(true);
    }
    setNoMore(false);
    setEmpty(false);
    page.current = 0;
    const {result, code} = (await props.onRefresh(page, size)) || {};
    setIsRefreshing(false);
    console.log(result, '====');
    setListData(result || []);

    if (result) {
      if (result.length < size) {
        setNoMore(true);
      }
      setListData(result);
    } else {
      setListData([]);
      setEmpty(true);
    }
  };

  /**
   * 加载更多
   */
  const onEndReached = async () => {
    setIsLoading(true);
    page.current++;
    const {result, code} = await props.onEndReached(page, size);

    if (!result || result.length === 0) {
      page.current--;
      setNoMore(true);
    } else {
      setListData(listData => {
        console.log(result, 'r.result');
        return [...listData, ...result];
      });
    }
    setIsLoading(false);
  };

  /**
   * 加载时候 获取一次数据
   */
  // React.useEffect(() => {
  //   if (props.isInitGetData) {
  //     onRefresh();
  //   }
  // }, []);

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  useFocusEffect(
    React.useCallback(() => {
      onRefresh(currentWallet.address);
    }, []),
  );

  /**
   * 列表尾部
   */
  const ListFooterComponent = () => {
    if (noMore) {
      return (
        <View style={styles.listFooterWrapper}>
          <PrimaryText>{i18n.t('noMore')}</PrimaryText>
        </View>
      );
    }

    if (isLoading || isRefreshing) {
      return (
        <View style={styles.listFooterWrapper}>
          <ActivityIndicator style={{marginRight: 8}} />
          <PrimaryText>{i18n.t('loading')}</PrimaryText>
        </View>
      );
    }

    return <View style={StyleSheet.flatten([styles.listFooterWrapper, {borderTopWidth: 0}])} />;
  };

  /**
   * 列表空列表
   */
  const ListEmptyComponent = () => {
    if (empty) {
      return <Empty />;
    }
    return null;
  };

  // console.log(listData, 'listDatalistData');

  return (
    <View style={StyleSheet.flatten([styles.flatList, {backgroundColor: empty ? '#fff' : colors.pageBackground}])}>
      <FlatList
        refreshing
        data={listData}
        initialNumToRender={props.initialNumToRender}
        //item显示的布局
        renderItem={props.renderItem}
        // 空布局
        ListEmptyComponent={ListEmptyComponent}
        //下拉刷新相关
        refreshControl={
          <RefreshControl
            // title={'Loading'}
            colors={[colors.theme]}
            refreshing={isRefreshing}
            onRefresh={() => onRefresh({withRefreshAnimation: true})}
          />
        }
        ListFooterComponent={ListFooterComponent}
        //加载更多
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        ItemSeparatorComponent={
          props.showItemSeparator
            ? () => <Divider style={styles.divider} />
            : null
        }
        keyExtractor={(item, index) => 'index' + index + item}
      />
    </View>
  );
};

PagingList.defaultProps = {
  isInitGetData: true, // 加载组件先获取一次数据
  renderItem: () => <PrimaryText>请指定renderItem</PrimaryText>,
  size: 10,
  initPage: 0,
  onRefresh: () => undefined,
  onEndReached: () => undefined,
  initialNumToRender: undefined,
  showItemSeparator: false,
};

export default PagingList;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  listFooterWrapper: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.divider,
  },
  divider: {
    marginHorizontal: vw(4),
    backgroundColor: colors.divider,
  },
});
