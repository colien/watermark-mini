// 默认参数
var defaultOpt = {
  boxId: 'wm_container_id',       //水印总体的id
  content: "",  // 明水印内容
  x: 0,  // 水平方向上的起始位移
  y: 0,
  xSpace: 0,
  ySpace: 0,
  fontColor: "#000000",
  fontAlpha: 0.1, // 文字颜色透明度
  fontSize: "12px",
  fontFamily: "Microsoft Yahei",
  rotateAngle: 20,
  bgAlpha: 0.1, // 背景颜色透明度
  position: 'absolute',
  zIndex : 100,
  textAlign : "center",
  monitor : true,  // 是否监听水印移除
  containerNode : null,     //水印插件挂载的父元素element,不输入则默认挂在body上
  coverAreaId : null, // 覆盖的区域的id 暂不能使用
  onLoad : true,  // 是否监听页面加载完成后渲染
  onResize : true,  // 是否监听窗口大小改变后渲染
}

exports.defaultOpt = defaultOpt;