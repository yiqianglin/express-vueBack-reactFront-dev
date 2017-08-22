/*
 * 工具函数集合
 */
import axios from 'axios';
import protobuf from 'protobufjs';
import { urlProtoMap } from 'utils/utilsData';
import district from 'utils/cityCodeData';
import crypto from 'crypto';

/**
 * 生成sign值
 * @example
 * const sign = getSign('/weipan/xx.htm',params,'POST')
 *
 * @param {string} url ajax请求路径
 * @param {Object} params ajax请求参数
 * @param {string} method ajax请求方法
 * @returns {string} 返回加密好的sign值
 */
export function getSign(url, params, method) {
  const requestMethod = method ? method.toUpperCase() : 'POST';
  let key = '5sMYSJD40Py5R1lH7Rq2Io34zHGYDIry';
  if (_ENV_ === 'PROD' && location.hostname === 'www.weitrades.com') {
    key = 'tyUdBYqG8ec8K30LpDIwAdJb36dIhzpKDW5SrNH3FWlERwaST6gYnQS0CoLVwqsx';
  }
  const paramStr = queryUtil.toQueryString(params, false);
  const message = `${requestMethod}:${url.replace(/.*(\/game\/.*\.htm$)/, '$1')}:${paramStr}`;
  return crypto
    .createHmac('sha1', key)
    .update(message)
    .digest()
    .toString('base64')
    .replace(/(\+|\s)/g, '/');
}

/**
 * 将buffer数据转换为json格式
 * @example
 * const json = bufferToJson(buf,'GetServerTime')
 *
 * @param {ArrayBuffer} buf buffer数据
 * @param {string} protoType proto文件名
 * @returns {Object}
 */
export function bufferToJson(buf, protoType) {
  return protobuf
    .loadProtoFile(`${contentPath}/proto/${protoType}.proto?st=${pt}`)
    .build(`${urlProtoMap[protoType].proto}`)
    .decode(buf);
}

/**
 * ajax请求函数
 * @example
 * const data = await request('GetServerTime', params)
 *
 * @param {string} prototype protobuffer类型
 * @param {Object} params ajax请求参数
 * @param {string} method ajax请求方法
 * @returns {Promise} 返回promise对象
 */
export function request(prototype, params, method, timeout = 60000) {
  const requestUrl = `${urlProtoMap[prototype].url}`;
  const reqParams = params;
  let paramStr = '';
  if (params) {
    const sign = getSign(urlProtoMap[prototype].url, params, method);
    reqParams.sign = sign;
    paramStr = queryUtil.toQueryString(params, false);
  }
  return axios
    .post(requestUrl, paramStr, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeout
    })
    .then((response) => {
      const data = bufferToJson(response.data, prototype);
      console.groupCollapsed(prototype);
      console.table(data);
      console.groupEnd();
      if (data.code !== '200') {
        const errorData = {
          ...data,
          url: urlProtoMap[prototype].url,
          params: reqParams,
          method: method || 'POST'
        };
        return errorData;
      }
      return data;
    })
    .catch((error) => {
      const errorData = {
        code: '-1',
        msg: error.response ? error : error.message,
        url: urlProtoMap[prototype].url,
        params: reqParams,
        method: method || 'POST'
      };
      console.groupCollapsed(prototype);
      console.table(errorData);
      console.groupEnd();
      return errorData;
    });
}

/**
 * ajax表单请求函数
 * @example
 * const data = await requestForm('GetServerTime', params)
 *
 * @param {string} prototype protobuffer类型
 * @param {Object} params ajax请求参数
 * @param {string} method ajax请求方法
 * @returns {Object} 返回promise对象
 */
export function requestForm(prototype, params, method) {
  const requestUrl = `${urlProtoMap[prototype].url}`;
  const reqParams = params;
  if (params) {
    const sign = getSign(urlProtoMap[prototype].url, params, method);
    reqParams.sign = sign;
  }
  const form = new FormData();
  for (const key in reqParams) {
    if (Object.prototype.hasOwnProperty.call(reqParams, key)) {
      form.append(key, params[key]);
    }
  }
  return axios
    .post(requestUrl, form, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      const data = bufferToJson(response.data, prototype);
      if (data.code !== '200') {
        return {
          code: data.code,
          msg: data.msg,
          url: urlProtoMap[prototype].url,
          params: reqParams,
          method: method || 'POST'
        };
      }
      console.groupCollapsed(prototype);
      console.table(data);
      console.groupEnd();
      return data;
    });
}

/**
 * 设置微信title
 * @example
 * const timeArray = setWechatTitle('title')
 *
 * @param {string} title 要设置的微信title
 */
export function setWechatTitle(title) {
  document.title = title;
  const agent = navigator.userAgent.toLowerCase();
  // 兼容ios微信
  if (/iphone|ipad|ipod/.test(agent)) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', '/favicon.ico');
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
  window.show = () => title;
  try {
    window.demo && window.demo.setTitleText(title);
  } catch (e) {
    console.log(e);
  }
}

/**
 * 日期格式化
 * @example
 * const dateStr = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
 *
 * @param {date} date 格式化的日期对象
 * @param {string} fmt 格式化字符串
 * @return {string} 已格式化的日期字符串
 */
export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  let format = fmt;
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
}

/**
 * 秒数格式化函数
 * @example
 * const dateStr = formatSeconds(60)
 * dateStr => '01:00'
 *
 * @param {number} seconds 格式化的秒数
 * @return {string} 已格式化的时间字符串mm:ss
 */
export function formatSeconds(seconds) {
  const minStr = Math.floor(seconds / 60);
  const secStr = Math.floor(seconds % 60);
  return `${minStr < 10 ? '0' : ''}${minStr} : ${secStr < 10 ? '0' : ''}${secStr}`;
}

/**
 * 对象取值函数
 * @example
 * const value = getIn([a, b], {a: {b: 0}}}, 1)
 * dateStr => 0
 *
 * @param {array} props 所取对象属性数组
 * @param {obect} obj 所取对象
 * @param {any} defaultValue 没有该属性时返回的默认值
 * @return {any} 对象内属性值
 */
export function getIn(props, obj, defaultValue) {
  return props.reduce((xs, x) => {
    if (xs && xs[x]) return xs[x];
    return defaultValue;
  }, obj);
}

/**
 * 获取url参数
 * getUrlParameter()
 */
export function getUrlParameter() {
  const url = location.search;
  const theRequest = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i += 1) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

/**
 * 金额中文格式化（万）
 * s, dotLength 小数点后几位
 */
export function formatMoneyToWan(num, dotLength) {
  let s = num;
  if (/[^0-9]+/.test(s)) return '0';
  if (s == null || s === '') return '0';
  if (s < 10000) {
    return s;
  }
  s = s * 100 / 10000 / 100;
  s = s.toString();
  if (!/\./.test(s)) {
    return `${s}万`;
  }
  if (dotLength !== 0) {
    const a = s.split('.')[0];
    let b = String(s.split('.')[1]);
    if (b.length < dotLength) {
      b += Array(dotLength - b.length + 1).join(0);
    }
    s = `${a}.${b.substr(0, dotLength)}`;
  } else {
    s = s.split('.')[0];
  }
  return `${s}万`;
}

/**
 * 城市代号转换成省市
 * 必须传入省，市代号，减少递归查询
 */
export function cityCode2cityName(provinceCode, cityCode) {
  const result = {};
  for (const i in district) {
    if (district[i].value === provinceCode) {
      for (const j in district[i].children) {
        if (district[i].children[j].value === cityCode) {
          result.provinceName = district[i].label;
          result.cityName = district[i].children[j].label;
          return result;
        }
      }
    }
  }
  return result;
}

/**
 * 金额按千位逗号分割
 *
 * @param {string} s 数值
 * @param {1||0} type 是否带小数
 * @returns {object} 返回promise对象
 */
export function formatMoney(t, type) {
  let s = t;
  if (/^[0-9]\./.test(s)) return '0';
  if (s == null || s === '') return '0';
  s = s.toString().replace(/^(\d*)$/, '$1.');
  s = `${s}00`.replace(/(\d*\.\d\d)\d*/, '$1');
  s = s.replace('.', ',');
  const re = /(\d)(\d{3},)/;
  while (re.test(s)) {
    s = s.replace(re, '$1,$2');
  }
  s = s.replace(/,(\d\d)$/, '.$1');
  if (type === 0) {
    // 不带小数位(默认是有小数位)
    const a = s.split('.');
    if (a[1] === '00') {
      s = a[0];
    }
  }
  return s;
}

/**
 * 判断是不是微信浏览器
 */
export function isWeixinBrowser() {
  return /micromessenger/.test(navigator.userAgent.toLowerCase());
}
