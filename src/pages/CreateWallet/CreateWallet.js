import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import _throttle from 'lodash/throttle';
import {Button, CheckBox} from 'react-native-elements';
import {SmallText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import colors from '../../helpers/colors';
import {chainInfo} from '../../config/';
import FormRow from '../../components/FormRow';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';

const CreateWallet = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  // 钱包名
  const [name, setName] = React.useState();

  // 密码
  const [password, setPassword] = React.useState();

  // 确认密码
  const [confirmPassword, setConfirmPassword] = React.useState();

  // 是否同意条款
  const [agreementChecked, setAgreementChecked] = React.useState(false);

  // todo: 备注
  // const [prompt, setPrompt] = React.useState();

  /**
   * todo: 选择节点
   */
  const {selectedBlock, setSelectedBlock} = React.useState();

  const goSelectBlock = () => {
    navigate('SelectBlock', {onSelectToken: node => setSelectedBlock(node)});
  };

  /**
   * 点击下一步
   */
  const onNextClick = () => {
    if (!name) {
      Toast.show({data: i18n.t('createWalletInvalidName')});
      return;
    }

    if (!password) {
      Toast.show({data: i18n.t('emptyPassword')});
      return;
    }

    if (!confirmPassword) {
      Toast.show({data: i18n.t('emptyVerifyPassword')});
      return;
    }

    if (password.length < 8) {
      Toast.show({data: i18n.t('illegalPassword')});
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({data: i18n.t('mismatchingPassword')});
      return;
    }

    if (!agreementChecked) {
      Toast.show({data: i18n.t('disagreeAgreement')});
      return;
    }

    submit();
  };

  /**
   * 提交
   */
  const submit = () => {
    // 创建
    WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.CREATE_WALLET,
          name,
          password,
        },
        callback: v => {
          if (v) {
            dispatch(wallet.addOrUpdateAWallet(v));
            dispatch(wallet.updateTempMnemonic(v.tempMnemonic));
            navigate('WalletBackUpStep1');
            setName();
            setPassword();
            setConfirmPassword();
            setAgreementChecked(false);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.wrapper}>
      <KeyboardAvoidingView>
        <FormRow
          title={i18n.t('createWalletBlock')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{}}
          // onPress={goSelectBlock}
          value={chainInfo.chainName}
          editable={false}
        />
        <FormRow
          autoFocus
          title={i18n.t('createWalletName')}
          placeholder={i18n.t('createWalletNamePlaceholder')}
          bottomDivider
          value={name}
          onChangeText={setName}
          maxLength={12}
          inputStyle={{paddingLeft: '45%'}}
        />
        <FormRow
          secureTextEntry
          bottomDivider
          title={i18n.t('createWalletPassword')}
          placeholder={i18n.t('createWalletPasswordPlaceholder')}
          value={password}
          maxLength={20}
          onChangeText={setPassword}
          inputStyle={{paddingLeft: '45%'}}
        />
        <FormRow
          secureTextEntry
          bottomDivider
          title={i18n.t('createWalletConfirmPassword')}
          placeholder={i18n.t('createWalletConfirmPasswordPlaceholder')}
          value={confirmPassword}
          maxLength={20}
          onChangeText={setConfirmPassword}
          inputStyle={{paddingLeft: '45%'}}
        />
        {/*<FormRow*/}
          {/*title={i18n.t('createWalletPrompt')}*/}
          {/*bottomDivider*/}
          {/*placeholder={i18n.t('createWalletPromptPlaceholder')}*/}
          {/*value={prompt}*/}
          {/*onChange={setPrompt}*/}
        {/*/>*/}
        <View style={styles.agreementWrapper}>
          <CheckBox
            center
            checked={agreementChecked}
            size={vw(5)}
            textStyle={{borderWidth: 1}}
            containerStyle={{marginRight: 0}}
            onPress={() => setAgreementChecked(checked => !checked)}
          />
          <SmallText>{i18n.t('createAgreement1')}</SmallText>
          <SmallText
            style={styles.createAgreement2}
            onPress={() => navigate('UsageAgreement')}>
            {i18n.t('createAgreement2')}
          </SmallText>
        </View>
        <Button
          iconRight
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('next')}
          onPress={_throttle(onNextClick, 2000, {trailing: false})}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    paddingHorizontal: metrics.spaceS,
    paddingTop: metrics.spaceS,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: metrics.spaceS,
    alignSelf: 'center',
  },
  agreementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '8%',
  },
  createAgreement2: {
    color: colors.theme,
  },
});

export default CreateWallet;
