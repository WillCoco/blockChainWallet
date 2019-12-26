import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {H4, PrimaryText} from 'react-native-normalization-text';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Toast} from '../../components/Toast/index';
import {appSettingAction} from '../../redux/actions';
import AssetsList from './AssetsList';
import colors from '../../helpers/colors';
import Dashboard from './Dashboard';

const Home = props => {
  return (
    <>
      {/*<H1 onPress={() => props.updateLanguage(props.language === 'ch' ? 'en' : 'ch')}>{i18n.t('languages')}</H1>*/}
      <Dashboard />
      <AssetsList />
    </>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
    title: '123',
  };
};

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateLanguage: appSettingAction.updateLanguage,
    },
    dispatch,
  );
}

const styles = StyleSheet.create({
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
