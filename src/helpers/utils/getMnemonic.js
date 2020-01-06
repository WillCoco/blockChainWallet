import _filter from 'lodash/get';

export const getMnemonicArray = data => {
  if (typeof data === 'string') {
    return data.trim().split(/\s+/);
  }

  return _filter(data, o => !/^\s+$/.test(o));
};

export const getMnemonicString = data => {
  return getMnemonicArray(data).join(' ');
};
