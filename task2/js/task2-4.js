//取出身份数组
var sId = localStorage.getItem("identity");
var arr_id = sId.split(",");

console.log(localStorage);

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

//克隆生成身份卡牌，并填充对应的号码和身份
for(var i=1;i<arr_id.length;i++) {
    $("#main").append($(".frame:first").clone());
    $(".name").eq(i).html(arr_id[i]);
    $(".num").eq(i).html(i+1);
}
$(".name:first").html(arr_id[0]);
$(".num:first").html(1);

//用json格式存入后续页面用到的数据
var data = {
    "step": 0,
    "arr_id":arr_id,
    "arrD": []
};

$("#submit-start").click(function(){
    //存入序列化的json字符串
    localStorage.setItem("playDate",JSON.stringify(data));
    window.location.href= "task2-5.html";
});
/**
 * Created by xyq on 2018/1/7.
 */
