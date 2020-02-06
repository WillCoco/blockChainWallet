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
  Linking,
} from 'react-native';
import {H4, PrimaryText} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import _get from 'lodash/get';
import {vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {update} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';
import {Toast} from '../../../components/Toast';
import {url} from '../../../config/';

const Updater = props => {
  console.log(props.info, 'checkUpdate_infooooooo');

  /**
   * 窗体是否下载状态
   */
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * 执行下载
   */
  const doUpdate = async () => {
    console.log(_get(props, ['info', 'expired']), 'checkUpdate_expired')
    if (_get(props, ['info', 'expired'])) {
      // apk过期，需要下载
      const linkingUrl =
        _get(props.info, 'downloadUrl') || `${url.website}/#/download`;

      console.log(linkingUrl, 'checkUpdate_url');
      Linking.openURL(linkingUrl);
    } else {
      // 有可用热更
      console.log('checkUpdate_有可用热更');

      // 切换窗体下载中形态
      setIsLoading(true);

      // 下载
      const hash = await update.doDownload(props.info);

      // 下载失败
      if (!hash) {
        Toast.show({data: i18n.t('updateFailed')});
        return;
      }

      // 下载成功
      setIsLoading(false);

      // 移除所有弹窗
      props.removeAll();

      // 立即重启
      update.doSwitch(hash, true);
    }
  };

  /**
   * 详情
   */
  const updateDesc =
    // 热更版本详情
    _get(props.info, 'description') ||
    // 更新apk时
    i18n.t('foundNewPackage');

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={{flex: -1, width: '100%'}}>
          <H4 style={styles.title}>
            {i18n.t('newVersion')} {_get(props.info, 'name')}
          </H4>
          <ScrollView style={styles.content}>
            <PrimaryText>{updateDesc}</PrimaryText>
          </ScrollView>
        </View>
        <Button
          loading={isLoading}
          containerStyle={styles.btnContainerStyle}
          title={
            _get(props.info, 'expired')
              ? i18n.t('goWebsite')
              : i18n.t('updateNow')
          }
          onPress={doUpdate}
          disabled={isLoading}
        />
        {// 是否显示稍后更新
        !_get(props.info, ['metaInfo', 'force']) ? (
          <Button
            type="clear"
            containerStyle={styles.btnContainerStyle}
            title={i18n.t('updateLater')}
            onPress={() => props.remove()}
            disabled={isLoading}
          />
        ) : null}
      </View>
    </View>
  );
};

const SafeUpdater = props => safePage(Updater, props);

SafeUpdater.defaultProps = {
  content: '',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: vw(60),
    maxWidth: 260,
    maxHeight: vw(70),
    backgroundColor: '#fff',
    borderRadius: vw(1),
    alignItems: 'center',
    padding: metrics.spaceS,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  content: {
    flex: -1,
    marginTop: metrics.spaceS,
    marginBottom: metrics.spaceN,
    paddingHorizontal: metrics.spaceS,
  },
  btnContainerStyle: {
    width: '70%',
  },
});

export default SafeUpdater;
