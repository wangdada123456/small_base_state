import axios from 'axios'
import {Message} from 'element-ui'

// 请求超时时间
axios.defaults.timeout = 1000000;
// 请求baseURL
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
            type: 'warning'
          });
          break;
        case 500:
          Message({
            message: '服务器出错',
            duration: 1500,
            type: 'error'
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            duration: 1500,
            type: 'error'
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url,params) =>{
  return new Promise((resolve,reject)=>{
    axios.get(url,params).then(
      res=>{
        resolve(res.data)
      }).catch(
        err=>{
          reject(err.data)
        }
      )
  })
}

export const post = (url,param) =>{
  return new Promise((resolve,reject)=>{
    axios.post(url, param).then(
      res=>{
        resolve(res.data)
      }).catch(
        err=>{
          reject(err.data)
        }
      );
  })
};
