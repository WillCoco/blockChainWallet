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
} from 'react-native';
import {H4, PrimaryText} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import {
  packageVersion,
  currentVersion,
} from 'react-native-update';
import _get from 'lodash/get';
import {vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {update} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';
import {Toast} from '../../../components/Toast';

const Updater = props => {
  /**
   * 窗体是否下载状态
   */
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * 执行下载
   */
  const doUpdate = async () => {
    // 切换窗体下载中形态
    setIsLoading(true);

    // 下载
    const res = await update.doUpdate(props.info, true);

    // 下载失败
    if (res.err) {
      Toast.show({data: i18n.t('updateLater')});
      props.remove();
    }

    // 下载成功
    setIsLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={{flex: -1, width: '100%'}}>
          <H4 style={styles.title}>
            {i18n.t('newVersion')} {packageVersion}
          </H4>
          <H4 style={styles.title}>当前版本 {currentVersion}</H4>
          <ScrollView style={styles.content}>
            <PrimaryText>{props.content}</PrimaryText>
          </ScrollView>
        </View>
        <Button
          loading={isLoading}
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('updateNow')}
          onPress={doUpdate}
          disabled={isLoading}
        />
        {// 是否显示稍后更新
        _get(props.info, ['metaInfo', 'force']) ? (
          <Button
            type="clear"
            containerStyle={styles.btnContainerStyle}
            title={i18n.t('updateLater')}
            onPress={props.remove}
            disabled={isLoading}
          />
        ) : null}
      </View>
    </View>
  );
};

const SafeUpdater = props => safePage(Updater, props);

SafeUpdater.defaultProps = {
  content: '1.更新内容asd123 1231 23weaweqwe qwe \n2.daskjdhas \n3.asdasasd \n2.daskjdhas \n3.asdasasd\n3.asdasasd \n2.daskjdhas \n3.asdasasd',
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
