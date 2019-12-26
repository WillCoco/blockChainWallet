import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import {wallet} from '../../redux/actions';

const WalletBackUpStep1 = props => {
  const {navigate} = useNavigation();

  const {} = useNavigationParam();

  const createWallet = () => {
    // 创建

    props.createWallet();

    // 下一步
    navigate('WalletBackUpStep2');
  };

  return (
    <>
      <Text>安全保存私钥</Text>
      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('backupWallet')}
        onPress={createWallet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: '24%',
  },
});


function mapStateToProps(state) {
  return {
    // language: _get(state.appSetting, ['language']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createWallet: wallet.createWallet,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletBackUpStep1);
