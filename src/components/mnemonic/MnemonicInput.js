/**
 * @author: Xu Ke
 * @date: 2019/12/30 11:07 AM
 * @Description: 展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import _filter from 'lodash/filter';
import _times from 'lodash/times';
import {PrimaryText} from 'react-native-normalization-text';
import {vw} from '../../helpers/metric/index';
import colors from '../../helpers/colors';
import types from './mnemonicTypes';
import Word from './Word';

const Mnemonic = props => {
  const {mnemonicType, restTimes} = props;
  // 解析助记词
  const getMnemonicArray = data => {
    if (typeof data === 'string') {
      return data.trim().split(/\s+/);
    }

    return _filter(data, o => !/^\s+$/.test(o));
  };

  // 助记词列表
  const mnemonicArray = getMnemonicArray(props.data);

  // 输出的选中助记词列表
  const selectedArray = React.useRef([]);

  // 助记词是否点击，Array<boolean>
  const [wordsArray, setWordsArray] = React.useState(
    _times(mnemonicArray.length, () => false),
  );

  // 副作用
  // React.useEffect(() => {
  //   onWordPressProps && onWordPressProps(selectedArray.current);
  //   console.log('选单词-----');
  // }, [wordsArray, onWordPressProps]);

  // 重置
  React.useEffect(() => {
    selectedArray.current = [];
    setWordsArray(_times(mnemonicArray.length, () => false));
    // console.log('重置-----');
  }, [restTimes, mnemonicArray.length]);

  // console.log(wordsArray, 'wordsArray====');

  const onWordPress = (word, index) => {
    setWordsArray(selected => {
      const newSelectedArray = [...selected];
      newSelectedArray[index] = !newSelectedArray[index];

      // 输出选中助记词
      selectedArray.current = [...selectedArray.current, word];
      props.onWordPress && props.onWordPress(selectedArray.current);

      // console.log(selectedArray.current, 'selectedArray.current')
      return newSelectedArray;
    });
  };

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      {mnemonicArray.map((word, index) => {
        const textStyle = props.mnemonicType === types.INPUT &&
          wordsArray[index] && {backgroundColor: '#ccc'};

        return (
          <Word
            key={`word_${index}`}
            isWordDisabled={wordsArray[index]}
            word={word}
            style={StyleSheet.flatten([styles.wordWrapper, textStyle])}
            onWordPress={() => onWordPress(word, index)}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
