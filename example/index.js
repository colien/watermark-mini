var WaterMark = window.WaterMark.WaterMark;
//var { WaterMark} = require("../src/index");
/* 
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
 */


Date.prototype.dateFormat = function (format){
  var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(), //day
      "h+" : this.getHours(), //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3), //quarter
      "S" : this.getMilliseconds(), //millisecond
  };
  if(/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
      if(new RegExp("("+ k +")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
      }
  }
  return format;
};
new WaterMark({
  content : "oms",
  fontAlpha : 0.1,
}).init();

new WaterMark({
  content : 'oms ' + new Date().dateFormat("yyyy-MM-dd hh:mm:ss"),
  fontAlpha : 0.2,
  xSpace: 20,
  ySpace: 100,
}).init();

function isIE(){
  //取得浏览器的userAgent字符串   
  var explorer = window.navigator.userAgent.toLowerCase();
  var rMsie = /msie ([\d.]+)/;
  var rIE11 = /trident.*rv:([\d.]+)/;
  if (rIE11.test(explorer)) {	/* ie11 */
    var ver = explorer.match(rIE11)[1];
    return {is : true, v : ver};
  }else if (rMsie.test(explorer)) {	/* ie */
    var ver = explorer.match(rMsie)[1];
    return {is : true, v : ver};
  }
  return {is : false, v: null };
}