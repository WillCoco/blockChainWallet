/**
 * @author: Xu Ke
 * @date: 2020/1/2 8:56 PM
 * @Description:  数字处理
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import BigNumber from 'bignumber.js';

/**
 * 升单位，美化，逢3加','
 */
const defaultOptions = {
  defaultValue: '0',
  scale: 100000000,
};

export function upperUnit(number, options) {
  const opts = {...defaultOptions, ...options};

  if (!number) {
    return opts.defaultValue;
  }
  const decimals = BigNumber(number);
  return decimals.div(opts.scale).toFormat();
}
