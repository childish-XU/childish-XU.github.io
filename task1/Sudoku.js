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
//创建0-8的随机数组函数
function randomLight() {
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
    function er() {
        var e = arr.pop();
        document.getElementsByClassName("box")[e].style.backgroundColor=randomColor();
    }
    for (i=0;i<3;i++) {
        er();
    }
}
function FlickerOne() {
    randomLight();
    function Clear() {
        var g =document.getElementsByClassName("box");
        var i;
        for (i = 0; i < g.length; i++) {
            g[i].style.backgroundColor = "#fca401";
        }
    }
    window.setTimeout(Clear,300);
}
function Flicker() {
    var h = window.setInterval(FlickerOne,600);
    function FlickerStop() {
        window.clearInterval(h);
    }
    document.getElementById("stop").onclick=FlickerStop;
}
document.getElementById("start").onclick=Flicker;