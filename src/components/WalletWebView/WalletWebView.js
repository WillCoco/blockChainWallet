import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {WebView} from 'react-native-webview';
import {wallet} from '../../redux/actions';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {safeStringify, safeParse} from '../../utils/safetyFn';
import {Toast} from '../../components/Toast';

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
    // props.updateWebViewPost(webView.postMessage);
  }, [webView, props]);

  React.useEffect(() => {
    function callback(data) {
      // 保存回调
      console.log('Post WebView:', {...data.payload, callId});
      handlers[++callId] = data.callback;

      // 转发事件
      webView.postMessage(safeStringify({...data.payload, callId}));
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
    const {callId: callbackId, result, error} = data;

    // console.log(handlers[callbackId], 'handlers[callbackId]');
    // console.log(result, 'result');
    // console.log(callbackId, 'callbackId');

    if (handlers[callbackId]) {
      console.log(result, 'result');
      if (result) {
        handlers[callbackId](result);
      } else {
        Toast.show({data: '调用错误' + error});
      }
      delete handlers[callbackId];
    }
    // console.log(handlers, 'handlers');

    // WVEvent.emitEvent(eventTypes.CREATE_WALLET, [e.nativeEvent.data]);
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
        ref={c => (webView = c)}
        onMessage={onWebViewMessage}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateWebViewPost: wallet.updateWebViewPost,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletWebView);
