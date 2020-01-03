import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import WalletQuickManager from './WalletQuickManager';
import {vh, vw, metrics} from '../../helpers/metric';

export default () => {
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      <WalletQuickManager
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      <View style={styles.assetWrapper}>
        <PrimaryText color="white" style={{textAlign: 'center'}}>
          {i18n.t('asset')}
        </PrimaryText>
      </View>

      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={styles.contentLeft}
          onPress={() => navigate('Transfer')}>
          <H4 color="white" style={styles.alignCenter}>
            {i18n.t('transfer')}
          </H4>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.contentRight}
          onPress={() => navigate('Collect')}>
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
    textAlign: 'center',
  },
  contentRight: {
    flex: 1,
    paddingVertical: 4,
    textAlign: 'center',
  },
  assetWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
