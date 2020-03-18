import React from 'react';
import {
  View,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {safeStringify, safeParse} from '../../helpers/utils/safetyFn';
import {Toast} from '../../components/Toast';
import {Loading, Overlay} from '../../components/Mask';
import i18n from '../../helpers/i18n';

let callId = 0;
// 回调池
const handlers = {};

const WalletWebView = props => {
  const urlPath =
    Platform.OS === 'ios'
      ? require('./index.html')
      : {uri: 'file:///android_asset/walletBackground/index.html'};

  let webView = React.useRef();

  React.useEffect(() => {
    function callback(data) {
      Loading.set({visible: true});

      // 保存回调
      console.log('Post WebView:', {...data.payload, callId});
      handlers[++callId] = data.callback;

      // console.log({...data.payload, callId}, 199191991919)

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
    const data = safeParse(e.nativeEvent.data);

    // console.log(data, 111);
    if (!data) {
      Loading.set({visible: false});
      Toast.show({data: i18n.t('error')});
      console.warn('调用错误:', data);
      return;
    }

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
      console.log(Object.keys(handlers), '1=length');
      delete handlers[callbackId];
      console.log(Object.keys(handlers), '2=length');
    }

    console.log(Object.keys(handlers), '3=length')
    // if (Object.keys(handlers).length === 0) {
      Loading.set({visible: false});
    // }
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
        // source={urlPath}
        // source={{uri: 'http://192.168.0.117:3001/utc/index.html'}} // test
        source={{uri: 'http://192.168.0.117:8080/'}} // debug
        ref={c => (webView.current = c)}
        onMessage={onWebViewMessage}
      />
    </View>
  );
};

export default WalletWebView;
