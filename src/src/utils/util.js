export function formatDate(date, fmt) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  };
  // 转换为北京时间 GMT+8
  date = UTCToGMT8(date);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  const padLeftZero = str => {
    return ('00' + str).substr(str.length);
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}
/**
 * 转换为北京时间
 * @param {object} date
 */
export function UTCToGMT8(date) {
  // 这里的8是时区，东八区为北京时间，PS：东区为正数 西区为负数
  var timeOffsetInHours = (new Date().getTimezoneOffset() / 60) + 8;
  date.setHours(date.getHours() + timeOffsetInHours);
  return date;
}
/**
 *  获取两个时间的时间差 如1天2小时30分钟
 */
export function diffDate(date, today = new Date()) {
  if (!date) return;
  // date = date instanceof Date ? date : new Date(date.replace(/\-/g, '/'));
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (!(today instanceof Date)) {
    today = new Date(today);
  }
  var nw = 1000 * 24 * 60 * 60 * 7;
  var nd = 1000 * 24 * 60 * 60;
  var nh = 1000 * 60 * 60;
  var nm = 1000 * 60;
  // var ns = 1000;
  // 获得两个时间的毫秒时间差异
  var _diff = today.getTime() - date.getTime();
  // 计算差多少周
  var week = parseInt(_diff / nw);
  // 计算差多少天
  var day = parseInt(_diff / nd);
  // 计算差多少小时
  var hour = parseInt(_diff % nd / nh);
  // 计算差多少分钟
  var min = parseInt(_diff % nd % nh / nm);
  // 计算差多少秒//输出结果
  // var sec = diff % nd % nh % nm / ns;
  var diff;
  if (week > 0) {
    diff = formatDate(date, 'dd/MM/yyyy');
  } else if (day > 0) {
    diff = day + ' days ago';
  } else if (hour > 0) {
    diff = hour + ' hours ago';
  } else if (min > 0) {
    diff = min + ' mins ago';
  } else {
    diff = ' just now';
  }
  return diff;
}
/**
 * 深复制对象方法 //deepClone
 * @param  {obj} obj 复制的对象
 * @return {obj}     新的对象
 */
export function cloneObj(obj) {
  var newObj
  // 处理简单类型，null || undefined
  if (obj === null || typeof obj !== 'object') return obj;

  // 处理时间
  if (obj instanceof Date) {
    newObj = new Date();
    newObj.setTime(obj.getTime());
    return newObj;
  }

  if (obj instanceof Array) {
    newObj = [];
  } else {
    newObj = {};
  }
  for (var key in obj) {
    var val = obj[key];
    // newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
    newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
  }
  return newObj;
  // throw new Error('Unable to copy obj! Its type isn't supported.');
}

export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = decodeURI(window.location.search).substr(1).match(reg)
  var context = ''
  if (r != null) {
    context = r[2]
  }
  reg = null
  r = null
  return context == null || context === '' || context === 'undefined' ? '' : context
}
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
export function toUtf8(str) {
  var out, i, len, c;
  out = '';
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}

// 处理空和数字显示
export function handleValue(value, updown) {
  if (typeof (value) === 'undefined' || value === '-' || value === '' || value === null) {
    value = '- -'
  } else if (isRealNum(value)) {
    value = numberThousands(value)
  }
  // 加 减
  if (updown) {
    if (isRealNum(value) && Number(value) === 0) {
      return value
    } else if (isRealNum(value) && value.indexOf('+') === -1 && Number(value) > 0) {
      value = '+' + value
    }
  }
  return value
}

// 6位数字显示为100k || -100k
export function numberKb(number) {
  if (typeof (number) !== 'undefined' && number !== '' && number !== null && !isNaN(number)) {
    if (number >= 100000 || number <= -100000) {
      return numberThousands(parseInt(number / 1000)) + 'k'
    } else {
      return numberThousands(number);
    }
  } else {
    return handleValue(number)
  }
}
// 是否为数字
export function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (val === '' || val == null) {
    return false;
  }
  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
}
// 数字转千分位格式
export function numberThousands(value) {
  value = '' + value;
  let decimal = '';
  if (isRealNum(value)) {
    if (value.indexOf('.') !== -1) {
      const aNumber = value.split('.');
      value = aNumber[0]
      decimal = aNumber[1]
    }
    value = ('' + value).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    // (\d{1,3})是一个捕获分组，可以用$1来反向引用，
    // ?=(\d{3})+(?:$|\.)是正向断言，表示匹配1到3个数字后面必须跟3个数字，但不含最后的3个数字或者3个数字和小数点。
  }
  if (decimal) {
    value = value + '.' + decimal
  }
  return value
}

export function upDownClass(value) {
  // return num && num.indexOf('-') >= 0 ? '#45bd62' : '#FB404B'
  if (value && Number(value) > 0) {
    return 'color-up'
  } else if (value && Number(value) < 0) {
    return 'color-down'
  } else {
    return 'color-flat'
  }
}
// export function windowOnError() {
//   let handleOnError = function (msg, url, line, col, error) {
//     console.log(msg)
//     //没有URL不上报！上报也不知道错误
//     if (msg != 'Script error.' && !url) {
//       return true;
//     }
//     //采用异步的方式
//     //我遇到过在window.onunload进行ajax的堵塞上报
//     //由于客户端强制关闭webview导致这次堵塞上报有Network Error
//     //我猜测这里window.onerror的执行流在关闭前是必然执行的
//     //而离开文章之后的上报对于业务来说是可丢失的
//     //所以我把这里的执行流放到异步事件去执行
//     //脚本的异常数降低了10倍
//     setTimeout(function () {
//       var data = {};
//       //不一定所有浏览器都支持col参数
//       col = col || (window.event && window.event.errorCharacter) || 0;

//       data.url = url;
//       data.line = line;
//       data.col = col;
//       if (!!error && !!error.stack) {
//         //如果浏览器有堆栈信息
//         //直接使用
//         data.msg = error.stack.toString();
//       } else if (!!arguments.callee) {
//         //尝试通过callee拿堆栈信息
//         var ext = [];
//         var f = arguments.callee.caller,
//           c = 3;
//         //这里只拿三层堆栈信息
//         while (f && (--c > 0)) {
//           ext.push(f.toString());
//           if (f === f.caller) {
//             break; //如果有环
//           }
//           f = f.caller;
//         }
//         ext = ext.join(',');
//         data.msg = error.stack.toString();
//       }
//       //把data上报到后台！
//       console.log(data)
//       // 2.利用Image对象上报; 比Ajax方式简单，不需要借助任何第三方库。
//       (new Image()).src = location.origin + '/report?report=test';
//     }, 0);
//     return true;
//   }
//   window.onerror = handleOnError
// };

// export function errorHandler(error, vm) {
//   console.error('全局异常:');
//   // console.error(vm);
//   console.error(error);
//   // console.log(error);
//   setTimeout(function () {
//     // 2.利用Image对象上报; 比Ajax方式简单，不需要借助任何第三方库。
//     (new Image()).src = location.origin + '/report?report=test';
//   }, 0);
// };
