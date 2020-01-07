/**
 * @author: Xu Ke
 * @date: 2019/12/30 11:23 AM
 * @Description: 助记词展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import _filter from 'lodash/filter';
import {PrimaryText} from 'react-native-normalization-text';
import {vw} from '../../helpers/metric/index';
import colors from '../../helpers/colors';
import Word from './Word';

const Mnemonic = props => {
  // 解析助记词
  const getMnemonicArray = data => {
    if (typeof data === 'string') {
      return data.trim().split(/\s+/);
    }

    return _filter(data, o => !/^\s+$/.test(o));
  };

  // 助记词列表
  const mnemonicArray = getMnemonicArray(props.data);

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      {mnemonicArray.map((word, index) => {
        return (
          <Word
            key={`word_${index}`}
            isWordDisabled
            word={word}
            style={StyleSheet.flatten([styles.wordWrapper])}
          />
        );
      })}
    </View>
  );
};

Mnemonic.defaultProps = {
  mnemonicType: '',
  data: '',
  wrapperStyle: undefined,
  onWordPress: undefined,
  restTimes: 0, // 重置次数
};

const styles = StyleSheet.create({
  wrapper: {
    flex: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: vw(2),
  },
  wordWrapper: {
    paddingHorizontal: vw(4),
    paddingVertical: vw(0.5),
    marginHorizontal: vw(3),
    marginVertical: vw(1.5),
    backgroundColor: colors.theme,
    borderRadius: vw(0.5),
  },
  input: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '24%',
    height: '100%',
  },
});

export default React.forwardRef((props, ref) => (
  <Mnemonic {...props} ref={ref} />
));
