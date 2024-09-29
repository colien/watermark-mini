// 水印对象类
function Canvas(opts) {
  if (!(this instanceof Canvas)) {
    return new Canvas(opts);
  }
}
// 创建
Canvas.prototype.create = function (root, _opts, opts) {
  // 最终的 canvas
  var canvas = this.createCanvas(_opts, opts);
  var el = document.createElement("div");
  const base64Url = canvas.toDataURL();
  const styleStr = `
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;

  el.setAttribute("style", styleStr);
  root.appendChild(el);
};
// 明水印
Canvas.prototype.createCanvas = function (_opts, opts) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", _opts.boxWidth);
  canvas.setAttribute("height", _opts.boxHeight);

  const ctx = canvas.getContext("2d");
  ctx.textAlign = opts.textAlign || "center"; // 默认居中对齐
  ctx.textBaseline = "middle"; // 使用 'middle' 以便垂直居中
  ctx.font = `${opts.fontSize} ${opts.fontFamily}`;
  ctx.fillStyle = `rgba(0, 0, 0, ${opts.fontAlpha})`;
  ctx.rotate((opts.rotateAngle * Math.PI) / 180); // 将角度转换为弧度
  ctx.fillText(
    opts.content,
    parseFloat(_opts.boxWidth) / 2,
    parseFloat(_opts.boxHeight) / 2 // 垂直居中显示
  );

  return canvas;
};

// 计算ctx 的数据
Canvas.prototype.calaCtxData = function (oldData, newData, color) {
  oldData = oldData.data;
  newData = newData.data;
  var bit, offset;
  switch (color) {
    case "R":
      bit = 0;
      offset = 3;
      break;
    case "G":
      bit = 1;
      offset = 2;
      break;
    case "B":
      bit = 2;
      offset = 1;
      break;
  }

  for (var i = 0; i < oldData.length; i++) {
    if (i % 4 == bit) {
      // 只处理目标通道
      if (newData[i + offset] === 0 && oldData[i] % 2 === 1) {
        // 没有水印信息的像素，将其对应通道的值设置为偶数
        if (oldData[i] === 255) {
          oldData[i]--;
        } else {
          oldData[i]++;
        }
      } else if (newData[i + offset] !== 0 && oldData[i] % 2 === 0) {
        // 有水印信息的像素，将其对应通道的值设置为奇数
        if (oldData[i] === 255) {
          oldData[i]--;
        } else {
          oldData[i]++;
        }
      }
    }
  }
  return oldData;
};

exports.Canvas = Canvas;
