var oInput = document.getElementById("num");   //玩家总人数输入框
var oK = document.getElementById("killer");    //显示杀手人数的span
var oC = document.getElementById("civilian");  //显示平民人数的span
var oBar = document.getElementById("bar");  //滑动条
var oS = document.getElementById("slider"); //滑块
var oAdd = document.getElementById("add");  // "+"按钮
var oMinus = document.getElementById("minus");  // "-"按钮
var oBtn = document.getElementById("submit");  //去翻牌按钮

oInput.value = 12;  //设置输入框初始值
var oNum = oInput.value;
Linkage();  //调用函数使滑块位置根据输入值改变

//设置输入框输入值的范围
oInput.onblur = function Set () {
    oNum = oInput.value;
    if (oNum>18) {
        alert("请输入正确的玩家数量");
    }else if(oNum<4) {
        alert("请输入正确的玩家数量");
    }else {
        Linkage();
    }
};

//设置点击"+"执行的动作
oAdd.onclick = function Add() {
    if (oNum>=18) {
        oNum=18;
    }else if(oNum<4) {
        oNum=4;
    }
    else {
        oNum++;
    }
    Linkage();
    oInput.value = oNum;
};
//设置点击"—"执行的动作
oMinus.onclick = function Minus() {
    if (oNum>18) {
        oNum=18;
    }else if(oNum<=4) {
        oNum=4;
    }
    else {
        oNum--;
    }
    Linkage();
    oInput.value = oNum;
};

var ifBool = false; //设置开关，标记鼠标是否按下

//鼠标按下方块
var star = function() {
    //e.stopPropagation();
    ifBool = true;
};

//根据鼠标位置移动滑块
var shift = function (e) {
    if(!e.touches) {    //兼容PC端
        var x = e.clientX;
    } else {     //兼容移动端
        x = e.touches[0].pageX;
    }
    //设置滑块可移动的范围
    var oBar_left = getPosition(oBar).left;
    var oS_left = x - oBar_left-23;
    if(oS_left >= oBar.offsetWidth - 46) {
        oS_left = oBar.offsetWidth -46;
    }
    if(oS_left < 0) {
        oS_left = 0;
    }
    //设置根据滑块位置产生的玩家人数值
    oNum = parseInt((oS_left / (oBar.offsetWidth - 46)) * 14+4);
    Linkage();
    oInput.value =oNum;
};

//鼠标按下时可拖动滑块
var move = function(e) {
    if(ifBool) {
        shift(e);
    }
};

//鼠标松开，解除滑块与鼠标的移动绑定
var end = function() {
    ifBool = false;
};

//鼠标/触屏按下时执行star中函数
oS.addEventListener("touchstart",star);
oS.addEventListener("mousedown",star);

//鼠标/触屏移动时执行move中函数
window.addEventListener("touchmove", move);
window.addEventListener("mousemove", move);

//鼠标/触屏松开时执行end中函数
window.addEventListener("touchend", end);
window.addEventListener("mouseup", end);

//点击oBer区域时执行shift中函数
oBar.addEventListener("click",shift);

//根据oNum值生成滑块位置以及oK和oC中的数值
function Linkage() {
    var j = oBar.offsetWidth;
    oS.style.left = [(oNum-4)*(j-46)]/14+"px";
    oK.innerHTML = Math.ceil(oNum * 0.2);
    oC.innerHTML = Math.floor(oNum * 0.8);
}

//获取元素的绝对位置
function getPosition(node) {
    var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
    var top = node.offsetTop;
    current = node.offsetParent; // 取得元素的offsetParent

    // 一直循环直到根元素
    while(current != null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        "left": left,
        "top": top
    };
}

//点击游戏开始时生成乱序的玩家身份并存储与localStorage
oBtn.onclick = function Open() {
    var nK = oK.innerHTML;
    oNum = oInput.value;
    var arr_id = [];

    for(var i=0;i<oNum;i++){
        if(i<nK){
            arr_id[i]="杀手";
        }else {
            arr_id[i]="平民";
        }
    }
    for(i=0;i<arr_id.length;i++) {
        var j = Math.floor(Math.random()*(arr_id.length-i)+i);
        if (j != i) {
            var temp = arr_id[i];
            arr_id[i] = arr_id[j];
            arr_id[j] = temp;
        }
    }
    localStorage.setItem("killer",nK);
    localStorage.setItem("identity",arr_id);
    localStorage.removeItem("playDate");
    window.location.href= "task2-3.html";
};

