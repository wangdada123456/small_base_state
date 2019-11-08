/**
 * Created by PanJiaChen on 16/11/18.
 */
import NodeRSA from 'node-rsa'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}
/**
 * JSEncrypt 
 */
export function getCode (data) {
  let key = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIRCGt7Pr4JZyDZi96palt9bokF9xhyeJ3WizbeXhBqyXRMyYy5jrvFUkBBL30xBOjoIz61hfH791rV6Y3igiFQFSB5ikbt4AKATOQETjAa+ur1lgchxa6tSXu39592gsVfdftyvI68/LBbkApdwjz81Y9FRARO9gXmuOMrToBZQIDAQAB\n' + '-----END PUBLIC KEY-----');
  key.setOptions({encryptionScheme: 'pkcs1'})
  let encryptKey = key.encrypt(data, 'base64')
  return encryptKey;
}

/**
 * 脱敏
 */
export function desensitization(str, beginLen, endLen){
    let len = str.length;
    endLen = endLen > 0 ? -endLen : endLen;
    let firstStr = str.substr(0, beginLen);
    let lastStr = str.substr(endLen);
    let middleStr = str.substring(beginLen, len-Math.abs(endLen)).replace(/[\s\S]/ig, '*');
    return firstStr+middleStr+lastStr;

}
