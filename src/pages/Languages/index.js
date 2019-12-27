import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import useI18n from '../../hooks/useI18n';
import i18n from '../../helpers/i18n';
import { updateLanguage } from '../../redux/actions/appSetting';
import _get from 'lodash/get';

let languageList = [
  {name: 'auto', lang: 'auto'},
  {name: '简体中文', lang: 'ch'},
  {name: 'English', lang: 'en'},
];

const Languages = props => {
  const {navigate} = useNavigation();

  const changeLanguage = (item) => {
    props.updateLanguage(item.lang);
    navigate('Home');
  };
  
  return (
    <>
      {
        languageList.map((item, index) => {
          return (
            <TouchableOpacity 
              style={styles.langItem} 
              key={item.name}
              onPress={() => changeLanguage(item)}
            >
              <PrimaryText>{i18n.t(item.name)}</PrimaryText>
              {
                props.language === item.lang && <Icon name='rowing' color='#00aced' />
              }
            </TouchableOpacity>
          )
        })
      }
    </>
  );
};


const styles = StyleSheet.create({
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateLanguage,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Languages);