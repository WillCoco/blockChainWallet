import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import _throttle from 'lodash/throttle';
import {Button, CheckBox} from 'react-native-elements';
import {SmallText, scale} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import colors from '../../helpers/colors';
import {chainInfo, coins} from '../../config/';
import FormRow from '../../components/FormRow';
import {Toast} from '../../components/Toast';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import {wallet} from '../../redux/actions';
import Iconqukuai from '../../components/Iconfont/Iconqukuai';
import Iconmima from '../../components/Iconfont/Iconmima';
import Iconquerenmima from '../../components/Iconfont/Iconquerenmima';
import Iconwalletblue from '../../components/Iconfont/IconwalletblueCopy';

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
          coins,
        },
        callback: v => {
          if (v) {
            console.log(v, 'vvvvvvvvvvv')
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
    <View style={styles.wrapper}>
      <PhoneShapeWrapper>
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.contentWrapper}>
          <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
          <KeyboardAvoidingView>
            <FormRow
              title={i18n.t('createWalletBlock')}
              leftIcon={<Iconqukuai size={scale(22)} />}
              chevron={{size: 24}}
              containerStyle={styles.formRow}
              // onPress={goSelectBlock}
              value={chainInfo.chainName}
              editable={false}
              inputStyle={{paddingLeft: scale(140)}}
            />
            <FormRow
              autoFocus
              title={i18n.t('createWalletName')}
              leftIcon={<Iconwalletblue size={scale(22)} />}
              placeholder={i18n.t('createWalletNamePlaceholder')}
              containerStyle={styles.formRow}
              value={name}
              onChangeText={setName}
              maxLength={12}
              inputStyle={{paddingLeft: scale(140)}}
            />
            <FormRow
              secureTextEntry
              title={i18n.t('createWalletPassword')}
              leftIcon={<Iconmima size={scale(22)} />}
              containerStyle={styles.formRow}
              placeholder={i18n.t('createWalletPasswordPlaceholder')}
              value={password}
              maxLength={20}
              onChangeText={setPassword}
              inputStyle={{paddingLeft: scale(140)}}
            />
            <FormRow
              secureTextEntry
              containerStyle={styles.formRow}
              title={i18n.t('createWalletConfirmPassword')}
              leftIcon={<Iconquerenmima size={scale(22)} />}
              placeholder={i18n.t('createWalletConfirmPasswordPlaceholder')}
              value={confirmPassword}
              maxLength={20}
              onChangeText={setConfirmPassword}
              inputStyle={{paddingLeft: scale(140)}}
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
              buttonStyle={styles.btnStyle}
              title={i18n.t('next')}
              onPress={_throttle(onNextClick, 2000, {trailing: false})}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </PhoneShapeWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // paddingHorizontal: metrics.spaceS,
    // paddingTop: metrics.spaceS,
    backgroundColor: colors.theme,
  },
  contentWrapper: {
    paddingHorizontal: metrics.spaceS,
    paddingTop: metrics.spaceS,
    // backgroundColor: colors.theme,
  },
  formRow: {
    height: scale(56),
  },
  phoneShape: {
    borderWidth: 1,
    flex: 1,
  },
  btnContainerStyle: {
    width: '100%',
    marginTop: metrics.spaceS,
    alignSelf: 'center',
    backgroundColor: colors.theme,
  },
  btnStyle: {
    backgroundColor: colors.theme,
    height: scale(58),
    borderRadius: vw(2),
  },
  agreementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '8%',
    marginTop: 10,
  },
  createAgreement2: {
    color: colors.theme,
  },
});

export default CreateWallet;
