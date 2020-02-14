/**
 * @author: Xu Ke
 * @date: 2020/2/14 10:45 AM
 * @Description: 分页、tab组件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {H2, H4} from 'react-native-normalization-text';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import colors from '../../helpers/colors';
import {metrics, DEVICE_WIDTH} from '../../helpers/metric';
// import i18n from '../../helpers/i18n';
import PagingList from '../../components/PagingList';
import safePage from '../../helpers/safePage';

const TabviewList = props => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(props.tabs);

  /**
   * 渲染每一页, 每一页是下拉刷新分页器
   */
  let map = {};
  props.tabs.forEach(tab => {
    map[tab.key] = () => {
      return (
        <PagingList
          size={tab.size}
          //item显示的布局
          renderItem={tab.renderItem}
          //下拉刷新相关
          onRefresh={tab.onRefresh}
          //加载更多
          onEndReached={tab.onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={tab.initialNumToRender}
        />
      );
    };
  });

  const renderScene = SceneMap(map);

  return (
    <View style={styles.wrapper}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: DEVICE_WIDTH}}
        style={{}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colors.theme}}
            style={{
              backgroundColor: 'white',
              borderColor: 'red',
              marginTop: 10,
              elevation: 0,
            }}
            inactiveColor={colors.textDark1}
            activeColor={colors.textPrimary}
            indicatorContainerStyle={{}}
            tabStyle={{paddingHorizontal: 0}}
            labelStyle={{marginHorizontal: 0}}
            contentContainerStyle={{borderColor: 'blue'}}
          />
        )}
      />
    </View>
  );
};

const safeTabviewList = props => safePage(TabviewList, props);

safeTabviewList.defaultProps = {
  tabs: [
    {
      key: '1',
      title: '测试1',
      size: 14,
      initialNumToRender: 14,
      renderItem: () => <H4>row</H4>,
      onRefresh: () => {},
      onEndReached: () => {},
    },
    {
      key: '2',
      title: '测试2',
      size: 14,
      initialNumToRender: 14,
      renderItem: () => <H4>row1</H4>,
      onRefresh: () => {},
      onEndReached: () => {},
    },
  ],
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

});

export default safeTabviewList;