import React from 'react';
import {
  View,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {safeStringify, safeParse} from '../../helpers/utils/safetyFn';
import {Toast} from '../../components/Toast';
import i18n from '../../helpers/i18n';

let callId = 0;
// 回调池
const handlers = {};

const WalletWebView = props => {
  const urlPath =
    Platform.OS === 'ios'
      ? {uri: './walletBackground.html'}
      : {uri: 'file:///android_asset/walletBackground/index.html'};

  let webView = React.useRef();

  React.useEffect(() => {
    function callback(data) {
      // 保存回调
      console.log('Post WebView:', {...data.payload, callId});
      handlers[++callId] = data.callback;

      // 转发事件
      webView.current.postMessage(safeStringify({...data.payload, callId}));
    }

    // 转发至webView
    WVEvent.on(eventTypes.POST_WEB_VIEW, callback);

    return () => {
      WVEvent.off(eventTypes.POST_WEB_VIEW, callback);
    };
  }, []);

  const onWebViewMessage = e => {
    // 收到webView返回值后提交store数据更改
    console.log(e.nativeEvent.data, 'onWebViewMessage');
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

  return (
    <View style={{height: 0}}>
      <WebView
        originWhitelist={[
          'https://*',
          'http://*',
          'file://*',
          'sms://*',
          'tel://*',
        ]}
        source={urlPath}
        ref={c => (webView.current = c)}
        onMessage={onWebViewMessage}
      />
    </View>
  );
};

export default WalletWebView;
