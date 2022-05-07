# watermark-mini
一个比较轻量级的水印插件。


## 一、浏览器兼容性
主流浏览器都兼容

IE 浏览器 在 11 版本可用，但是不建议监听浏览器的窗口大小变化，因为这会造成浏览器重新渲染水印时卡顿。

IE 11 以下可以渲染，但是会造成用户操作无法穿透水印遮罩，后期会处理这个问题。

## 二、使用方式

### 1. script 引入

```
var WaterMark = window.WaterMark.WaterMark;
new WaterMark({
  content : "haha",
  monitor : false,
}).init();

new WaterMark({
  content : "haha_" + new Date().getTime(),
  fontAlpha : 0.4,
  xSpace : 100,
  ySpace : 100,
  monitor : false,
}).init();

```

### 2. 模块化引入
npm install watermark-mini

new WaterMark(options|Object)

```
const { WaterMark } = require("watermark-mini");
new WaterMark({
  content : "haha",
  monitor : false,
}).init();

new WaterMark({
  content : "haha_" + new Date().getTime(),
  fontAlpha : 0.4,
  xSpace : 100,
  ySpace : 100,
  monitor : false,
}).init();

```

有些时候我们需要同时渲染明水印和盲水印，可以创建两层水印，后期会在一个水印层同时支持多层水印。


## 三、配置参数
options 的参数，以及默认值
```
boxId: 'wm_container_id',       // 水印容器的 div
content: "",                    // 水印内容文字
x: 0,                           // 水平方向上的起始位移
y: 0,                           // 垂直方向上的起始位移
xSpace: 0,                      // 水平方向上水印的间隔
ySpace: 0,                      // 垂直方向上水印的间隔
fontColor: "#000000",           // 水印文字的的字体颜色
fontAlpha: 0.1,                 // 文字颜色透明度
fontSize: "12px",               // 水印文字的大小
fontFamily: "Microsoft Yahei",  // 水印文字的字体类型
rotateAngle: 20,                // 文字的倾斜角度
bgAlpha: 0.1,                   // 背景颜色透明度(暂时无用)
position: 'absolute',           // 水印容器的定位方式
zIndex : 100,                   // 水印定位层级
textAlign : "center",           // 内容文字的对其方式
monitor : true,                 // 是否监听水印内容的变化后重新渲染
containerNode : null,           // 水印插件挂载的父元素 element,不输入则默认挂在body上
coverAreaId : null,             // 覆盖的区域的id （暂时无用）
onLoad : true,                  // 是否监听页面加载完成后渲染
onResize : true,                // 是否监听窗口大小改变后渲染
```

## 后期计划
支持在同一水印容器渲染多层水印

支持 IE 11 以下的水印。







