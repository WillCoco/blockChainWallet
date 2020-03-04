import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
import {Icon, Button} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {scale} from 'react-native-normalization-text';
import WalletCard from './WalletCard';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import {isNotchScreen} from '../../helpers/utils/isNotchScreen';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import NavBar from '../../components/NavBar';
import PageWrapper from '../../components/PageWrapper';

export default props => {
  const {navigate} = useNavigation();

  // 当前钱包
  // const currentWallet = useSelector(
  //   state => _get(state.wallets, ['currentWallet']) || [],
  // );

  // 钱包列表
  const walletsList = useSelector(
    state => _get(state.wallets, ['walletsList']) || [],
  );

  // 恢复钱包
  const recoverWallet = () => {
    navigate('ImportWallet');
  };

  return (
    <PageWrapper style={styles.wrapper}>
      <NavBar
        title={i18n.t('walletManagement')}
        safeViewStyle={{
          backgroundColor: colors.pageDarkBackground,
        }}
      />
      {/* 钱包列表 */}
      <PhoneShapeWrapper>
        <ScrollView style={styles.content}>
          {walletsList.map((item, index) => {
            return (
              <WalletCard
                key={`${index}_${item.address}`}
                wallet={item}
                walletName={item.name}
                walletAddress={item.address}
              />
            );
          })}
        </ScrollView>
        {/* 按钮 */}
        <View style={styles.btns}>
          <Button
            containerStyle={{flex: 1}}
            buttonStyle={StyleSheet.flatten([
              styles.button,
              {
                backgroundColor: colors.themeOpacity,
                marginRight: metrics.spaceS,
              },
            ])}
            icon={
              <Icon
                name="wallet-outline"
                type="material-community"
                color={colors.theme}
              />
            }
            title={i18n.t('createWallet')}
            titleStyle={{color: colors.theme}}
            onPress={() => navigate('CreateWallet')}
          />
          <Button
            containerStyle={{flex: 1}}
            buttonStyle={StyleSheet.flatten([
              styles.button,
              {
                // paddingTop: metrics.spaceS,
                marginLeft: metrics.spaceS,
              },
            ])}
            icon={
              <Icon
                name="application-import"
                type="material-community"
                color={colors.textWhite}
              />
            }
            title={i18n.t('importWallet')}
            onPress={recoverWallet}
          />
        </View>
      </PhoneShapeWrapper>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pageDarkBackground,
    height: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.pageBackground,
    marginTop: metrics.spaceS,
    borderRadius: vw(2),
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: metrics.spaceN,
    marginBottom: isNotchScreen() ? vh(2.5) : metrics.spaceS,
  },
  button: {
    backgroundColor: colors.theme,
    borderRadius: vw(1),
    height: scale(60),
  },
  buttonText: {
    color: '#fff',
    lineHeight: 50,
    textAlign: 'center',
  },
});
