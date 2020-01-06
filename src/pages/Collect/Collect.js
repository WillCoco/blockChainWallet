import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigationParam} from 'react-navigation-hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {vh, vw, metrics} from '../../helpers/metric/index';
import colors from '../../helpers/colors/index';
import i18n from '../../helpers/i18n/index';
import chainInfo from '../../config/chainInfo';
import _get from 'lodash/get';
import {Toast} from '../../components/Toast';

const Collect = props => {
  const [amount, setAmount] = React.useState('');

  // 获取当前钱包地址
  const currentWalletAddress = useSelector(
    state => _get(state, ['wallets', 'currentWallet', 'address']) || '',
  );

  // 当前转账币种，默认主币种
  const currentToken = useNavigationParam('currentToken') || chainInfo.symbol;
  // console.log(currentToken, 'currentToken')
  let qrcodeValue = `${
    chainInfo.chainName
  }:${currentWalletAddress}?amount=${amount}&token=${currentToken.symbol}`;

  // 复制
  const onPressCopy = () => {
    Clipboard.setString(currentWalletAddress);
    Toast.show({data: i18n.t('copySuccess')});
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.qrCodeWrapper}>
        <QRCode
          value={`${qrcodeValue}`}
          size={vw(46)}
          logoBackgroundColor="transparent"
        />
      </View>
      <View style={styles.amountWrapper}>
        <PrimaryText>{'Amount'}</PrimaryText>
        <TextInput
          placeholder={i18n.t('transferAmountPlaceholder')}
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <PrimaryText>{currentToken.symbol}</PrimaryText>
      </View>
      <View style={styles.addressWrapper}>
        <PrimaryText style={styles.address}>{currentWalletAddress}</PrimaryText>
        <TouchableOpacity onPress={onPressCopy}>
          <PrimaryText>{i18n.t('copy')}</PrimaryText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  qrCodeWrapper: {
    backgroundColor: '#fff',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: metrics.spaceS,
    paddingHorizontal: metrics.spaceL,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: metrics.spaceN,
    paddingBottom: 2,
    textAlign: 'center',
  },
  addressWrapper: {
    flexDirection: 'row',
    marginTop: metrics.spaceS,
    backgroundColor: '#fff',
    paddingVertical: metrics.spaceS,
    paddingHorizontal: metrics.spaceL,
  },
  address: {
    flex: 1,
    marginRight: metrics.spaceL,
  },
});

function mapStateToProps(state) {
  return {
    tokensList: [{name: 'asd'}, {name: 'ddd'}],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Collect);
