/**
 * 钱包账户当前账户改变，可能触发的钱包操作：
 * 1. 导入、
 * 2. 无钱包时创建
 * 3. 切换钱包
 * 4. 删除钱包
 */
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import React, {useEffect, useRef} from 'react';

const defaultCurrentWallet = {};

function useWalletChanged(callback) {
  /**
   * 当前钱包
   */
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || defaultCurrentWallet,
  );

  console.log('useWalletToggle_start');
  const lastFocusedWallet = useRef(currentWallet);

  /**
   * 切换
   */
  useEffect(() => {
    console.log(lastFocusedWallet.current.id, 'lastFocusedWallet.current.id');
    console.log(currentWallet.id, 'currentWallet.id');
    if (lastFocusedWallet.current.id !== currentWallet.id) {
      console.log('useWalletToggle_toggled');
      callback(currentWallet);
    }
  }, [currentWallet, callback]);
}

export default useWalletChanged;
