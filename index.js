var zIndex = 1;
var container = document.getElementById("container");
var iup = document.querySelector("input");
var paperWidth = 170,
  paperHeight = 170;
//一开始记录视口的尺寸
var vWidth = document.documentElement.clientWidth;
var vHeight = document.documentElement.clientHeight;

//实现拖拽功能

window.onmousedown = function (e) {
  var div = getMoveDiv(e.target);
  if (!div) {
  }
  div.style.zIndex = zIndex;
  zIndex++;
  var pagex = e.pageX;
  var pagey = e.pageY;
  var style = getComputedStyle(div);
  var divLeft = parseFloat(style.left);
  var divTop = parseFloat(style.top);

  window.onmousemove = function (e) {
    
    
    var divX = e.pageX - pagex;
    var divY = e.pageY - pagey;
    var zX = divX + divLeft;
    var zY = divY + divTop;
    if (zX < 0) {
      zX = 0;
    }
    if (zX > vWidth - paperWidth){
         zX = vWidth - paperWidth;
    }
    if (zY < 0) {
      zY = 0;
    }
    if (zY > vHeight - paperHeight - 80){
        zY = vHeight - paperHeight - 80;
   }
    div.style.left = zX + "px";
    div.style.top = zY + "px";
  };
  window.onmouseup = window.onmouseleave = function () {
    window.onmousemove = null;
  };
};

// 实现关闭功能
window.onclick = function (e) {
  if(e.target.parentElement && e.target.parentElement.className === "paper" && e.target.tagName === "SPAN"){
      e.target.parentElement.remove();
  }
}


/**
 * 得到可移动div
 * @param {*}} dom
 */
function getMoveDiv(dom) {
  if (dom.className === "paper") {
    return dom;
  } else if (
    dom.parentElement &&
    dom.parentElement.className === "paper" &&
    dom.tagName === "P"
  ) {
    return dom.parentElement;
  }
}

/**
 * 创建一个愿望
 * @param {*} word
 */
function createWish(word) {
  var div = document.createElement(div);
  div.className = "paper";
  div.innerHTML = `<p>${word}</p><span>X</span>`;
  //设置颜色
  div.style.background = `rgb(${getRandom(100, 200)},${getRandom(
    100,
    200
  )},${getRandom(100, 200)})`;
  //设置位置
  var maxLeft = document.documentElement.clientWidth - paperWidth;
  var maxTop = document.documentElement.clientHeight - paperHeight - 80;
  div.style.left = getRandom(0, maxLeft) + "px";
  div.style.top = getRandom(0, maxTop) + "px";

  container.appendChild(div);

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
}

function createInitPapers() {
  var arr = ["世界和平", "身体健康","万事如意","好好学习天天向上"];
  arr.forEach(function (imte) {
    createWish(imte);
  });
}

window.onresize = function () {
  // 重新调整所有的div.paper的位置
  var divX = document.documentElement.clientWidth - vWidth;
  var divY = document.documentElement.clientHeight - vHeight;

  for (var i = 0; i < container.children.length; i++) {
    var paper = container.children[i];
    //改变paper的left值
    var left = parseFloat(paper.style.left);
    var right = vWidth - paperWidth - left;
    var newLeft = left + (left / (left + right)) * divX;
    paper.style.left = newLeft + "px";

    //改变paper的top值
    var top = parseFloat(paper.style.top);
    var bottom = vHeight - paperHeight - top;
    var newTop = top + (top / (top + bottom)) * divY;
    paper.style.top = newTop + "px";
  }
  vWidth = document.documentElement.clientWidth;
  vHeight = document.documentElement.clientHeight;
};

iup.onkeypress = function (e) {
  if (e.key === "Enter") {
    if (this.value) {
      createWish(this.value);
      this.value = "";
    }
  }
};

createInitPapers();
