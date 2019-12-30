import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
import _shuffle from 'lodash/shuffle';
import colors from '../../helpers/colors';
import {vw, metrics} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import {MnemonicInput, MnemonicPrint} from '../../components/mnemonic';
import mnemonicTypes from '../../components/mnemonic/mnemonicTypes';
import {wallet} from '../../redux/actions/';

export default () => {
  const {goBack, replace} = useNavigation();
  const dispatch = useDispatch();
  const [wordsInput, setWordsInput] = React.useState([]);

  const mnemonic = useSelector(state =>
    _get(state.wallets, ['currentWallet', 'tempMnemonic']),
  );

  // 乱序助记词
  // const unorderedMnemonic = React.useRef(_shuffle(mnemonic));
  const unorderedMnemonic = React.useRef(mnemonic);

  // 助记词重置次数
  let [restTimes, setRestTimes] = React.useState(0);

  const complete = () => {
    // 校验
    const mnemonic = wordsInput.join(' ');
    const pass = dispatch(wallet.validTempMnemonic(mnemonic));

    console.log(pass, 'pass');
    if (pass) {
      replace('Main');
      // alert('备份成功');
    } else {
      // 提示
      alert('备份失败');
    }
  };

  const reset = () => {
    // 重置打印面板
    setWordsInput([]);
    // 重置
    setRestTimes(++restTimes);
  };

  // onWordPress
  const onWordPress = words => {
    setWordsInput(words);
  };

  return (
    <View style={styles.wrapper}>
      <MnemonicPrint
        data={wordsInput || ''}
        wrapperStyle={styles.mnemonicPrintWrapper}
      />
      <PrimaryText style={styles.title}>请按顺序依次点击，还原助记词：</PrimaryText>
      <MnemonicInput
        data={unorderedMnemonic.current || ''}
        wrapperStyle={styles.mnemonicInputWrapper}
        onWordPress={onWordPress}
        mnemonicType={mnemonicTypes.INPUT}
        restTimes={restTimes}
      />
      <View style={styles.buttonsWrapper}>
        <Button
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('complete')}
          onPress={complete}
        />
        <Button
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('reset')}
          onPress={reset}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: metrics.spaceS,
  },
  mnemonicPrintWrapper: {
    height: vw(36),
    marginHorizontal: '2%',
    marginTop: metrics.spaceN,
    backgroundColor: colors.pageBackground,
  },
  mnemonicInputWrapper: {
    marginHorizontal: '2%',
  },
  title: {
    marginVertical: metrics.spaceL,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginHorizontal: '4%',
  },
  btnContainerStyle: {
    width: '44%',
    alignSelf: 'center',
  },
});
