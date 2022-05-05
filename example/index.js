const WaterMark = window.WaterMark.WaterMark;
//var { WaterMark} = require("../src/index");

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
