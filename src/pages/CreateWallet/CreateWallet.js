import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import {Button, ListItem} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import FormRow from '../../components/FormRow';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';

const CreateWallet = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const blocksList = useDispatch(state => [{name: 'UTC'}]);

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

  const {selectedBlock, setSelectedBlock} = React.useState();

  const goSelectBlock = () => {
    navigate('SelectBlock', {onSelectToken: node => setSelectedBlock(node)});
  };

  // 点击下一步
  const onNextClick = () => {
    if (!name) {
      Toast.show({data: '请填写有效钱包名称'});
      return;
    }

    if (
      !password ||
      !confirmPassword ||
      confirmPassword !== password ||
      password < 2
    ) {
      Toast.show({data: '请填写有效密码'});
      return;
    }

    submit();
  };

  // 提交
  const submit = () => {
    // 创建
    WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.CREATE_WALLET,
          name,
          password,
          prompt,
        },
        callback: v => {
          if (v) {
            alert(v)
            dispatch(wallet.addOrUpdateAWallet(v));
            navigate('WalletBackUpStep1');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <FormRow
        title={i18n.t('createWalletBlock')}
        chevron={{size: 24}}
        bottomDivider
        containerStyle={{}}
        onPress={goSelectBlock}
        value={'eadad'}
        editable={false}
      />
      <FormRow
        title={i18n.t('createWalletName')}
        placeholder={i18n.t('createWalletNamePlaceholder')}
        bottomDivider
        value={name}
        onChange={setName}
        maxLength={12}
      />
      <FormRow
        title={i18n.t('createWalletPassword')}
        placeholder={i18n.t('createWalletPasswordPlaceholder')}
        bottomDivider
        value={password}
        maxLength={20}
        onChange={setPassword}
      />
      <FormRow
        title={i18n.t('createWalletConfirmPassword')}
        placeholder={i18n.t('createWalletConfirmPasswordPlaceholder')}
        bottomDivider
        value={confirmPassword}
        maxLength={20}
        onChange={setConfirmPassword}
      />
      <FormRow
        title={i18n.t('createWalletPrompt')}
        bottomDivider
        placeholder={i18n.t('createWalletPromptPlaceholder')}
        value={prompt}
        onChange={setPrompt}
      />

      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={onNextClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: metrics.spaceS,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: vw(10),
    alignSelf: 'center',
  },
});

export default CreateWallet;
