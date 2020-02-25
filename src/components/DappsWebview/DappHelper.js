/**
 * @author: Xu Ke
 * @date: 2020/2/25 2:40 PM
 * @Description:
 *  注入到dapps的js片段
 *  1. 收到dapp消息
 *  2. 转发到钱包webview lib处理
 *  3. 接收钱包webview lib返回结果并发送给dapp
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import _get from 'lodash/get';
import {safeStringify, safeParse} from '../../helpers/utils/safetyFn';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {Toast} from '../../components/Toast';
import {createTransaction, sendTransaction} from '../../helpers/chain33';
import {Overlay} from '../../components/Mask';
import {wallet} from '../../redux/actions';
import stores from '../../redux/store';
const {store} = stores;

/**
 * dapp发送的调用消息处理器
 */
const webViewMessageHandler = e => {
  console.log(e.nativeEvent.data, 19191991919)
  const data = safeParse(e.nativeEvent.data) || {};
  console.log(data.action, 'action');
  console.log(data.payload, 'payload');

  switch (data.action) {
    case eventTypes.DAPP_QUICK_SEND:
      dappQuickSend(data);
      break;
    default:
      Toast.show({data: 'unknown action' + data.action});
  }
};

/**
 * dapp 创建交易、输入密码、签名交易、发送交易
 */
async function dappQuickSend(data) {
  console.log(data, 'ddddd')
  // resolve方法
  data.callback('123123123');

  console.log(data, 'ddddd')
  const dataJson = safeStringify(data);

  return;
  // 构造交易
  const unsignedTx = await createTransaction(dataJson);
  console.log(unsignedTx, 123123123);

  // 输入密码
  Overlay.unshift(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
    dialog: {
      canCancel: true,
      onValidEnd: async (isValid, pwd) => {
        if (isValid) {
          const currentWallet = _get(store.getState(), ['wallets', 'currentWallet']);

          // 拿私钥
          const privateKey = await store.dispatch(
            wallet.aesDecrypt({
              data: currentWallet.encryptedPrivateKey,
              // password: '11',
              password: pwd,
            }),
          );

          // 签名
          const signedTx = wallet.signTx({
            data: unsignedTx.current,
            privateKey
          });

          // 发送
          const result = (await sendTransaction({tx: signedTx})) || {};

          console.log(result, 'result');

          callback(result);
        }
      },
    },
  });
}

/**
 * 注入dapp.html
 */
function callWallet(params) {

  try {
    var paramsObj = JSON.parse(params);

    console.log(paramsObj, 'paramsObj123123123');

    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(params);
    }
  } catch (err) {
    console.error('callWallet err:', err);
  }
}

const injectedJavaScript = `
  window.walletCallId = 0;
  window.walletHandlers = {};
  window.callWallet = ${callWallet};
`;

module.exports = {
  injectedJavaScript,
  webViewMessageHandler,
};
