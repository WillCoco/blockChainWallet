import React from 'react';
import {View, StyleSheet, Clipboard} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../helpers/colors';
import {H4, PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vh, vw} from '../../helpers/metric/index';
import {Toast} from '../../components/Toast';
// eslint-disable-next-line no-unused-vars
import _get from 'lodash/get';

const DealDetails = () => {
  const copy = v => {
    Clipboard.setString(v);
    Toast.show({data: i18n.t('copySuccess')});
  };

  return (
    <LinearGradient style={styles.page} colors={[colors.theme, '#fff',]}>
      <View style={styles.wrapper}>
        <View style={styles.dealType}>
          <Icon
            type="antdesign"
            name="checkcircle"
            color={colors.success}
            size={40}
          />
          <H4>{i18n.t('collect')}</H4>
          <PrimaryText>{'2020年01月07日18:52:25'}</PrimaryText>
        </View>
        <View style={styles.middleBox}>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('amount') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('minerFee') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('To') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
              {/* <Icon 
                name='copy1'
                type='antdesign' 
                size={16}
                color={colors.textDark2}
                onPress={() => copy('234')}
              /> */}
            </PrimaryText>
          </View>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('From') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('transferNote') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>{'TxID:'}</PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
          <View style={styles.detailsItem}>
            <PrimaryText style={styles.itemLeft}>
              {i18n.t('block') + ':'}
            </PrimaryText>
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy('123152315')}>
              {'12324fdskfsdgjdslg1g'}
            </PrimaryText>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: vw(5),
    height: '100%',
  },
  wrapper: {
    marginTop: vh(2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: vw(4),
    width: vw(90),
    borderRadius: 20,
    backgroundColor: colors.textWhite,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 4,
  },
  dealType: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: vw(8),
    borderBottomWidth: 1,
    borderColor: colors.textDark2,
  },
  middleBox: {
    width: '100%',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: colors.textDark2,
  },
  detailsItem: {
    flexDirection: 'row',
    paddingVertical: vw(3),
  },
  itemLeft: {
    flex: 2,
    color: colors.textSecondary,
  },
  itemRight: {
    flex: 8,
    flexDirection: 'row',
  },
  bottomBox: {
    width: '100%',
  },
});

DealDetails.defaultProps = {
  time: '2020年01月07日18:52:25',
};

export default DealDetails;
