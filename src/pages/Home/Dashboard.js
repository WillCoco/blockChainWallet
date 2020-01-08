import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H4, PrimaryText} from 'react-native-normalization-text';
import {useDispatch, useSelector} from 'react-redux';
import _get from 'lodash/get';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import WalletQuickManager from './WalletQuickManager';
import {vh, vw, metrics} from '../../helpers/metric';
import {appSettingAction} from '../../redux/actions/';

export default () => {
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  /**
   * 是否显示资产
   */
  const isShowAssets = useSelector(state =>
    _get(state, ['appSetting', 'isShowAssets']),
  );

  return (
    <View style={styles.wrapper}>
      <WalletQuickManager
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      <TouchableOpacity
        style={styles.assetWrapper}
        onPress={() => dispatch(appSettingAction.toggleIsShowAssets())}>
        <PrimaryText
          color="white"
          style={{textAlign: 'center', marginRight: 4}}>
          {i18n.t('asset')}
        </PrimaryText>
        <Icon
          name={isShowAssets ? 'eye' : 'eye-with-line'}
          type="entypo"
          color={colors.textWhite}
          size={Math.min(14, vw(6))}
        />
      </TouchableOpacity>

      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={styles.contentLeft}
          onPress={() => navigate('Transfer')}>
          <Icon name="exit-to-app" color={colors.textWhite}/>
          <H4 color="white" style={styles.alignCenter}>
            {i18n.t('transfer')}
          </H4>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.contentRight}
          onPress={() => navigate('Collect')}>
          <Icon name="swap-horiz" color={colors.textWhite} />
          <H4 color="white" style={styles.alignCenter}>
            {i18n.t('collect')}
          </H4>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: vh(24),
    minHeight: vh(24),
  },
  contentWrapper: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 8,
  },
  contentLeft: {
    flex: 1,
    paddingVertical: 4,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentRight: {
    flex: 1,
    paddingVertical: 4,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  assetWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignCenter: {
    textAlign: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth * 2,
    height: '100%',
    backgroundColor: '#fff',
  },
});
