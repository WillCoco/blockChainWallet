import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import FormRow from '../../components/FormRow';

export default () => {
  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  const {navigate, state} = useNavigation();
  const {selectedToken, setSelectedToken} = React.useState();

  const goSelectToken = () => {
    navigate(
      'SelectToken',
      {onSelectToken: token => setSelectedToken(token)}
     );
  };

  const a = useNavigationParam('aaa');
  return (
    <View style={styles.wrapper}>
      <FormRow
        title={i18n.t('transferToken')}
        chevron={{size: 24}}
        bottomDivider
        containerStyle={{}}
        onPress={goSelectToken}
        value={'eadad'}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferAddress')}
        placeholder={i18n.t('transferAddressPlaceholder')}
        bottomDivider
      />
      <FormRow
        title={i18n.t('transferAmount')}
        placeholder={i18n.t('transferAmountPlaceholder')}
        bottomDivider
      />
      <ListItem
        title={i18n.t('transferFee')}
        bottomDivider
      />
      <FormRow
        title={i18n.t('transferNote')}
        bottomDivider
        placeholder={i18n.t('transferNotePlaceholder')}
      />

      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={() => setTxConfirmVisible(true)}
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