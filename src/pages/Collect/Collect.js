import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {PrimaryText} from 'react-native-normalization-text';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {vh, vw, metrics} from '../../helpers/metric/index';
import colors from '../../helpers/colors/index';
import i18n from '../../helpers/i18n/index';

const Collect = props => {
  // 获取当前token
  const currentToken = () => {

  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.qrCodeWrapper}>
        <QRCode
          value={'123123123123123'}
          size={vw(46)}
          logoBackgroundColor="transparent"
        />
      </View>
      <View style={styles.amountWrapper}>
        <PrimaryText>{'Amount'}</PrimaryText>
        <TextInput
          placeholder={i18n.t('transferAmountPlaceholder')}
          style={styles.input}
        />
        <PrimaryText>{'SWT'}</PrimaryText>
      </View>
      <View style={styles.addressWrapper}>
        <PrimaryText style={styles.address}>asdkjhakjsdajshdajkshd</PrimaryText>
        <TouchableOpacity onPress={() => alert('copy')}>
          <PrimaryText>复制</PrimaryText>
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
