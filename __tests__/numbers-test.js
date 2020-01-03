/**
 * @format
 */
import {upperUnit} from '../src/helpers/utils/numbers';

it('数字单位转换', () => {
  expect(upperUnit(100000000)).toBe('1');
});

it('美化', () => {
  expect(upperUnit('100000000', {scale: 1})).toBe('100,000,000');
  expect(upperUnit(100000000.12345678, {scale: 1})).toBe(
    '100,000,000.12345678',
  );
});

