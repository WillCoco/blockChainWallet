/**
 * @author: Xu Ke
 * @date: 2019/12/30 11:23 AM
 * @Description: 助记词展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {PrimaryText, scale} from 'react-native-normalization-text';
import {vw} from '../../helpers/metric/index';
import colors from '../../helpers/colors';

const Word = props => {
  // 助记词列表
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.wordWrapper, props.style])}
      disabled={props.isWordDisabled}
      onPress={props.onWordPress}>
      <View style={StyleSheet.flatten([styles.word, props.wordStyle])}>
        <PrimaryText
          style={StyleSheet.flatten([{color: colors.theme}, props.textStyle])}>
          {props.word}
        </PrimaryText>
      </View>
    </TouchableOpacity>
  );
};

Word.defaultProps = {
  word: '',
  style: undefined,
  onWordPress: undefined,
  isWordDisabled: false,
  wordStyle: null,
};

const styles = StyleSheet.create({
  wordWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    marginVertical: scale(6),
    borderRadius: vw(1),
    minWidth: '24%',
  },
  word: {
    backgroundColor: colors.themeOpacity,
    width: '100%',
    alignItems: 'center',
    color: colors.theme,
    paddingVertical: scale(3),
  },
});

export default Word;
