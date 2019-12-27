import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {appSettingAction} from '../../redux/actions';
import colors from '../../helpers/colors';

const ImportWallet = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pageBackground,
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
      updateLanguage: appSettingAction.updateLanguage,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportWallet);