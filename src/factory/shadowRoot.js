
// 水印对象类
function ShadowRoot(opts){
  if(!(this instanceof ShadowRoot)){
    return new ShadowRoot(opts);
  }
}

// 获取水印容器
ShadowRoot.prototype.create = function(root, _opts, opts){
  
  var x, y;
  for (var i = 0; i < _opts.rows; i++) {
    y = _opts.y + (_opts.pageHeight - _opts.allHeight) / 2 + (_opts.ySpace + _opts.boxHeight) * i;
    for (var j = 0; j < _opts.cols; j++) {
      x = _opts.x + (_opts.pageWidth - _opts.allWidth) / 2 + (_opts.xSpace + _opts.boxWidth ) * j;
      var mask_div = this.createItem(x, y, i, j, _opts, opts);
      root.appendChild(mask_div);
    }
  }
}

// 创建水印元素
ShadowRoot.prototype.createItem = function(x, y, i, j, _opts, opts){
  var mask_div = document.createElement('div');
  var oText = document.createTextNode(opts.content);
  mask_div.appendChild(oText);
  mask_div.id = _opts.boxId + "_" + i + j;
  mask_div.style.webkitTransform = "rotate(-" + opts.rotateAngle + "deg)";
  mask_div.style.MozTransform = "rotate(-" + opts.rotateAngle + "deg)";
  mask_div.style.msTransform = "rotate(-" + opts.rotateAngle + "deg)";
  mask_div.style.OTransform = "rotate(-" + opts.rotateAngle + "deg)";
  mask_div.style.transform = "rotate(-" + opts.rotateAngle + "deg)";
  mask_div.style.visibility = "";
  mask_div.style.position = opts.position;
  mask_div.style.zIndex = opts.zIndex;
  mask_div.style.left = x + 'px';
  mask_div.style.top = y + 'px';
  mask_div.style.overflow = "hidden";
  mask_div.style.pointerEvents = "none";
  mask_div.style.opacity = opts.fontAlpha;
  mask_div.style.filter = "alpha(opacity="+ opts.fontAlpha + 100 +")";
  mask_div.style.fontSize = opts.fontSize;
  mask_div.style.fontFamily = opts.fontFamily;
  mask_div.style.lineHeight = opts.fontSize;
  mask_div.style.color = opts.fontColor;
  mask_div.style.textAlign = opts.textAlign;
  mask_div.style.width = _opts.boxWidth + "px";
  mask_div.style.height = _opts.boxHeight + "px";
  mask_div.style.display = "block";
  mask_div.style['-ms-user-select'] = "none";
  return mask_div;
}


exports.ShadowRoot = ShadowRoot;
