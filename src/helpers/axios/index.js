import _get from 'lodash/get';
import {createAxios} from './baseServer';
// import {extraServer} from './extraServer';

module.exports = {
  // rpc服务
  basicServer: createAxios(),
  server: createAxios({
    responseHandler: function(res) {
      const {url} = res.config || {};
      // 使用拦截器统一状态码处理
      const {message, result, error} = _get(res, 'data') || {};

      const resultFormatted = {};
      resultFormatted.result = result;

      if (error) {
        resultFormatted.error = error;
      }
      return resultFormatted;
    },
  }),
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

      console.log(res, 'btcServer');
      const resultFormatted = {};
      resultFormatted.result = data;
      resultFormatted.code = status;
      if (error) {
        resultFormatted.error = error;
      }
      return resultFormatted;
    },
    requestHandler: function(config) {
      console.log(config, '====111');
      return config;
    },
  }),
};
