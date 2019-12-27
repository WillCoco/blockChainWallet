/**
 * @author: Xu Ke
 * @date: 2019/12/24 7:04 PM
 * @Description: home context
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';

const home = {
  overlayVisible: false,
  setOverlayVisible: () => void 0,
  walletsList: [], // 钱包列表
  currentWallet: undefined, // 当前钱包
};

export default React.createContext(home);
