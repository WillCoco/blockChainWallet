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

var seed = window.chain33Wallet.seed;
var sign = window.chain33Wallet.sign;
var bip39 = window.bip39;
var cryptoJs = window.cryptoJs;
var chain33Wallet = window.chain33Wallet;

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
  var mnemonic = seed.newMnemonicInCN();
  const walletObj = seed.newWalletFromMnemonic(mnemonic);

  const wallet = walletObj.newAccount(params.name);

  const accountInfo = {};
  accountInfo.name = wallet.name;

  // 第一个账户的地址
  accountInfo.address = wallet.address;

  // 助记词（临时内存备份验证）
  accountInfo.tempMnemonic = mnemonic;

  // 助记词（持久化加密备份验证）
  accountInfo.encryptedMnemonic = cryptoJs.AES.encrypt(
    walletObj.mnemonic,
    params.password,
  ).toString();

  // 加密后的私钥
  accountInfo.encryptedPrivateKey = cryptoJs.AES.encrypt(
    wallet.hexPrivateKey,
    params.password,
  ).toString();

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
 * @parma: {string} mnemonic - 助记词
 * @returns: {object} accountInfo - 新钱包
 * @return: {string} accountInfo.encryptedPrivateKey - 私钥
 * @return: {string} accountInfo.passwordKey - 密码sha256
 * @return: {string} accountInfo.address - 钱包地址
 * @return: {string} accountInfo.name - 钱包名称
 * @return: {string} accountInfo.[prompt] - 备注
 */
function recoverWalletFromMnemonic(params) {
  const walletObj = seed.newWalletFromMnemonic(params.mnemonic);
  // todo: 是否recover遍历底下n个, 目前只使用第一个账户
  const wallet = walletObj.genAccount(0, params.name);
  // console.log(walletObj, 'walletObj')
  // console.log(wallet, 'wallet')

  const accountInfo = {};
  accountInfo.name = wallet.name;
  accountInfo.address = wallet.address;
  // accountInfo.mnemonic = params.mnemonic;
  // 加密后的私钥
  accountInfo.encryptedPrivateKey = cryptoJs.AES.encrypt(
    wallet.hexPrivateKey,
    params.password,
  ).toString();
  // console.log(accountInfo.encryptedPrivateKey, 'accountInfo.encryptedPrivateKey')
  accountInfo.passwordKey = cryptoJs.SHA256(params.password).toString(); // 加密后的钱包管理密码

  return {
    callId: params.callId,
    result: accountInfo,
  };
}

/**
 * AES加密
 * @params: {json} params 参数
 * @parma: {string} data - 待密数据
 * @returns: {object}
 * @return: {string} object.result - 加密结果
 */
function decrypt(params) {
  const result = cryptoJs.AES.decrypt(params.data, params.password).toString(
    cryptoJs.enc.Utf8,
  );

  return {
    callId: params.callId,
    result,
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
function encrypt(params) {
  const result = cryptoJs.AES.encrypt(params.data, params.password).toString();

  return {
    callId: params.callId,
    result,
  };
}

const e = encrypt({data: 'a12345', password: '123'});
const d = decrypt({data: e.result, password: '123'});
console.log(e, 111111);
console.log(d, 222222);

window.walletBase = {
  createWallet,
  recoverWalletFromMnemonic,
};
