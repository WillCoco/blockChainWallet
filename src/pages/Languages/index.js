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

let languageList = [
  // {name: 'auto', lang: null},
  {name: '简体中文', lang: 'ch'},
  {name: 'English', lang: 'en'},
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
    <PageWrapper statusBarProps={{backgroundColor: colors.theme, barStyle: 'light-content'}}>
      {languageList.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.langItem}
            key={item.name}
            onPress={() => changeLanguage(item)}>
            <PrimaryText>{i18n.t(item.name)}</PrimaryText>
            {language === item.lang && <Icon name="check" color={colors.theme} />}
          </TouchableOpacity>
        );
      })}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});

export default Languages;
