var WaterMark = window.WaterMark.WaterMark;
//var { WaterMark} = require("../src/index");

new WaterMark({
  content : "haha",
  monitor : isIE().is ? false : true,
  onResize : isIE().is ? false : true,
}).init();

new WaterMark({
  content : "haha_" + new Date().getTime(),
  fontAlpha : 0.4,
  xSpace : 100,
  ySpace : 100,
  monitor : isIE().is ? false : true,
  onResize : isIE().is ? false : true,
}).init();


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