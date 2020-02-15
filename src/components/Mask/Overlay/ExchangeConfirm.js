/**
 * @author: Xu Ke
 * @date: 2020/2/15 3:23 PM
 * @Description: tc兑换utc确认窗
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H4, PrimaryText, scale} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import colors from '../../../helpers/colors';
import {vh, vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import i18n from '../../../helpers/i18n';
import {chainInfo} from '../../../config';
import images from '../../../images';

const WalletExchangeConfirm = props => {
  const onConfirmPress = () => {
    props.onConfirm(props.isLock);
    props.remove();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onConfirmPress} style={{alignItems: 'center'}}>
        <View style={styles.contentWrapper}>
          <View style={styles.iconsWrapper}>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={images.UTCIcon}
            />
          </View>
          <H4 style={{marginRight: metrics.spaceS}}>{chainInfo.symbol}</H4>
          {props.isLock ? (
            <PrimaryText>
              {i18n.t('unitPrice')} {props.lockPrice}CNY {i18n.t('lockText')}
            </PrimaryText>
          ) : (
            <PrimaryText>
              {i18n.t('unitPrice')} {props.noLockPrice}CNY {i18n.t('noLockText')}
            </PrimaryText>
          )}
        </View>
        <Button
          title={i18n.t('cancel')}
          containerStyle={styles.btnContainerStyle}
          buttonStyle={styles.btnStyle}
          onPress={() => props.remove()}
        />
      </TouchableOpacity>
    </View>
  );
};

const SafeWalletExchangeConfirm = props =>
  safePage(WalletExchangeConfirm, props);

SafeWalletExchangeConfirm.defaultProps = {
  isLock: true,
  noLockPrice: 25,
  lockPrice: 15,
  onConfirm: () => alert('确认'),
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: vh(8),
    justifyContent: 'flex-end',
    paddingHorizontal: metrics.spaceS,
    paddingBottom: metrics.spaceN
  },
  iconsWrapper: {
    width: vw(10),
    height: vw(10),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(4),
    borderRadius: scale(6),
    backgroundColor: colors.iconBg4,
  },
  icon: {
    width: vw(7),
    height: vw(7),
  },
  createWallet: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vw(3),
  },
  contentWrapper: {
    minWidth: vw(92),
    marginBottom: metrics.spaceS,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: metrics.spaceS,
    paddingVertical: metrics.spaceS,
    borderRadius: vw(2),
  },
  btnContainerStyle: {
    minWidth: vw(92),
  },
  btnStyle: {
    borderRadius: vw(2),
    height: vh(6),
    maxHeight: 60,
    minHeight: 40,
  },
});

export default SafeWalletExchangeConfirm;
