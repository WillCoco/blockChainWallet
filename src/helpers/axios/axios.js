
import axios from 'axios';
import _get from 'lodash/get';
// import _filter from 'lodash/filter';

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
  // todo: config
  // requestEncryptList

  return config;
});

/**
 * 响应拦截
 */
server.interceptors.response.use(
  (res = {}) => {
    const {url} = res.config || {};
    // const list = _filter(responseIgnoreList, (u) => url.match(u)) || [];
    // if (list.length !== 0) {
    //   return res;
    // }

    // 使用拦截器统一状态码处理
    const {code, message} = _get(res, 'data') || {};

    // 1.token过期 退出
    if (code === '13000') {
      server.resInterceptorsCallback['13000'] &&
      server.resInterceptorsCallback['13000']();
    }

    // 非200的显示服务器返回错误码
    if (code !== 200 && message) {
      // todo toast
    }

    return responseHandlers(res);
  },
  err => {
    return Promise.resolve(err);
  },
);

/**
 * 响应结果处理
 */
function responseHandlers(response) {
  return response;
}
