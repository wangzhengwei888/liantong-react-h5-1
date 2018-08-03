//开发环境获取url
const domain = location.host + '/biopapi';

//图片地址
export const IMAGE_DOMAIN = 'http://img.gydspt.com/';

//接口配置
export const SERVER_DOMAIN = 'http://61.50.254.246/biopapi';
//模拟token
export const TOKEN = 'EAD2342ED452DA3223';
export function getFullUrl(requestUrl) {
  //相对路径url   本地开发调试用这个！！！！！
  let url = location.protocol + '//' + domain;
  //绝对路径url   服务器上线部署方式用这个！！！！
  // let url = SERVER_DOMAIN;
  if (requestUrl.startsWith("/")) {
    url = url + requestUrl;
  } else {
    url = url + "/" + requestUrl;
  }
  return url;
}

export function isWechat() {
  return navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isQQ() {
  return navigator.userAgent.indexOf('QQ') > -1;
}

/**
 * 去登录
 * @param {登录成功后返回的页面} callBack
 */

export function gotoLogin(callBack) {
    if (callBack) {
      window.location.href = `login.html#/?callBack=${callBack}`;
    } else {
      window.location.href = 'login.html';
    }
    return;
}

/**
 * 去登录回调
 */
export function gotoLoginAndBack() {
  // 获取当前URL,作为登录回调
  const currentUrl = window.location.href;
  gotoLogin(encodeURIComponent(currentUrl));
}


