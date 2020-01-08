/**
 * @author: Xu Ke
 * @date: 2020/1/8 5:58 PM
 * @Description: 404页面
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';

class RootError extends React.Component {
  back = () => {
  };

  render() {
    return (
      <View className="root-error-page-wrapper">
        <View className="error-code">
          <PrimaryText>404</PrimaryText>
        </View>
        <View className="error-text">
          <PrimaryText>抱歉，页面走丢了</PrimaryText>
          <PrimaryText onPress={this.back}>点击这里</PrimaryText>
          <PrimaryText>返回</PrimaryText>
        </View>
      </View>
    )
  }
}
export default RootError;
