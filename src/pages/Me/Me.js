import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import PageWrapper from '../../components/PageWrapper';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import NavBar from '../../components/NavBar';
import {scale} from 'react-native-normalization-text';
import Iconqianbao3 from '../../components/Iconfont/Iconqianbao3';
// import Iconjiaoyijilu from '../../components/Iconfont/Iconjiaoyijilu';
import Iconyuyanshezhi from '../../components/Iconfont/Iconyuyanshezhi';
import IconwodeGuanyuwomen from '../../components/Iconfont/IconwodeGuanyuwomen';
import IconArrowDetail from '../../components/Iconfont/Iconarrowdetail';

const menuList = [
  {
    title: 'walletManagement',
    icon: <Iconqianbao3 size={scale(22)} />,
    route: 'WalletManagement',
  },
  // {
  //   title: 'transactionHistory',
  //   icon: <Iconjiaoyijilu size={scale(22)} />,
  //   route: 'TransactionHistory',
  // },
  {
    title: 'languages',
    icon: <Iconyuyanshezhi size={scale(22)} />,
    route: 'Languages',
  },
  // {
  //   title: 'helpCenter',
  //   icon: 'help',
  //   route: 'HelpCenter',
  //   color: colors.success,
  // },
  {
    title: 'about',
    icon: <IconwodeGuanyuwomen size={scale(22)} />,
    route: 'About',
  },
];

const Me = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  return (
    <PageWrapper style={styles.wrapper}>
      <NavBar title={i18n.t('me')} leftElement={null} />
      <PhoneShapeWrapper
        style={{marginTop: metrics.spaceN, backgroundColor: colors.cardBg}}>
        {menuList.map((item, i) => (
          <ListItem
            key={i}
            title={i18n.t(item.title)}
            leftIcon={item.icon}
            // bottomDivider={item.bottomDivider}
            chevron={<IconArrowDetail size={scale(32)} />}
            style={styles.listItemStyle}
            onPress={() => navigate(item.route)}
            containerStyle={{borderColor: colors.divider, height: '100%'}}
          />
        ))}
      </PhoneShapeWrapper>
    </PageWrapper>
  );
};

export default Me;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
  },
  listItemStyle: {
    marginHorizontal: vw(4),
    height: vw(16),
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
});
