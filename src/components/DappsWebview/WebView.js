/**
 * @author: Xu Ke
 * @date: 2020/2/13 1:05 PM
 * @Description:
 *  dapps webview外壳:
 *    1.钱包接口调用
 *    2.最小化,关闭
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {safeStringify, safeParse} from '../../helpers/utils/safetyFn';
import {Toast} from '../../components/Toast';
import NavBar from '../../components/NavBar';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import actionTypes from './actionTypes';

let callId = 0;
// 回调池
const handlers = {};

/**
 * 窗体状态
 */
const VIEW_STATUS = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
  MINIMIZE: 'MINIMIZE',
  HIDDEN: 'HIDDEN', // 预加载
};

/**
 * dispatch、state
 */
let dappDispatch;
let dappState;

const DappsWebView = props => {
  let webView = React.useRef();

  const initialState = {
    uri: '',
    status: VIEW_STATUS.CLOSED,
    viewStyle: null,
  };

  function reducer(state, action) {
    console.log(action, 'accccc')
    switch (action.type) {
      case actionTypes.PRELOAD:
        return {...state, uri: action.payload.uri, status: VIEW_STATUS.HIDDEN};
      case actionTypes.OPEN:
        return {...state, uri: action.payload.uri, status: VIEW_STATUS.OPENED};
      case actionTypes.CLOSE:
        return {...state, uri: '', status: VIEW_STATUS.CLOSED};
      case actionTypes.MIN:
        return {...state, status: VIEW_STATUS.MINIMIZE};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  // 赋值dispatch
  dappDispatch = dispatch;

  // 赋值state
  dappState = state;

  // React.useEffect(() => {
  //   function callback(data) {
  //     // 保存回调
  //     // console.log('Post WebView:', {...data.payload, callId});
  //     handlers[++callId] = data.callback;
  //
  //     // 转发事件
  //     webView.current.postMessage(safeStringify({...data.payload, callId}));
  //   }
  //
  //   // 转发至webView
  //   WVEvent.on(eventTypes.POST_WEB_VIEW, callback);
  //
  //   return () => {
  //     WVEvent.off(eventTypes.POST_WEB_VIEW, callback);
  //   };
  // }, []);

  const onWebViewMessage = e => {
    // 收到webView返回值后提交store数据更改
    // console.log(e.nativeEvent.data, 'onWebViewMessage');
    const data = safeParse(e.nativeEvent.data) || {};
    const {callId: callbackId, result} = data;

    // console.log(handlers[callbackId], 'handlers[callbackId]');
    // console.log(result, 'result');
    // console.log(callbackId, 'callbackId');

    if (handlers[callbackId]) {
      if (result !== undefined && result !== null) {
        handlers[callbackId](result);
      } else {
        Toast.show({data: i18n.t('error')});
        console.warn('调用错误:', data);
      }
      delete handlers[callbackId];
    }
  };

  // 关闭
  if (state.status === VIEW_STATUS.CLOSED) {
    return null;
  }

  // 容器样式
  let wrapperStyle;
  switch (state.status) {
    case VIEW_STATUS.MINIMIZE:
      wrapperStyle = styles.wrapperMin;
      break;
    case VIEW_STATUS.HIDDEN:
      wrapperStyle = styles.wrapperHidden;
      break;
    case VIEW_STATUS.OPENED:
      wrapperStyle = styles.wrapperOpened;
      break;
    default:
      return styles.wrapperHidden;
  }

  return (
    <View style={wrapperStyle}>
      <NavBar onLeft={() => dispatch({type: actionTypes.CLOSE})} />
      <WebView
        originWhitelist={[
          'https://*',
          'http://*',
          'file://*',
          'sms://*',
          'tel://*',
        ]}
        source={{uri: state.uri}}
        ref={c => (webView.current = c)}
        onMessage={onWebViewMessage}
        style={styles.webview}
      />
    </View>
  );
};

const safeDappsWebview = props => safePage(DappsWebView, props);

safeDappsWebview.defaultProps = {
};

const styles = StyleSheet.create({
  wrapperOpened: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  wrapperMin: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(5),
    position: 'absolute',
    right: vw(10),
    bottom: vw(10),
  },
  wrapperHidden: {
    width: 0,
    height: 0,
  },
  webview: {
    // borderWidth: 10,
  },
});

export default {
  View: safeDappsWebview,
  dappDispatch: (...p) => dappDispatch(...p),
  dappState: () => dappState,
  VIEW_STATUS,
  actionTypes,
};