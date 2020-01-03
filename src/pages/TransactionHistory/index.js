import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import {Icon, RefreshControl} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {vh, vw, metrics} from '../../helpers/metric';

const mockList = [
  {
    id: 0,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },
  {
    id: 1,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',

  },
  {
    id: 2,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',

  },
  {
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },
  {
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },
  {
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },
  {
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },
  {
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },{
    id: 3,
    name: '12123',
    amount: 1231232135,
    time: 111,
    type: 'transfer',
  },

]

export default () => {
  const [empty, setEmpty] = React.useState(true);

  const renderItem = item => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.left}>
          <Icon name='subdirectory-arrow-right'/>
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
   * 分割线
   */
  const separator = () => {
    return <View style={{height: 1, backgroundColor: '#999999'}}/>;
  }

  return (
    <FlatList
      style={styles.flatList}
      data={mockList}
      //item显示的布局
      renderItem={({item}) => renderItem(item)}
      // 空布局
      ListEmptyComponent={<PrimaryText style={styles.empty}>空空如也~</PrimaryText>}
      //下拉刷新相关
      // onRefresh={() => console.log(1)}
      // refreshControl={
      //   <RefreshControl
      //     title={'Loading'}
      //     colors={['red']}
      //     // refreshing={this.state.isRefresh}
      //     onRefresh={() => {
      //         // this._onRefresh();
      //     }}
      //   />
      // }
      refreshing={true}
      //加载更多
      onEndReached={() => console.log(1)}
      onEndReachedThreshold={10}
      ItemSeparatorComponent={separator}
      keyExtractor={(item, index) => "index" + index + item}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: vw(2),
  },  
  left: {
    flexDirection: 'row',
  }
});