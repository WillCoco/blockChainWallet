/**
 * @author: Xu Ke
 * @date: 2019/12/30 11:23 AM
 * @Description: 助记词展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {vw} from '../../helpers/metric/index';
import colors from '../../helpers/colors';

const Word = props => {
  // 助记词列表
  return (
    <TouchableHighlight
      style={StyleSheet.flatten([styles.wordWrapper, props.style])}
      disabled={props.isWordDisabled}
      onPress={props.onWordPress}>
      <PrimaryText color="white">{props.word}</PrimaryText>
    </TouchableHighlight>
  );
};

Word.defaultProps = {
  word: '',
  style: undefined,
  onWordPress: undefined,
  isWordDisabled: false,
};

const styles = StyleSheet.create({
  wordWrapper: {
    paddingHorizontal: vw(4),
    paddingVertical: vw(0.5),
    marginHorizontal: vw(3),
    marginVertical: vw(1.5),
    backgroundColor: colors.theme,
    borderRadius: vw(0.5),
  },
});

export default Word;
