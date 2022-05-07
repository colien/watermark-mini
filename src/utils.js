
function isObject(obj){
  return Object.prototype.toString.call(obj) == "[object Object]" && obj !== null;
}

exports.isObject = isObject;

function isFun(fn){
  return Object.prototype.toString.call(fn) == "[object Function]";
}
exports.isFun = isFun;

function isArray(arr) {
  return Object.prototype.toString.call(arr) == "[object Array]";
}
exports.isArray = isArray;

function isString(str){
  return Object.prototype.toString.call(str) == "[object String]";
}
exports.isString = isString;

function isNumber(num){
  return Object.prototype.toString.call(num) == "[object Number]";
}
exports.isNumber = isNumber;

function isDate(date){
  return date instanceof Date;
}
exports.isDate = isDate

function isNull(val){
  return Object.prototype.toString.call(val) == "[object Null]";
}

function isUndefined(val){
  return Object.prototype.toString.call(val) == "[object Undefined]";
}

function getUUId() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
exports.getUUId = getUUId;

//兼IE6~8 indexOf()
if ( !Array.prototype.indexOf ) {
  Array.prototype.indexOf = function ( ele ) {
      // 获取数组长度
      var len = this.length;
      // 检查值为数字的第二个参数是否存在，默认值为0
      var fromIndex = Number( arguments[ 1 ] ) || 0;
      // 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
      if ( fromIndex < 0 ) {
          fromIndex += len;
      }
      // 从fromIndex起循环数组
      while ( fromIndex < len ) {
          // 检查fromIndex是否存在且对应的数组元素是否等于ele
          if ( fromIndex in this && this[ fromIndex ] === ele ) {
              return fromIndex;
          }
          fromIndex++;
      }
      // 当数组长度为0时返回不存在的信号：-1
      return -1;
  }
}
//兼IE6~8 forEach()
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback ) {
      // 获取数组长度
      var len = this.length;
      if ( typeof callback != "function" ) {
          throw new TypeError();
      }
      // thisArg为callback 函数的执行上下文环境
      var thisArg = arguments[ 1 ];
      for ( var i = 0; i < len; i++ ) {
          if ( i in this ) {
              // callback函数接收三个参数：当前项的值、当前项的索引和数组本身
              callback.call( thisArg, this[ i ], i, this );
          }
      }
  }
}
//兼IE6~8 map()
if ( !Array.prototype.map ) {
  Array.prototype.map = function ( callback ) {
      // 获取数组长度
      var len = this.length;
      if ( typeof callback != "function" ) {
          throw new TypeError();
      }
      // 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
      var newArr = new Array( len );
      // thisArg为callback 函数的执行上下文环境
      var thisArg = arguments[ 1 ];
      for ( var i = 0; i < len; i++ ) {
          if ( i in this ) {
              newArr[ i ] = callback.call( thisArg, this[ i ], i, this );
          }
      }
      return newArr;
  }
}
//兼IE6~8 filter()
if ( !Array.prototype.filter ) {
  Array.prototype.filter = function ( callback ) {
      // 获取数组长度
      var len = this.length;
      if ( typeof callback != "function" ) {
          throw new TypeError();
      }
      // 创建新数组，用于承载经回调函数修改后的数组元素
      var newArr = new Array();
      // thisArg为callback 函数的执行上下文环境
      var thisArg = arguments[ 1 ];
      for ( var i = 0; i < len; i++ ) {
          if ( i in this ) {
              if ( callback.call( thisArg, this[ i ], i, this ) ) {
                  newArr.push( val );
              }
          }
      }
      return newArr;
  }
}
//兼IE6~8 some()
if ( !Array.prototype.some ) {
  Array.prototype.some = function ( callback ) {
      // 获取数组长度
      var len = this.length;
      if ( typeof callback != "function" ) {
          throw new TypeError();
      }
      // thisArg为callback 函数的执行上下文环境
      var thisArg = arguments[ 1 ];
      for ( var i = 0; i < len; i++ ) {
          if ( i in this && callback.call( thisArg, this[ i ], i, this ) ) {
              return true;
          }
      }
      return false;
  }
}
//兼IE6~8 every()
if ( !Array.prototype.every ) {
  Array.prototype.every = function ( callback ) {
      // 获取数组长度
      var len = this.length;
      if ( typeof callback != "function" ) {
          throw new TypeError();
      }
      // thisArg为callback 函数的执行上下文环境
      var thisArg = arguments[ 1 ];
      for ( var i = 0; i < len; i++ ) {
          if ( i in this && !callback.call( thisArg, this[ i ], i, this ) ) {
              return false;
          }
      }
      return true;
  }
}

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) 
        throw new TypeError('Object.keys called on non-object');

      var result = [];
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};

if (!Object.assign) {
  Object.assign = function assign(target, varArgs) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  }
}

// 替换默认值
function assign(defOpts, newOpts){
  newOpts = newOpts || {};
  /* 采用配置项替换默认值，作用类似jquery.extend */
  if(typeof newOpts ==="object"){
    for(var key in newOpts){
      if(!isUndefined(newOpts[key])) {
        defOpts[key] = newOpts[key];
      }
    }
  }
  return defOpts;
}

exports.assign = assign;

// 防抖
function debounce(func, wait , opts){
  var timer, ctx, args;
  opts = opts || {};
  function later(){
    return setTimeout(function(){
      if(!opts.immedi){
        func.apply(ctx, args);
        ctx = args = null;
      }
    }, wait);
  }
  return function(){
    ctx = this;
    args = Array.prototype.slice.call(arguments,0);
    clearTimeout(timer);
    timer = later();
    if(opts.immedi){
      func.apply(ctx, args);
    }
  }
}

exports.debounce = debounce;


// 模拟用户事件
function simulatedEvent(id, eventName, value, option) {
  var defOption = {
    canBubble : true,
    cancelable : true,
    eventType : "HTMLEvents",
  }
  option = Object.assign(defOption, option || {});

  if(typeof value == "object"){
    option = Object.assign(defOption, value);
    value = undefined;
  }
  var ele = Object.prototype.toString.call(id) === "[object String]" ? document.getElementById(id) : id;
  var e = document.createEvent(option.eventType);
  e.initEvent(eventName, option.canBubble , option.cancelable); // canBubble ：是否冒泡，cancelable: 是否取消默认事件
  value && ele && (ele.value = value);
  ele && ele.dispatchEvent(e)
}

exports.simulatedEvent = simulatedEvent;


function mockMouse(el, opts){
  var btn = Object.prototype.toString.call(el) == "[object String]" ? document.getElementById(el) : el;
  var mousedown = document.createEvent("MouseEvents");
  mousedown.initMouseEvent("mousedown",true,true,window,0, opts.x, opts.y, opts.x, opts.y,false,false,false,false,0,null);
  btn.dispatchEvent(mousedown);
}

exports.mockMouse = mockMouse;


function isIE(){
  //取得浏览器的userAgent字符串  
  var userAgent = navigator.userAgent; 
  //获取浏览器内核
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; 
  if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
  }
  return {is : isIE, v:fIEVersion}
}

exports.isIE = isIE;