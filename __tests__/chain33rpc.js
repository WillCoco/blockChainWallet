/**
 * @format
 */
import {getAddressTokens, getServerTime} from '../src/helpers/chain33';

it('getServerTime', async () => {
  const a = await getServerTime();
  expect(a.result).toBeTruthy();
});

it('getAddressTokens', async () => {
  const a = await getAddressTokens({
    address: '161npt3i4gAN7JCuQjeZsTEGekZiRCpz5f',
  });
  expect(a.result).toBeTruthy();
});
