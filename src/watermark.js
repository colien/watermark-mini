const { MutationListener } = require("./observe/MutationListener.js");
const { Adapter } = require("./factory/adapter.js"); 
const { getUUId } = require("./utils.js");

// 水印对象类
function WaterMark(opts){
  if(!(this instanceof WaterMark)){
    return new WaterMark(opts);
  }
  // 初始化监听对象
  this.mutationListener = new MutationListener(this);
  this.mutationListener.init(); // 初始化监听对象
  this.key = getUUId(); // 生成一个唯一的 key
}
// 初始化
WaterMark.prototype.init = function(opts){
  this.opts = opts || {}; 

  var _opts = {
    boxId : opts.boxId + "_" + this.key,
    pageOffTop : 0, // 距离页面的top 距离
    pageOffLeft : 0,  // 距离页面的 left 距离
    x : 0, // x 轴便宜量
    y : 0, // y 轴偏移量
    pageWidth : null, // 水印区域的宽度
    pageHeight : null,  // 水印区域的高度
    cols : 0, // 水印的列数
    rows : 0,  // 水印的行数
    allWidth : 0,   // 水印的总宽度
    allHeight : 0, // 水印的总高度
  };
  /*指定父元素同时指定了宽或高*/
  _opts.x = opts.x + _opts.pageOffLeft;
  _opts.y = opts.y + _opts.pageOffTop;

  /* 如果设置水印挂载的父元素的id */
  var containerBox = _opts.containerBox = opts.containerNode && document.getElementById(opts.containerNode) || document.body;

  // 计算 水印的大小
  this._calaBoxSize(_opts, opts);

  /* 获取页面宽度 */
  this._getPageWidthHeight(_opts, containerBox);

  // 计算行列的数量及间隔
  this._caleMarkCount(_opts, opts);

  // 计算长度
  this._calcTotalLength(_opts, opts, containerBox);

  this._opts = _opts;

  return this;
}

// 选软水印
WaterMark.prototype.render = function(){
  console.log("渲染 水印！");
  var opts = this.opts;
  var _opts = this._opts;
  /* 元素移除 */
  this.clear(_opts);

  var adapter = new Adapter(_opts);
  adapter.render(opts);

  // 设置水印元素删除事件监听
  this.mutationListener.onListener(_opts, opts);
}
// 计算水印内容的宽高
WaterMark.prototype._calaBoxSize = function(_opts, opts){
  //fontSize:代表汉字的大小，英文字会自动按照默认值
  var span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.fontSize = opts.fontSize;
  span.style.lineHeight = opts.fontSize;
  span.style.overflow = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.textOverflow = "ellipsis";
  span.style.position = "absolute";
  span.style.boxSizing = "border-box";
  span.style.width = "-webkit-max-content";
  span.style.width = "-moz-max-content";
  span.style.width = "max-content";
  document.body.appendChild(span);
  if (typeof span.textContent !== "undefined") {
      span.textContent = opts.content;
  } else {
      span.innerText = opts.content;
  }
  _opts.boxWidth = span.offsetWidth + 4;// - result.width;
  _opts.boxHeight = span.offsetHeight;// - result.height;
  span.parentNode.removeChild(span);
  
}

/* 获取页面宽度 */
WaterMark.prototype._getPageWidthHeight = function(_opts, containerBox){
  // _opts.pageWidth = Math.max(containerBox.scrollWidth,containerBox.clientWidth,document.documentElement.clientWidth) - defaultOpt.boxWidth/2;
  _opts.pageWidth = Math.max(containerBox.scrollWidth, containerBox.clientWidth);
  // _opts.pageHeight = Math.max(containerBox.scrollHeight,containerBox.clientHeight,document.documentElement.clientHeight) - defaultOpt.boxHeight/2;
  _opts.pageHeight = Math.max(containerBox.scrollHeight, containerBox.clientHeight);
}

// 计算水印行列数量及间隔
WaterMark.prototype._caleMarkCount = function(_opts, opts){
  /*三种情况下会重新计算水印列数和x方向水印间隔：1、水印列数设置为0，2、水印宽度大于页面宽度，3、水印宽度小于于页面宽度*/
  _opts.cols = parseInt((_opts.pageWidth - _opts.x) / (_opts.boxWidth + opts.xSpace));
  _opts.xSpace = parseInt((_opts.pageWidth - _opts.x - _opts.boxWidth * _opts.cols) / (_opts.cols));
  
  /*三种情况下会重新计算水印行数和y方向水印间隔：1、水印行数设置为0，2、水印长度大于页面长度，3、水印长度小于于页面长度*/
  _opts.rows = parseInt((_opts.pageHeight - _opts.y) / (_opts.boxHeight + opts.ySpace));
  _opts.ySpace = parseInt((_opts.pageHeight - _opts.y - _opts.boxHeight * _opts.rows) / (_opts.rows));
}

// 获取总高度宽度
WaterMark.prototype._calcTotalLength = function(_opts, opts){
  _opts.allWidth = _opts.x + _opts.boxWidth * _opts.cols + _opts.xSpace * (_opts.cols - 1);
  _opts.allHeight = _opts.y + _opts.boxHeight * _opts.rows + _opts.ySpace * (_opts.rows - 1);
}


// 清空元素
WaterMark.prototype.clear = function(_opts){
  var boxEl = document.getElementById(_opts.boxId);
  boxEl?.parentNode?.removeChild(boxEl);
  this.mutationListener.removeListener();
}

// 移除水印
WaterMark.prototype.remove = function(){
  this.clear();
  this.mutationListener.removeListener();
}

exports.WaterMark = WaterMark;
