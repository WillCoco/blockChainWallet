// /**
//  * @author: Xu Ke
//  * @date: 2019/12/25 11:26 PM
//  * @Description: chain33
//  * @lastModificationBy:
//  * @lastModification:
//  * @lastModificationDate:
//  */
// import {seed, sign} from '@33cn/wallet-base';
// // import CryptoJS, {SHA256} from 'crypto-js';
// import Rpc from '@33cn/chain33-rpc-api';
//
// /**
//  * 创建新钱包
//  * @params: {object} params - 创建参数
//  * @param: {number} params.[blockType] - 区块类型
//  * @param: {string} params.name - 钱包名
//  * @param: {string} params.password - 密码
//  * @param: {string} params.[prompt] - 备注
//  * @returns: {object} accountInfo - 新钱包
//  * @return: {string} accountInfo.encryptedPrivateKey - 私钥
//  * @return: {string} accountInfo.passwordKey - 密码sha256
//  * @return: {string} accountInfo.address - 钱包地址
//  * @return: {string} accountInfo.name - 钱包名称
//  * @return: {string} accountInfo.[prompt] - 备注
//  */
// export function createWallet(params) {
//   const mnemonic = seed.newMnemonicInCN();
//   const walletObj = seed.newWalletFromMnemonic(mnemonic);
//
//   const wallet = walletObj.newAccount(params.name);
//
//   const accountInfo = {};
//   accountInfo.name = wallet.name;
//   accountInfo.address = wallet.address; // 第一个账户的地址
//   // accountInfo.mnemonic = mnemonic;
//   // 加密后的私钥
//   // accountInfo.encryptedPrivateKey = CryptoJS.AES.encrypt(
//   //   walletObj.masterKey,
//   //   params.password,
//   // );
//   // accountInfo.passwordKey = SHA256(params.password).toString(); // 加密后的钱包管理密码
//
//   return accountInfo;
// }
//
// /**
//  * 助记词恢复钱包
//  * @params: {json} params 参数
//  * @parma: {string} mnemonic - 助记词
//  * @returns: {object} accountInfo - 新钱包
//  * @return: {string} accountInfo.encryptedPrivateKey - 私钥
//  * @return: {string} accountInfo.passwordKey - 密码sha256
//  * @return: {string} accountInfo.address - 钱包地址
//  * @return: {string} accountInfo.name - 钱包名称
//  * @return: {string} accountInfo.[prompt] - 备注
//  */
// export function recoverWalletFromMnemonic(params) {
//   const walletObj = seed.newWalletFromMnemonic(params.mnemonic);
//   // todo: 是否recover遍历底下n个
//   const wallet = walletObj.genAccount(0, params.name);
//   const accountInfo = {};
//   accountInfo.name = wallet.name;
//   accountInfo.address = wallet.address;
//   // accountInfo.mnemonic = params.mnemonic;
//   // 加密后的私钥
//   // accountInfo.encryptedPrivateKey = CryptoJS.AES.encrypt(
//   //   walletObj.masterKey,
//   //   params.password,
//   // );
//   // accountInfo.passwordKey = SHA256(params.password).toString(); // 加密后的钱包管理密码
//
//   return accountInfo;
// }
