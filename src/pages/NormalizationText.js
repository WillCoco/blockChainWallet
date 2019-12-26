/**
 * @author: Xu Ke
 * @date: 2019/12/20 5:26 PM
 * @Description: 规范化字体
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  H1,
  H2,
  H3,
  H4,
  PrimaryText,
  SmallText,
  TinyText,
} from 'react-native-normalization-text';

const NormalizationText = () => {
  return (
    <>
      <H1>规范化字体111</H1>
      <H2>规范化字体</H2>
      <H3>规范化字体</H3>
      <H4>规范化字体</H4>
      <PrimaryText>规范化字体</PrimaryText>
      <SmallText>规范化字体</SmallText>
      <TinyText>规范化字体</TinyText>
    </>
  );
};

NormalizationText.navigationOptions = {
  title: 'title',
};

export default NormalizationText;
