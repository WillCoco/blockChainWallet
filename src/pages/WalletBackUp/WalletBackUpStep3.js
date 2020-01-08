import React from 'react';
import {StyleSheet, View, LayoutAnimation} from 'react-native';
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
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions/';

export default () => {
  const {replace} = useNavigation();
  const dispatch = useDispatch();
  const [wordsInput, setWordsInput] = React.useState([]);

  const mnemonic = useSelector(state => _get(state.wallets, ['tempMnemonic']));

  // 乱序助记词
  const unorderedMnemonic = React.useRef(_shuffle(mnemonic));
  // const unorderedMnemonic = React.useRef(mnemonic);

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
      Toast.show({data: i18n.t('backupSuccess')});
    } else {
      // 提示
      Toast.show({data: i18n.t('backupFailed')});
    }
  };

  const reset = () => {
    LayoutAnimation.easeInEaseOut();

    // 重置打印面板
    setWordsInput([]);
    // 重置
    setRestTimes(++restTimes);
  };

  // onWordPress
  const onWordPress = words => {
    LayoutAnimation.easeInEaseOut();
    setWordsInput(words);
  };

  return (
    <View style={styles.wrapper}>
      <MnemonicPrint
        data={wordsInput || ''}
        wrapperStyle={styles.mnemonicPrintWrapper}
      />
      <PrimaryText style={styles.title}>
        {i18n.t('backupGuideText')}
      </PrimaryText>
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
          type="outline"
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
    marginHorizontal: '2%',
    marginTop: metrics.spaceN,
    backgroundColor: colors.pageBackground,
  },
  mnemonicInputWrapper: {
    marginHorizontal: '2%',
  },
  title: {
    marginTop: metrics.spaceN,
    marginBottom: metrics.spaceS,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vw(10),
    marginHorizontal: '4%',
  },
  btnContainerStyle: {
    width: '44%',
    alignSelf: 'center',
  },
});
