const { Canvas } = require("./canvas.js");
const { ShadowRoot } = require("./shadowRoot.js");

// 判断浏览器支持什么类型的渲染方式
function Adapter(_opts){
  if(!(this instanceof Adapter)){
    return new Adapter(_opts);
  }
  // 支持什么模式的渲染，1：canvas； 2: shadowRoot； 3：普通元素；
  this.type = 2; //document.createElement("canvas").getContext ? 1 : (isFun(document.createElement("div").attachShadow) ? 2 : 3);
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
  if(this.type === 1){  // canvas 渲染
    render = new Canvas();
  }else{
    render = new ShadowRoot();
  }
  render.create(this.shadowRoot, _opts, opts);
}

// 获取水印容器
Adapter.prototype.getShadowRoot = function(_opts, containerBox){
  /*创建水印外壳div*/
  var otdiv = document.getElementById(_opts.boxId);
  var shadowRoot = otdiv;

  if(!otdiv){
    otdiv = document.createElement('div');
    otdiv.id = _opts.boxId;
    otdiv.setAttribute('style','pointer-events: none !important; display: block !important');
    otdiv.style.position = "absolute";
    otdiv.style.zIndex = 10000;
    otdiv.style.top = 0;
    otdiv.style.left = 0;
    otdiv.style.minWidth = "100%";
    otdiv.style.minHeight = "100%";
    /* 判断浏览器是否支持 attachShadow 方法 */
    if(this.type === 2){
      shadowRoot = otdiv.attachShadow({mode: 'open'});
    }else{
      shadowRoot = otdiv;
    }
    /* 将 shadow dom 随机插入 body 内的任意位置 */
    var nodeList = containerBox.children;
    var index = Math.floor(Math.random()*(nodeList.length-1 ));
    if(nodeList[index]){
      containerBox.insertBefore(otdiv, nodeList[index]);
    }else{
      containerBox.appendChild(otdiv);
    }
  }else if (otdiv.shadowRoot){
    shadowRoot = otdiv.shadowRoot;
  }
  return shadowRoot;
}



// 返回一个接口，水印方法不需要关注使用哪种方式，这个方法会自己转化
exports.Adapter = Adapter;
