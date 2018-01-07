//取出身份数组
var data =JSON.parse(localStorage.getItem("playDate"));
var arr_id = data.arr_id;

//设置“关闭”按钮的执行动作
$(".close").click(function(){
    popup();
});
function popup() {
    $(".shade").show();
    $(".clue p").html("结束本轮游戏吗？");
    $(".popup").fadeIn(100);
}
$(".no").click(function() {
    popupHide();
});
$(".yes").click(function () {
    popupHide();
    window.location.href= "task2-1.html";
});
function popupHide(){
    $(".shade").hide();
    $(".popup").hide();
}


//设置页面的玩家号码
var i=1;
$("#num").html(i);
$("#btn-num1").html(i);

//设置两个按钮控制页面同组内容的同时显示和隐藏
$("#submit-show").click(function(){
    $("#submit-show").hide();
    $("#emperor").hide();
    $("#girl").show();
    $("#identity").show().html(arr_id[i-1]);
    $("#num").html(i);
    i++;
    if (i<arr_id.length+1) {
        $("#submit-hide").css("display","block").show();
        $("#btn-num2").html(i);
    }else {
        $("#submit-judge").css("display","block").show();
    }
});
$("#submit-hide").click(function(){
    $("#submit-hide").hide();
    $("#emperor").show();
    $("#girl").hide();
    $("#identity").hide();
    $("#num").html(i);
    $("#submit-show").show();
    $("#btn-num1").html(i);
});



$("#submit-judge").click(function(){
    window.location.href= "task2-4.html";
});
/**
 * Created by xyq on 2017/12/30.
 */
