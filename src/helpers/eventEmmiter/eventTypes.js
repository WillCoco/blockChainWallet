/**
 * @author: Xu Ke
 * @date: 2019/12/26 10:09 PM
 * @Description: Event事件名
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
module.exports = {
  POST_WEB_VIEW: 'POST-POST_WEB_VIEW', // 向webView转发
  CREATE_WALLET: 'CREATE_WALLET', // 创建钱包
  RECOVER_WALLET_FROM_MNEMONIC: 'RECOVER_WALLET_FROM_MNEMONIC', // 助记词导入
  AES_DECRYPT: 'AES_DECRYPT', // AES解密
  AES_ENCRYPT: 'AES_ENCRYPT', // AES加密
  SHA_256: 'SHA_256', // sha256加密
  SIGN_TX: 'SIGN_TX', // 签名交易
  VALID_MNEMONIC: 'VALID_MNEMONIC', // 助记词验证
};
