/**
 * @author: Xu Ke
 * @date: 2020/3/11 6:14 PM
 * @Description: 钱包web核心库
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
require('core-js');
require('regenerator-runtime/runtime.js');
const bitcoinjs = require('bitcoinjs-lib');
const chain33wallet = require('@hicks/wallet-base');
const {seed, sign} = chain33wallet;
const cryptoJs = require('crypto-js');

/**
 * 创建新钱包
 * @params: {object} params - 创建参数
 * @param: {number} params.[blockType] - 区块类型
 * @param: {number} params.callId - 调用序号
 * @param: {string} params.name - 钱包名
 * @param: {string} params.password - 密码
 * @param: {string} params.[prompt] - 备注
 * @returns: {object} accountInfo - 新钱包
 * @return: {string} accountInfo.encryptedPrivateKey - 私钥
 * @return: {string} accountInfo.encryptedMnemonic - 助记词sha256
 * @return: {string} accountInfo.passwordKey - 密码sha256
 * @return: {string} accountInfo.address - 钱包地址
 * @return: {string} accountInfo.name - 钱包名称
 * @return: {string} accountInfo.[prompt] - 备注
 */
// const wallet = createWallet({name: '123', password: '12333', coins})
// const recover = recoverWalletFromMnemonic({name: '123' ,mnemonic: wallet.result.mnemonic, password: '12333'});
//
// console.log(wallet, 'wallet')
// console.log(recover.result.address, 'recover')

function createWallet(params) {
  const {name, password, coins} = params || {};

  var mnemonic = seed.newMnemonicInEN();

  var coinsKey = Object.keys(coins);
  var r = {};
  coinsKey.forEach(function(coinKey) {
    var walletObj = seed.newWalletFromMnemonic(mnemonic, coins[coinKey].bip44Constant);
    var wallet = walletObj.newAccount(name);
    // 钱包名
    if (!r.name) {
      r.name = name;
    }
    // 助记词（临时内存备份验证）
    if (!r.tempMnemonic) {
      r.tempMnemonic = mnemonic
    }
    // 助记词（持久化加密备份验证）
    if (!r.encryptedMnemonic) {
      var encryptedMnemonicObj = encrypt({
        data: mnemonic,
        password: password
      });
      r.encryptedMnemonic = encryptedMnemonicObj.result;
    }
    // 加密后的私钥
    if (!r.encryptedPrivateKey) {
      var encryptedPrivateKeyObj = encrypt({
        data: wallet.hexPrivateKey,
        password: password
      });
      r.encryptedPrivateKey = encryptedPrivateKeyObj.result;
    }
    // 加密后的钱包管理密码
    if (!r.passwordKey) {
      r.passwordKey = cryptoJs.SHA256(params.password).toString();
    }
    // 第一个账户的utc、btc、bch、bsv地址
    if (!r.coins) {
      r.coins = {};
    }
    r.coins[coinKey] = {
      address: wallet.address
    };
  });

  return {
    callId: params.callId,
    result: r,
  };
}

/**
 * 助记词恢复钱包
 * @params: {json} params 参数
 * @parma: {string} params.mnemonic - 助记词
 * @parma: {string} params.mnemonic - 助记词
 * @returns: {object} accountInfo - 新钱包
 * @return: {string} accountInfo.encryptedPrivateKey - 私钥
 * @return: {string} accountInfo.passwordKey - 密码sha256
 * @return: {string} accountInfo.address - 钱包地址
 * @return: {string} accountInfo.name - 钱包名称
 * @return: {string} accountInfo.[prompt] - 备注
 */

function recoverWalletFromMnemonic(params) {
  console.log(params, 'params1')
  const {name, password, coins, mnemonic} = params || {};

  // var walletObj = seed.newWalletFromMnemonic(mnemonic);
  // console.log(walletObj, 'walletObj')

  var coinsKey = Object.keys(coins);
  var r = {};
  console.log(coinsKey, 'coinsKey')
  try {
    coinsKey.forEach(function(coinKey) {
      var walletObj = seed.newWalletFromMnemonic(mnemonic, coins[coinKey].bip44Constant);

      console.log(walletObj, '00000000000');

      var network =
        coins[coinKey].bip44Constant === 0x80000001
          ? bitcoinjs.networks.testnet
          : bitcoinjs.networks.mainnet;
      var wallet = walletObj.newAccount(name, network);
      // 钱包名
      if (!r.name) {
        r.name = name;
      }
      // 导入的不需要备份
      if (!r.backupCompleted) {
        r.backupCompleted = true;
      }
      // 助记词（临时内存备份验证）
      if (!r.tempMnemonic) {
        r.tempMnemonic = mnemonic;
      }
      // 助记词（持久化加密备份验证）
      if (!r.encryptedMnemonic) {
        var encryptedMnemonicObj = encrypt({
          data: mnemonic,
          password: password
        });
        r.encryptedMnemonic = encryptedMnemonicObj.result;
      }
      // 加密后的私钥
      if (!r.encryptedPrivateKey) {
        var encryptedPrivateKeyObj = encrypt({
          data: wallet.hexPrivateKey,
          password: password
        });
        r.encryptedPrivateKey = encryptedPrivateKeyObj.result;
      }
      // 加密后的钱包管理密码
      if (!r.passwordKey) {
        r.passwordKey = cryptoJs.SHA256(params.password).toString();
      }
      // 第一个账户的utc、btc、bch、bsv地址
      if (!r.coins) {
        r.coins = {};
      }
      r.coins[coinKey] = {
        address: wallet.address
      }
    });
    console.log(r, 'rrrrrr')
  } catch(err) {
    console.log(err, 'err')
  }
  return {
    callId: params.callId,
    result: r,
  };
}
/**
 * 密码AES解密
 * @params: {json} params 参数
 * @parma: {string} params.data - 加密数据
 * @parma: {string} params.password - 加密密码
 * @returns: {object}
 * @return: {string} object.result - 解密结果
 */
// const de = decrypt({data: wallet.result.encryptedMnemonic, password: "12333", callId: 17})
// const de = decrypt({
//   data: 'VTJGc2RHVmtYMTlUZXpyT3BWcXJyOU1sa3oxTkd6aWlmS09MU2hQWDBwd0MxS2NscU1QbjFTWlp1UW5tQXhVRDhGdXVZeEQwRDVmdW1PZmRYaXExYVFQMGluOVRhbCtlKyt2R2k3K3RvSnM9',
//   password: '11',
//   callId: 17
// })
// console.log(de, 'de111')

function decrypt(params) {
  // 加密数据不是8的整数倍 报错：malformed utf-8 data
  // console.log(params.data, 'bsq')

  var dataUtf8 = cryptoJs.enc.Base64.parse(params.data).toString(
    cryptoJs.enc.Utf8
  );

  var result = cryptoJs.AES.decrypt(dataUtf8, params.password).toString(
    cryptoJs.enc.Utf8
  );

  return {
    callId: params.callId,
    result: result,
  };
}

/**
 * AES加密
 * @params: {json} params 参数
 * @parma: {string} data - 待密数据
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
function encrypt(params) {
  // 加密数据不是8的整数倍 报错：malformed utf-8 data

  // 先加密
  var encrypted = cryptoJs.AES.encrypt(params.data, params.password).toString();

  // 再转bs64
  var result = cryptoJs.enc.Base64.stringify(
    cryptoJs.enc.Utf8.parse(encrypted)
  );

  return {
    callId: params.callId,
    result: result,
  };
}

/**
 * SHA256加密
 * @params: {object} params 参数
 * @parma: {string} params.data - 加密数据
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
function sha256(params) {
  var result = cryptoJs.SHA256(params.data).toString();
  return {
    callId: params.callId,
    result: result,
  };
}

/**
 * 签名交易
 * @params: {object} params 参数
 * @parma: {string} params.callId - 调用序号
 * @parma: {string} params.data - 未签名交易
 * @parma: {string} params.privateKey - 私钥
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
function signTx(params) {
  var signed = sign.signRawTransaction(params.data, params.privateKey);
  return {
    callId: params.callId,
    result: signed,
  };
}

// const e = encrypt({data: 'a12345', password: '123'});
// const d = decrypt({data: e.result, password: '123'});
// console.log(e, 111111);
// console.log(d, 222222);

/**
 * 助记词有效性验证
 * @params: {object} params 参数
 * @parma: {string} params.callId - 调用序号
 * @parma: {string} params.mnemonic - 助记词
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
// console.log(validateMnemonic({mnemonic: 'enjoy juice vicious join animal joke bean basic tongue child acid learn silly outdoor stereo'}));
function validateMnemonic(params) {
  var isEn = /^[A-Za-z]+$/.test(params.mnemonic.trim().split(/\s+/)[0]);
  var validateFn = isEn ? seed.validateMnemonicInEN : seed.validateMnemonicInCN;

  return {
    callId: params.callId,
    result: validateFn(params.mnemonic),
  };
}

/**
 * 监听RN webview 发送到 html5 的消息
 */
window.onload = function() {
  document.addEventListener("message", function (msg) {
    var data = safeParse(msg && msg.data) || {};
    var payloadAction = data.action;

    var action = pickerActions(payloadAction);

    var response;
    try {
      response = action(data);
      window.ReactNativeWebView.postMessage(safeStringify(response));
    } catch (error) {
      window.ReactNativeWebView.postMessage(safeStringify({
        actionType: payloadAction,
        error: error,
        callId: data.callId
      }));
    }
  });
};

function pickerActions(action) {
  switch (action) {
    case 'CREATE_WALLET':
      return createWallet;
    case 'AES_DECRYPT':
      return decrypt;
    case 'AES_ENCRYPT':
      return encrypt;
    case 'SHA_256':
      return sha256;
    case 'RECOVER_WALLET_FROM_MNEMONIC':
      return recoverWalletFromMnemonic;
    case 'SIGN_TX':
      return signTx;
    case 'VALID_MNEMONIC':
      return validateMnemonic;
    default:
      alert('UNDEFINED ACTION:' + action);
  }
}

function safeParse(json) {
  var data;
  try {
    data = JSON.parse(json);
  } catch (err) {
    alert('JSON.parse error');
  }
  return data;
}

function safeStringify(data) {
  var json;
  try {
    json = JSON.stringify(data);
  } catch (err) {
    alert('JSON.stringify error');
  }
  return json;
}

// module.exports = {
//   createWallet: createWallet,
//   recoverWalletFromMnemonic: recoverWalletFromMnemonic,
//   sha256: sha256,
//   encrypt: encrypt,
//   decrypt: decrypt,
//   signTx: signTx,
//   validateMnemonic: validateMnemonic,
// };
