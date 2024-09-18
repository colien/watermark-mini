// 监听对象类
function EventListener() {
  if (!(this instanceof EventListener)) {
    return new EventListener();
  }
  this.type = window.addEventListener ? 1 : 2; // 事件类型 1:addEventListener; 2: attachEvent;
}
// 监听事件
EventListener.prototype.on = function (el, eName, listener, opts) {
  if (this.type === 1) {
    el.addEventListener(eName, listener, opts);
  } else {
    el.attachEvent("on" + eName, listener);
  }
};
// 移除监听
EventListener.prototype.off = function (el, eName, listener, opts) {
  if (this.type === 1) {
    el.removeEventListener(eName, listener);
  } else {
    el.detachEvent(eName, listener);
  }
};
// 派遣一个指定的事件
EventListener.prototype.dispatch = function (el, eName) {
  return el.dispatchEvent(eName);
};

exports.EventListener = EventListener;
