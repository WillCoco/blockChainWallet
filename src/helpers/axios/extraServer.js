/**
 * @author: Xu Ke
 * @date: 2019/12/31 7:05 PM
 * @Description: 额外扩展服务：获取交易历史等
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import axios from 'axios';
import _get from 'lodash/get';
import {Toast} from '../../components/Toast';
import i18n from '../i18n';
// import _filter from 'lodash/filter';

const extraServer = axios.create({
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
extraServer.interceptors.request.use(config => {
  // todo: config
  // requestEncryptList

  return config;
});

/**
 * 响应拦截
 */
extraServer.interceptors.response.use(
  (res = {}) => {
    const {url} = res.config || {};
    // const list = _filter(responseIgnoreList, (u) => url.match(u)) || [];
    // if (list.length !== 0) {
    //   return res;
    // }

    // 使用拦截器统一状态码处理
    const {status, data, error} = res || {};

    // console.log(res, 112222333)


    // 非200的显示服务器返回错误码
    // if (code !== 200) {
      // todo toast
    // }

    // console.log(_get(res, 'data'), '_get(res, \'data\')')

    const resultFormatted = {};
    resultFormatted.result = data;
    resultFormatted.code = status;

    if (error) {
      resultFormatted.error = error;
    }

    return responseHandlers(resultFormatted);
  },
  err => {
    if (String(err).match('Network Error')) {
      Toast.show({data: i18n.t('networkErr')});
    }
    return Promise.resolve(err);
  },
);

/**
 * 响应结果处理
 */
function responseHandlers(response) {
  return response;
}

module.exports = {
  extraServer,
};
