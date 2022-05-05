
const { WaterMark } = require("./watermark.js");
const { debounce, assign } = require("./utils.js");
const { EventListener } = require("./observe/EventListener");
const { defaultOpt } = require("./default.js");

var eventListener = new EventListener();

// 暴露
class Index{
  constructor(opts){
    var _opts = assign({} , defaultOpt);
    this.opts = assign(_opts, opts || {});
    // 生成水印对象
    var watermark = this.watermark = new WaterMark();
    // 防抖，防止重复渲染
    this._debounceFn = debounce(function (args){
      watermark.init(args).render();
    }, 1000)
  }
  // 初始化
  init (){
    var _this = this;
    var opts = this.opts;
    // 是否监听 页面加载完成后渲染
    if(opts.onLoad){
      eventListener.on(window, "load", function () {
        _this._debounceFn(opts)
      })
    }else{
      this.reload(opts);
    }
    // 是否监听窗口大小改变重新加载
    if(opts.onResize){
      eventListener.on(window, "resize", function(){
        _this._debounceFn(opts)
      })
    }
  }
  // 重新加载
  reload(opts){
    var _opts;
    if(opts){
      this.opts = _opts = opts;
    }
    this.watermark.init(_opts).render();
  }
  // 移除
  remove(){
    if(this.opts.onLoad){
      eventListener.off(window, "load");
    }
    if(this.opts.onResize){
      eventListener.off(window, "resize")
    }
    this.watermark.status = false;
    this.watermark.remove();
  }
}

// 要考虑到可能要多层渲染
exports.WaterMark = Index;  