import _get from 'lodash/get';
import {createAxios} from './baseServer';
// import {server} from './server';
// import {extraServer} from './extraServer';

module.exports = {
  // rpc服务
  server: createAxios(),
  // 交易等冗余服务
  extraServer: createAxios({
    responseHandler: function(res) {
      const {status, data, error} = res || {};
      const resultFormatted = {};
      resultFormatted.result = data;
      resultFormatted.code = status;
      if (error) {
        resultFormatted.error = error;
      }
      return resultFormatted;
    },
  }),
  // btc
  btcServer: createAxios({
    responseHandler: function(res) {
      const {status, data, error} = res || {};
      const resultFormatted = {};
      resultFormatted.result = _get(data, 'data');
      resultFormatted.code = status;
      if (error) {
        resultFormatted.error = error;
      }
      return resultFormatted;
    },
  }),
};
