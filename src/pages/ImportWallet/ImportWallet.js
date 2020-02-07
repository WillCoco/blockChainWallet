import React from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import {scale} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
// import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {vw, metrics} from '../../helpers/metric';
import {getMnemonicString} from '../../helpers/utils/getMnemonic';
import FormRow from '../../components/FormRow';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import {StackActions, NavigationActions} from 'react-navigation';

const ImportWallet = () => {
  const {dispatch: navDispatch} = useNavigation();
  const dispatch = useDispatch();

  // 导入助记词
  const [mnemonicInput, setMnemonicInput] = React.useState();

  // 钱包名
  const [name, setName] = React.useState();

  // 密码
  const [password, setPassword] = React.useState();
  const setPasswordWithValid = v => {
    setPassword(v);
  };

  // 确认密码
  const [confirmPassword, setConfirmPassword] = React.useState();

  // 备注
  const [prompt, setPrompt] = React.useState();

  /**
   * 点击下一步
   */
  const onButtonPress = () => {
    // console.log(mnemonicInput, 'mnemonicInput');
    // console.log(name, 'name');
    // console.log(password, 'password');
    // console.log(confirmPassword, 'confirmPassword');
    // console.log(prompt, 'prompt');
    if (!name) {
      Toast.show({data: i18n.t('invalidName')});
      return;
    }

    if (
      !password ||
      !confirmPassword ||
      confirmPassword !== password ||
      password < 2
    ) {
      Toast.show({data: i18n.t('invalidPassword')});
      return;
    }

    submit();
  };

  /**
   * 聚焦input
   */
  let input = React.useRef();
  const focus = () => {
    input && input.focus();
  };

  const submit = async () => {
    // 校验助记词有效性
    const formattedMnemonicString = getMnemonicString(mnemonicInput);
    const isValidMnemonic = await dispatch(
      wallet.validMnemonic(formattedMnemonicString),
    );

    if (!isValidMnemonic) {
      Toast.show({data: i18n.t('invalidMnemonic')});
      return;
    }

    // 恢复钱包
    WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.RECOVER_WALLET_FROM_MNEMONIC,
          name,
          mnemonic: formattedMnemonicString,
          password,
          prompt,
        },
        callback: v => {
          if (v) {
            dispatch(wallet.addOrUpdateAWallet(v));
            Toast.show({data: i18n.t('importSuccess')});
            // goBack();
            // popToTop('Main');

            // 重置路由，进入首页
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Main'})],
            });
            navDispatch(resetAction);
          } else {
            Toast.show({data: i18n.t('importFailed')});
          }
        },
      },
    ]);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.wrapper}>
      <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
      <KeyboardAvoidingView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={focus}>
          <View style={styles.mnemonicInputWrapper}>
            <TextInput
              ref={v => (input = v)}
              multiline
              numberOfLines={4}
              placeholder={i18n.t('mnemonicInputPlaceholder')}
              value={mnemonicInput}
              onChangeText={setMnemonicInput}
              style={styles.mnemonicInput}
            />
          </View>
        </TouchableWithoutFeedback>

        {/*<TextInput*/}
          {/*multiline*/}
          {/*numberOfLines={4}*/}
          {/*placeholder={i18n.t('mnemonicInputPlaceholder')}*/}
          {/*value={mnemonicInput}*/}
          {/*onChangeText={setMnemonicInput}*/}
          {/*style={styles.mnemonicInputWrapper}*/}
          {/*textAlignVertical="middle"*/}
         {/*/>*/}
        <FormRow
          title={i18n.t('createWalletName')}
          placeholder={i18n.t('createWalletNamePlaceholder')}
          bottomDivider
          value={name}
          onChangeText={setName}
          maxLength={12}
          inputStyle={{paddingLeft: '45%'}}
         />
        <FormRow
          title={i18n.t('createWalletPassword')}
          placeholder={i18n.t('createWalletPasswordPlaceholder')}
          bottomDivider
          value={password}
          maxLength={20}
          onChangeText={setPassword}
          inputStyle={{paddingLeft: '45%'}}
          secureTextEntry
         />
        <FormRow
          title={i18n.t('createWalletConfirmPassword')}
          placeholder={i18n.t('createWalletConfirmPasswordPlaceholder')}
          bottomDivider
          value={confirmPassword}
          maxLength={20}
          onChangeText={setConfirmPassword}
          inputStyle={{paddingLeft: '45%'}}
          secureTextEntry
         />
        {/*<FormRow*/}
          {/*title={i18n.t('createWalletPrompt')}*/}
          {/*bottomDivider*/}
          {/*placeholder={i18n.t('createWalletPromptPlaceholder')}*/}
          {/*value={prompt}*/}
          {/*onChangeText={setPrompt}*/}
          {/*inputStyle={{paddingLeft: '45%'}}*/}
         {/*/>*/}
        <Button
          iconRight
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('next')}
          onPress={onButtonPress}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: colors.pageBackground,
    flex: 1,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: vw(10),
    alignSelf: 'center',
  },
  mnemonicInputWrapper: {
    paddingHorizontal: metrics.spaceS,
    margin: metrics.spaceS,
    height: '20%',
    minHeight: 120,
    justifyContent: 'center',
    backgroundColor: colors.pageBackground,
  },
  mnemonicInput: {
    fontSize: scale(14),
    lineHeight: scale(20),
  },
});

export default ImportWallet;
