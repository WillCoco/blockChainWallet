/**
 * @author: Xu Ke
 * @date: 2020/1/2 8:56 PM
 * @Description:  数字处理
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import BigNumber from 'bignumber.js';
import {chainInfo} from '../../config';

/**
 * 升单位，美化，逢3加','
 */
export function upperUnit(number, options) {
  const defaultOptions = {
    defaultValue: '0',
    pretty: true,
    scale: chainInfo.digits,
  };
  const opts = {...defaultOptions, ...options};

  if (!number) {
    return opts.defaultValue;
  }
  const decimals = BigNumber(number);

  return opts.pretty
    ? decimals.shiftedBy(-opts.scale).toFormat()
    : decimals.shiftedBy(-opts.scale).toString();
}

/**
 * 降到最小单位
 * @return {number} 结果
 */
export function lowerUnit(number, options) {
  const defaultOptions = {
    defaultValue: '0',
    scale: chainInfo.digits,
    needInteger: true, // 返回整数
  };
  const opts = {...defaultOptions, ...options};

  if (!number) {
    return opts.defaultValue;
  }

  const decimals = BigNumber(number);
  console.log(opts.needInteger)
  if (opts.needInteger) {
    return parseInt(decimals.shiftedBy(opts.scale).toNumber(), 10);
  }

  return decimals.shiftedBy(opts.scale).toNumber();
}

/**
 * 字符串是否是纯数字
 */
export const isValidNumeric = value => {
  return !/[.].*[.]/.test(value) && /^[\d.]*$/.test(value);
};

/**
 * 字符串是否是整数纯数字
 */
export const isValidInteger = value => {
  return /^\d*$/.test(value);
};
