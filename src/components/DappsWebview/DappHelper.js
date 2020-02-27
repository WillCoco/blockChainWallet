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
import {eventTypes} from '../../helpers/eventEmmiter';
import {Toast} from '../../components/Toast';
import {createTransaction, sendTransaction} from '../../helpers/chain33';
import {Overlay, Loading} from '../../components/Mask';
import {lowerUnit, upperUnit} from '../../helpers/utils/numbers';
import {wallet} from '../../redux/actions';
import stores from '../../redux/store';
import {chainInfo} from '../../config';
const {store} = stores;

/**
 * webView 实例
 */
let wevViewRef;
function updateWebViewRef(ref) {
  wevViewRef = ref;
}

/**
 * dapp发送的调用消息处理器
 */
const webViewMessageHandler = e => {
  const data = safeParse(e.nativeEvent.data) || {};
  // console.log(data.action, 'action');
  // console.log(data.payload, 'payload');

  switch (data.action) {
    case eventTypes.DAPP_QUICK_SEND:
      dappQuickSend(data);
      break;
    default:
      Toast.show({data: 'unknown action' + data.action});
  }
};

/**
 * 获取html callId 对应resolve方法
 * 调用一次就会被消费, 需保证从dapp调用链上会且只会被执行一次
 */
function dappResolver(callId, result) {
  if (!wevViewRef || callId == undefined) {
    console.error(
      `callId: ${callId}, wevViewRef: ${wevViewRef}下无对应resolve：`,
    );
  }
  wevViewRef.injectJavaScript(`window.getHandler(${callId})(${result})`);
}

/**
 * dapp 创建交易、输入密码、签名交易、发送交易
 */
async function dappQuickSend(data) {
  const txForm = {
    fee: +lowerUnit(chainInfo.defaultFee, {needInteger: false}),
    ...data.payload,
  };

  // console.log(txForm, 'txFormtxForm')
  const dataJson = safeStringify(txForm);

  // 构造交易
  const unsignedTx = await createTransaction(dataJson);

  if (!unsignedTx) {
    dappResolver(
      _get(data, 'callId'),
      safeStringify({error: '构造为签名交易失败'}),
    );
    return;
  }

  // 交易详情展示
  Overlay.push(Overlay.contentTypes.TX_CONFIRM, {
    customData: {
      transferForm: {
        amount: upperUnit(txForm.amount),
        address: txForm.to,
        fee: upperUnit(txForm.fee),
        note: txForm.note,
        token: txForm.isToken ? {symbol: txForm.tokenSymbol} : undefined,
      },
      confirmPress: () => {
        Overlay.remove();
        confirmAction();
      },
      closePress: () => {
        dappResolver(
          _get(data, 'callId'),
          safeStringify({error: 'USER_CANCEL'}),
        );
      },
    },
  });

  // console.log(unsignedTx, 123123123);

  // 输入密码q
  function confirmAction() {
    Overlay.unshift(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
      dialog: {
        canCancel: true,
        onValidEnd: async (isValid, pwd) => {
          if (isValid) {
            Loading.set({visible: true});

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
            const signedTx = await store.dispatch(
              wallet.signTx({
                data: unsignedTx.result,
                privateKey,
              }),
            );

            // console.log(privateKey, 'privateKey')
            // console.log(signedTx, 'signedTx')

            // 发送
            const result = (await sendTransaction({tx: signedTx})) || {};

            // console.log(result, 'result');

            dappResolver(_get(data, 'callId'), safeStringify(result));
            Loading.set({visible: false});
          }
        },
        onCancel: () => {
          dappResolver(
            _get(data, 'callId'),
            safeStringify({result: 'USER_CANCEL'}),
          );
        },
      },
    });
  }
}

/**
 * ========dapp html作用域 start========
 * 这里写的代码直接运行在webview中，需要兼容性比较好，所以尽量缩此处短代码量
 */
function callWallet(params) {
  return new Promise(resolve => {
    var paramsObj = JSON.parse(params);

    // handlers
    window.walletHandlers[paramsObj.callId] = resolve;

    // console.log(paramsObj, 'paramsObj123123123');

    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(params);
    }
  });
}

const injectedJavaScript = `
  window.walletHandlers = {};
  window.callWallet = ${callWallet};
  window.getHandler = function(callId) {
    var fn = window.walletHandlers[callId];
    delete window.walletHandlers[callId];
    return fn;
  }
`;
/**
 * ========dapp html作用域 end========
 */

module.exports = {
  updateWebViewRef,
  injectedJavaScript,
  webViewMessageHandler,
};
