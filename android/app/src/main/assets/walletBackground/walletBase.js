/**
 * @author: Xu Ke
 * @date: 2019/12/25 11:26 PM
 * @Description: chain33
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

// window.chain33Rpc
// window.bip39
// window.chain33Wallet
var isBrowser = this.toString() === '[object Window]';
var globalObj = isBrowser ? window : global;

var seed = isBrowser
  ? globalObj.chain33Wallet.seed
  : require('./lib/chain33wallet').seed;
var sign = isBrowser
  ? globalObj.chain33Wallet.sign
  : require('./lib/chain33wallet').sign;
var bip39 = isBrowser ? globalObj.bip39 : require('./lib/bip39');
var cryptoJs = isBrowser ? globalObj.cryptoJs : require('./lib/crypto');
var chain33Wallet = isBrowser
  ? globalObj.chain33Wallet
  : require('./lib/chain33wallet');


// console.log(seed.newWalletFromMnemonic('代 牧 的 谈 佛 古 祸 克 彼 喊 腿 劝 册 抵 遂'), 'sedddd')
// console.log(bip39.generateMnemonic(null, ), 'bip39')
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
// const wallet = createWallet({name: '123', password: '12333'})
// const recover = recoverWalletFromMnemonic({name: '123' ,mnemonic: wallet.result.mnemonic, password: '12333'});
//
// console.log(wallet.result.address, 'wallet')
// console.log(recover.result.address, 'recover')

function createWallet(params) {
  var mnemonic = seed.newMnemonicInEN();
  const walletObj = seed.newWalletFromMnemonic(mnemonic);

  const wallet = walletObj.newAccount(params.name);

  const accountInfo = {};
  accountInfo.name = wallet.name;

  // 第一个账户的地址
  accountInfo.address = wallet.address;

  // 助记词（临时内存备份验证）
  accountInfo.tempMnemonic = mnemonic;

  // 助记词（持久化加密备份验证）
  console.log(mnemonic, 'mnemonic')
  const encryptedMnemonicObj = encrypt({
    data: mnemonic,
    password: params.password,
  });
  accountInfo.encryptedMnemonic = encryptedMnemonicObj.result;

  // 加密后的私钥
  const encryptedPrivateKeyObj = encrypt({
    data: wallet.hexPrivateKey,
    password: params.password,
  });
  accountInfo.encryptedPrivateKey = encryptedPrivateKeyObj.result;

  // 加密后的钱包管理密码
  accountInfo.passwordKey = cryptoJs.SHA256(params.password).toString();
  // console.log(accountInfo, '新创建账户');

  return {
    callId: params.callId,
    result: accountInfo,
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
// const w = recoverWalletFromMnemonic({
//   mnemonic: 'enjoy juice vicious join animal joke bean basic tongue child acid learn silly outdoor stereo',
//   name: '123',
//   password: '123',
// });
//
// console.log(w, 'w')

function recoverWalletFromMnemonic(params) {
  const walletObj = seed.newWalletFromMnemonic(params.mnemonic);
  // todo: 是否recover遍历底下n个, 目前只使用第一个账户
  const wallet = walletObj.genAccount(0, params.name);
  // console.log(walletObj, 'walletObj')
  // console.log(wallet, 'wallet')

  const accountInfo = {};
  accountInfo.name = wallet.name;
  accountInfo.address = wallet.address;
  accountInfo.backupCompleted = true; // 导入的不需要备份

  // 助记词（持久化加密备份验证）
  const encryptedMnemonicObj = encrypt({
    data: params.mnemonic,
    password: params.password,
  });
  accountInfo.encryptedMnemonic = encryptedMnemonicObj.result;

  // 加密后的私钥
  const encryptedPrivateKeyObj = encrypt({
    data: wallet.hexPrivateKey,
    password: params.password,
  });
  accountInfo.encryptedPrivateKey = encryptedPrivateKeyObj.result;
  // console.log(accountInfo.encryptedPrivateKey, 'accountInfo.encryptedPrivateKey')
  accountInfo.passwordKey = cryptoJs.SHA256(params.password).toString(); // 加密后的钱包管理密码

  return {
    callId: params.callId,
    result: accountInfo,
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

  const dataUtf8 = cryptoJs.enc.Base64.parse(params.data).toString(
    cryptoJs.enc.Utf8,
  );

  const result = cryptoJs.AES.decrypt(dataUtf8, params.password).toString(
    cryptoJs.enc.Utf8,
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
  let encrypted = cryptoJs.AES.encrypt(params.data, params.password).toString();

  // 再转bs64
  const result = cryptoJs.enc.Base64.stringify(
    cryptoJs.enc.Utf8.parse(encrypted),
  );

  return {
    callId: params.callId,
    result,
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
  const result = cryptoJs.SHA256(params.data).toString();
  return {
    callId: params.callId,
    result,
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
  const signed = sign.signRawTransaction(params.data, params.privateKey);
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
 * @parma: {string} params.privateKey - 私钥
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
// console.log(validateMnemonicInCN({mnemonic: '代 牧 的 谈 佛 古 祸 克 彼 喊 腿 劝 册 抵 遂'}));
function validateMnemonic(params) {
  const isEn = /^[A-Za-z]+$/.test(params.mnemonic);
  var validateFn = isEn ? seed.validateMnemonicInEN : seed.validateMnemonicInCN;

  return {
    callId: params.callId,
    result: validateFn(params.mnemonic),
  };
}

globalObj.walletBase = {
  createWallet,
  recoverWalletFromMnemonic,
  sha256,
  encrypt,
  decrypt,
  signTx,
  validateMnemonic,
};

//
// let newUserInfo = seed.newMnemonicInCN();
// //加密数据
// let encJson = cryptoJs.AES.encrypt(newUserInfo, '12333').toString();
// //对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
// let encData = cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(encJson));
//
// //将数据先base64还原，再转为utf8数据
// let decData = cryptoJs.enc.Base64.parse(encData).toString(cryptoJs.enc.Utf8);
// //解密数据
// let decJson = cryptoJs.AES.decrypt(decData, '12333').toString(cryptoJs.enc.Utf8);
//
// console.log(decData, 'decData')
// console.log(decJson, 'decJson')