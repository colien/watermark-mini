// 监听对象类
function MutationListener(watermark) {
  if (!(this instanceof MutationListener)) {
    return new MutationListener(watermark);
  }
  this.watermark = watermark; // 水印实例对象
  this.MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  this.watermarkDom;
  this.oldOpts = {
    width: 0,
    height: 0,
  };
  this.option = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  };
}
// 初始化监听对象
MutationListener.prototype.init = function () {
  if (this.MutationObserver) {
    // 获取回调函数
    var cb = this.callback(this.watermark);
    // 创建监听dom
    this.watermarkDom = new this.MutationObserver(cb);
  }
};

// 元素移除时的回调方法
MutationListener.prototype.callback = function (watermark) {
  return function (records) {
    const id = watermark._opts.boxId;
    records.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node.id === id) {
          watermark.render();
        }
      });
    });
    // console.log(records);

    // // 这个判断太粗糙
    // if (records.length > 0) {
    //   watermark.render();
    //   return;
    // }

    // 监听父节点的尺寸是否发生了变化, 如果发生改变, 则进行重新绘制
    /* var containerNode = watermark.containerNode;
    if (containerNode) {
      var newWidth = getComputedStyle(containerNode).getPropertyValue('width');
      var newHeight = getComputedStyle(containerNode).getPropertyValue('height');
      if (newWidth !== _this.oldOpts.width || newHeight !== _this.oldOpts.height) {
        _this.oldOpts.width = newWidth;
        _this.oldOpts.height = newHeight;
        watermark.init(_initOpts);
      }
    } */
  };
};
// 绑定元素变更监听
MutationListener.prototype.onListener = function (_opts, opts) {
  // monitor 是否监控， true: 不可删除水印; false: 可删水印。
  if (opts.monitor && this.watermarkDom) {
    var box = document.getElementById(_opts.boxId);
    if (box) {
      this.watermarkDom.observe(box.parentNode, this.option);
      // 如果有 shadowRoot，则也要添加
      if (box.shadowRoot && box.shadowRoot.parentNode) {
        this.watermarkDom.observe(box.shadowRoot.parentNode, this.option);
      }
    }
  }
};
// 移除元素变更监听
MutationListener.prototype.removeListener = function () {
  if (this.watermarkDom) {
    this.watermarkDom.disconnect();
  }
};

exports.MutationListener = MutationListener;
