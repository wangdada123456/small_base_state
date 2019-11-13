/**
 * api接口的统一出口
 */
import {get,post} from '../utils/http'

function fmtParam(params){
  let str = '';
  for(let i in params) {
    str = i + '=' + params[i] + '&' + str;
  }
  str = str.substring(0,str.length-1);
  return str;
}

const login = {
  //获取验证码
  getCaptcha(uuid){
     return `/admin/yzm?d=${uuid}`
  },
  //登录
  signIn(param) {
    return post(`/admin/login`, param)
  },
  //登出
  signOut() {
    return post(`/sys/logout`)
  },
   // 获取导航菜单列表 / 权限
   nav (param) {
    return get(`/sys/menu/nav`, {
      params: param
    })
  },
  creatTaskArea(param){
    return post(`/v1/adt_api/creat_task_area`, param)
  },
};

const home  = {
  
};



export default {
  login,
  home,
}

