var data =JSON.parse(localStorage.getItem("playDate"));
var killer =parseInt(localStorage.getItem("killer"));
console.log(localStorage);

//显示胜利方
$(".winner").html(data.winner);

//显示各方存活人数
$(".live_killer").text(killer-data.arrDeadK.length);
$(".live_civilian").text(data.arr_id.length-data.arrD.length-killer+data.arrDeadK.length);

//显示游戏已执行轮数及各轮情况
for(var i=1;i<Math.ceil(data.step/5);i++) {
    $(".main__bottom").append($(".event:first").clone());
}
for(var j=0;j<Math.ceil(data.step/5);j++) {
    $(".date").eq(j).html(j+1);
    $(".night").eq(j).find(".num").html(data.arrD[j*2]);
    $(".night").eq(j).find(".identity").html(data.arr_id[data.arrD[j*2]-1]);
    $(".daytime").eq(j).find(".num").html(data.arrD[j*2+1]);
    $(".daytime").eq(j).find(".identity").html(data.arr_id[data.arrD[j*2+1]-1]);
}
if(data.arrD.length%2 == 1){
    $(".daytime:last").hide();
}
/**
 * Created by xyq on 2018/1/7.
 */
