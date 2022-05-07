const { Canvas } = require("./canvas.js");
const { ShadowRoot } = require("./shadowRoot.js");
const { isFun , mockMouse , isIE} = require("../utils.js");
const { EventListener } = require("../observe/EventListener");

var eventListener = new EventListener();

// 判断浏览器支持什么类型的渲染方式
function Adapter(_opts){
  if(!(this instanceof Adapter)){
    return new Adapter(_opts);
  }
  // 支持什么模式的渲染，1：shadowRoot； 2: canvas； 3：普通元素；
  this.type = isFun(document.createElement("div").attachShadow ? 1 : document.createElement("canvas").getContext ? 2 : 3);
  this.init(_opts);
  this._opts = _opts;
}

// 初始化
Adapter.prototype.init = function(_opts){
  /* 创建水印外壳div */
  this.shadowRoot = this.getShadowRoot(_opts, _opts.containerBox);
}

// 渲染
Adapter.prototype.render = function(opts){
  var _opts = this._opts;
  var render;
  // 创建水印列表
  if(this.type !== 2){  // canvas 渲染
    render = new ShadowRoot();
  }else{
    render = new Canvas();
  }
  render.create(this.type === 1 ? this.shadowRoot.attachShadow({mode: 'open'}) : this.shadowRoot, _opts, opts);
  this.insertDom(_opts.containerBox, this.shadowRoot);
  var isIe = isIE();
  if(isIe.is && isIe.v != 11){
    this.eventPenetrate(_opts)
  }
}

// 获取水印容器
Adapter.prototype.getShadowRoot = function(_opts){
  /*创建水印外壳div*/
  var shadowRoot;
  var otdiv = document.createElement('div');
  otdiv.id = _opts.boxId;
  otdiv.setAttribute('style','pointer-events: none !important; display: block !important');
  otdiv.style.position = "absolute";
  otdiv.style.zIndex = 10000;
  otdiv.style.top = 0;
  otdiv.style.left = 0;
  otdiv.style.minWidth = "100%";
  otdiv.style.minHeight = "100%";
  shadowRoot = otdiv;
  return shadowRoot;
}

Adapter.prototype.insertDom = function(containerBox, otdiv){
  /* 将 shadow dom 随机插入 body 内的任意位置 */
  var nodeList = containerBox.children;
  var index = Math.floor(Math.random()*(nodeList.length-1 ));
  if(nodeList[index]){
    containerBox.insertBefore(otdiv, nodeList[index]);
  }else{
    containerBox.appendChild(otdiv);
  }
}

Adapter.prototype.eventPenetrate = function(_opts){
  //This is an IE fix because pointer-events does not work in IE
  eventListener.on(document.getElementById(_opts.boxId), 'mousedown', function(e){
    this.style.display = "none";
    var BottomElement = document.elementFromPoint(e.clientX, e.clientY);
    //Manually fire the event for desired underlying element
    mockMouse(BottomElement, {x: e.clientX, y:  e.clientY});
    this.style.display = "block";
    return false;
  })
}


// 返回一个接口，水印方法不需要关注使用哪种方式，这个方法会自己转化
exports.Adapter = Adapter;
