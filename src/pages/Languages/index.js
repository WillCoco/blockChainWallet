import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import _get from 'lodash/get';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {appSettingAction} from '../../redux/actions';
import colors from '../../helpers/colors';
import PageWrapper from '../../components/PageWrapper';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import {scale} from 'react-native-normalization-text';
import Iconzhongwen from '../../components/Iconfont/Iconzhongwen';
import Iconyingwen from '../../components/Iconfont/Iconyingwen';
import Icongou from '../../components/Iconfont/Icongou';
import {vw, metrics} from '../../helpers/metric/index';

let languageList = [
  // {name: 'auto', lang: null},
  {
    name: '简体中文',
    lang: 'ch',
    icon: <Iconzhongwen size={scale(24)} style={{marginRight: 4}} />,
  },
  {
    name: 'English',
    lang: 'en',
    icon: <Iconyingwen size={scale(24)} style={{marginRight: 4}} />,
  },
];

const Languages = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const language = useSelector(state =>
    _get(state, ['appSetting', 'language']),
  );

  const changeLanguage = item => {
    dispatch(appSettingAction.updateLanguage(item.lang));
    navigate('Home');
  };

  return (
    <PageWrapper
      style={{backgroundColor: colors.theme}}
      statusBarProps={{
        backgroundColor: colors.theme,
        barStyle: 'light-content',
      }}>
      <PhoneShapeWrapper style={metrics.spaceN}>
        {languageList.map((item, index) => {
          return (
            <View key={index} style={styles.languageItem}>
              {item.icon}
              <TouchableOpacity
                style={styles.langItem}
                key={item.name}
                onPress={() => changeLanguage(item)}>
                <PrimaryText>{i18n.t(item.name)}</PrimaryText>
                {language === item.lang && <Icongou size={scale(18)} />}
              </TouchableOpacity>
            </View>
          );
        })}
      </PhoneShapeWrapper>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  langItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: 12,
    marginTop: metrics.spaceS,
  },
});

export default Languages;
