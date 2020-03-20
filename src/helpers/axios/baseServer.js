/**
 * @author: Xu Ke
 * @date: 2019/12/31 7:05 PM
 * @Description: 区块链上基础服务
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import axios from 'axios';
import _get from 'lodash/get';
import {Toast} from '../../components/Toast';
import i18n from '../i18n';
// import _filter from 'lodash/filter';

function createAxios({
  responseHandler,
  requestHandler,
} = {}) {
  const server = axios.create({
    headers: {
      ['Content-Type']: 'application/json',
    },
    retry: 3,
    retryDelay: 1000,
    timeout: 1000 * 30,
  });

  /**
   * 请求拦截
   */
  server.interceptors.request.use(config => {
    let finallyConfig;
    if (requestHandler) {
      finallyConfig = requestHandler(config);
    }
    return finallyConfig || config;
  });

  /**
   * 响应拦截
   */
  if (responseHandler) {
    server.interceptors.response.use(responseHandler, err => {
      if (String(err).match('Network Error')) {
        Toast.show({data: i18n.t('networkErr')});
      }

      return Promise.resolve({
        errorMessage: _get(err, ['response', 'data', 'error', 'message']),
        code: _get(err, ['response', 'status']),
      });
    });
  }

  return server;
}

module.exports = {
  createAxios,
};
