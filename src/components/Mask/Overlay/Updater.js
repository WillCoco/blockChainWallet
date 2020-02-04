/**
 * @author: Xu Ke
 * @date: 2020/2/4 5:11 PM
 * @Description:
 * 更新窗：
 *   1. 大版本更新，强制
 *   2. 可选择的热更新
 *
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useSelector, useDispatch} from 'react-redux';
import {useSelector, Button} from 'react-native-elements';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../../helpers/colors';
import {vh, vw} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {wallet} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';

const Updater = props => {
  return (
    <View>
      <PrimaryText>更新</PrimaryText>
      <Button
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('confirm')}
        onPress={props.confirmPress}
      />
    </View>
  );
};

const SafeUpdater = props => safePage(Updater, props);

SafeUpdater.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {

  },
});

export default SafeUpdater;
