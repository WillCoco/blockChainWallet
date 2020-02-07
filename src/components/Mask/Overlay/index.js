/**
 * @author: Xu Ke
 * @date: 2020/2/3 12:34 PM
 * @Description: 所有涉及Modal的组件集中管理, 互斥, 同一时间只能显示一个
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {BackHandler} from 'react-native';
import {View, InteractionManager} from 'react-native';
import {Overlay} from 'react-native-elements';
// import _get from 'lodash/get';
// import Loading from '../Loading';
// import i18n from '../../../helpers/i18n/index';
// import safePage from '../../../helpers/safePage/index';
// import Dialog from '../../../components/Dialog';

import DialogPasswordValid from './DialogPasswordValid';
import WalletQuickManager from './WalletQuickManager';
import TxConfirm from './TxConfirm';
import SecretExport from './SecretExport';
import Updater from './Updater';

/**
 * 内容种类
 */
const contentTypes = {
  // Dialog
  DIALOG_PASSWORD_VALID: 'DIALOG_PASSWORD_VALID',

  // Modals
  WALLET_QUICK_MANAGER: 'WALLET_QUICK_MANAGER',
  SECRET_EXPORT: 'SECRET_EXPORT',
  TX_CONFIRM: 'TX_CONFIRM',
  UPDATER: 'UPDATER',
};

/**
 * modal外壳种类
 */
const maskTypes = {
  TYPES_OVERLAY: 'TYPES_OVERLAY',
  TYPES_DIALOG: 'TYPES_DIALOG',
};

let actions;

/**
 * 默认overlay配置
 */
let defaultOptions = {
  containerStyle: {},
  overlayStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    padding: 0,
  },
  dialog: {
    onValidEnd: () => undefined,
    canCancel: false,
  },
  customData: {},
};

const MaskOverlay = props => {
  /**
   * overlay配置
   */
  const [options, setOptions] = React.useState(defaultOptions);
  const mergeOptions = opts => {
    const {
      containerStyle = {},
      overlayStyle = {},
      dialog = {},
      customData = {},
    } = opts || {};

    setOptions(() => ({
      ...opts,
      containerStyle: {
        ...defaultOptions.containerStyle,
        ...containerStyle,
      },
      overlayStyle: {
        ...defaultOptions.overlayStyle,
        ...overlayStyle,
      },
      dialog: {
        ...defaultOptions.dialog,
        ...dialog,
      },
      customData: {
        ...defaultOptions.customData,
        ...customData,
      },
    }));
  };

  /**
   * 弹窗队列
   */
  const [list, setList] = React.useState([contentTypes.UPDATER]);

  /**
   * 止戈，暂停弹窗显示，不影响队列，只是影响是否显示modal
   */
  const [isPause, setPause] = React.useState(false);

  const visible = !isPause && list && list.length > 0;

  /**
   * 添加到队列尾部
   */
  console.log(list, 'opts');

  const push = (item, opts) => {
    InteractionManager.runAfterInteractions(() => {
      mergeOptions(opts);

      setList(list => {
        // 已存在该弹窗则不弹出
        if (list.indexOf && list.indexOf(item) === -1) {
          return [...list, item];
        }
        return list;
      });
    });
  };

  /**
   * 添加到队列头部
   */
  const unshift = (item, opts) => {
    InteractionManager.runAfterInteractions(() => {
      mergeOptions(opts);

      // 提升顺序或增加
      setList(list => [...new Set([item, ...list])]);
    });
  };

  /**
   * 关闭一个弹窗，从头部移除n项
   */
  const remove = (depth = 1) => {
    setList(list => {
      // 清除所有
      if (depth === -1) {
        return [];
      }

      const newList = list.splice(depth);
      console.log(newList, list, depth, 'newList');
      // 清除部分
      return newList;
    });
  };

  /**
   * 关闭所有弹窗
   */
  const removeAll = () => remove(-1);

  actions = {
    push,
    unshift,
    remove,
    setPause,
    removeAll,
  };

  /**
   * android禁止返回关闭弹窗
   */

  /**
   * 获取内容、内容类型
   */
  const getContent = () => {
    switch (list[0]) {
      case contentTypes.DIALOG_PASSWORD_VALID:
        return {
          dialogComponent: (
            <DialogPasswordValid
              visible={visible}
              {...actions}
              {...options.dialog}
            />
          ),
          type: maskTypes.TYPES_DIALOG,
        };
      case contentTypes.WALLET_QUICK_MANAGER:
        return {
          content: <WalletQuickManager {...actions} />,
          type: maskTypes.TYPES_OVERLAY,
        };
      case contentTypes.SECRET_EXPORT:
        return {
          content: (
            <SecretExport
              visible={visible}
              {...options.customData}
              {...actions}
            />
          ),
          type: maskTypes.TYPES_OVERLAY,
        };
      case contentTypes.TX_CONFIRM:
        return {
          content: (
            <TxConfirm visible={visible} {...options.customData} {...actions} />
          ),
          type: maskTypes.TYPES_OVERLAY,
        };
      case contentTypes.UPDATER:
        return {
          content: (
            <Updater visible={visible} {...options.customData} {...actions} />
          ),
          type: maskTypes.TYPES_OVERLAY,
        };
      default:
        return <View />;
    }
  };

  const {content, type: contentType, dialogComponent} = getContent();

  return (
    <View>
      {contentType === maskTypes.TYPES_OVERLAY ? (
        <Overlay
          isVisible={visible}
          windowBackgroundColor="rgba(0,0,0,.5)"
          overlayBackgroundColor="transparent"
          width="auto"
          height="auto"
          // onBackdropPress={() => remove()} // 返回键是否关闭
          containerStyle={options.containerStyle}
          overlayStyle={options.overlayStyle}>
          {content}
        </Overlay>
      ) : (
        dialogComponent
      )}
    </View>
  );
};

module.exports = {
  View: MaskOverlay,
  push: (item, options) => actions.push(item, options),
  remove: options => actions.remove(options),
  removeAll: () => actions.removeAll(),
  unshift: (item, options) => actions.unshift(item, options),
  setPause: () => actions.setPause(),
  showLoading: () => {},
  hideLoading: () => {},
  contentTypes,
};
