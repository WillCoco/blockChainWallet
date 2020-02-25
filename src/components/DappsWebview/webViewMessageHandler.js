/**
 * @author: Xu Ke
 * @date: 2020/2/25 4:55 PM
 * @Description: dapp 发送到钱包的事件处理器
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

const webViewMessageHandler = e => {
  const data = safeParse(e.nativeEvent.data) || {};
  console.log(data.action, 'action');
  console.log(data.payload, 'payload');

  switch (data.action) {
    case eventTypes.DAPP_QUICK_SEND:
      dappQuickSend(data.payload);
      break;
    default:
      Toast.show({data: 'unknown action' + data.action});
  }
};

/**
 * dapp 创建交易、输入密码、签名交易、发送交易
 */
async function dappQuickSend(data) {
  // 构造交易
  const unsignedTx = await createTransaction(data);
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
          const {result, error} = (await sendTransaction({tx: signedTx})) || {};

          console.log(result, 'result');

          return;
        }
      },
    },
  });
}

module.exports = webViewMessageHandler;
