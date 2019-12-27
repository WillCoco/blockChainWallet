import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon, ListItem} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import {Button} from 'react-native-elements';
import FormRow from '../../components/FormRow';
import {useNavigationParam} from 'react-navigation-hooks';
import _get from 'lodash/get';
import {wallet} from '../../redux/actions';

const WalletDetails =  (props) => {
  return (
    <>
      <Text style={styles.addressCard}>23413sdfdsaf812423134</Text>
      {/* 功能区 */}
      <View>
        <FormRow
          title={i18n.t('walletName')}
          placeholder={i18n.t('createWalletNamePlaceholder')}
          bottomDivider
        />
        <FormRow
          title={i18n.t('changePassword')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{}}
          // onPress={goSelectToken}
          editable={false}
        />
        <FormRow
          title={i18n.t('exportPrivateKey')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{marginTop: 10}}
          // onPress={goSelectToken}
          editable={false}
        />
        {/* <PrimaryText>{i18n.t('exportPrivateKey')}</PrimaryText> */}
      </View>
      <Button
        iconRight
        buttonStyle={styles.btnContainerStyle}
        title={i18n.t('deleteWallet')}
        // onPress={onNextClick}
      />
    </>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15
  },
  addressCard: {
    height: vh(20),
    backgroundColor: colors.theme,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20,
  },
  btnContainerStyle: {
    width: '90%',
    marginTop: vw(10),
    alignSelf: 'center',
    backgroundColor: colors.warn,
  },
});


function mapStateToProps(state) {
  console.log(state)
  return {
    currentWallet: _get(state, ['wallets', 'currentWallet']) || {}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addOrUpdateAWallet: wallet.addOrUpdateAWallet,
      removeAWallet: wallet.removeAWallet,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletDetails);
