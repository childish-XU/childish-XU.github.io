/**
 * Created by xyq on 2017/12/19.
 */
//创建随机颜色函数
function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    if(r < 16){
        r = "0"+r.toString(16);
    }else{
        r = r.toString(16);
    }
    if(g < 16){
        g = "0"+g.toString(16);
    }else{
        g = g.toString(16);
    }
    if(b < 16){
        b = "0"+b.toString(16);
    }else{
        b = b.toString(16);
    }
    return "#"+r+g+b;
}
//随机点亮九宫格中的三个格子
function randomLight() {
    //生成由数字0-8随机排列的9位数组
    var i;
    var index;
    var temp;
    var arr = new Array(9);//创建一个长度为9的数组
    for (i = 0; i < 9; i++) {
        arr[i] = i;//数组内容为0到9的数字
    }
    for (i = 0; i < 9; i++) {
        index = parseInt(Math.random() * (9 - i)) + i;
        if (index != i) {
            temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }
    //设置0-8中一个随机的格子亮随机颜色
    function er() {
        var e = arr.pop();//取随机数组中的末位，数组长度减一
        document.getElementsByClassName("box")[e].style.backgroundColor=randomColor();
    }
    //循环三次点亮三个不重复的随机格子
    for (i=0;i<3;i++) {
        er();
    }
}
//九宫格恢复初始颜色
function Clear() {
    var g =document.getElementsByClassName("box");
    var i;
    for (i = 0; i < g.length; i++) {
        g[i].style.backgroundColor = "#fca401";
    }
}
//闪烁一次
function FlickerOne() {
    randomLight();
    window.setTimeout(Clear,500);
}
var h;
//清除定时器
function FlickerStop() {
    window.clearInterval(h);
}
//清除定时器并重新使用定时器循环闪烁
function Flicker() {
    FlickerStop(h);
    h = window.setInterval(FlickerOne,1000);
}
document.getElementById("stop").onclick=FlickerStop;
document.getElementById("start").onclick=Flicker;

