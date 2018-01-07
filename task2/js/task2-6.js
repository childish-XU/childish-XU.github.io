var data =JSON.parse(localStorage.getItem("playDate"));
//取出身份数组
var nK = parseInt(localStorage.getItem("killer"));

console.log(localStorage);

//设置“关闭”按钮的执行动作
$(".close").click(function(){
    popup(3);
});

//生成和玩家数量相等及身份对应的卡牌
for(var i=1;i<data.arr_id.length;i++) {
    $("#main").append($(".frame:first").clone());
    $(".name").eq(i).html(data.arr_id[i]);
    $(".num").eq(i).html(i+1);
}
$(".name:first").html(data.arr_id[0]);
$(".num:first").html(1);


var name; //被杀手或投票选中的玩家身份
var deadIndex; //被杀手或投票选中的玩家号码
var arrD = []; //记录死亡玩家的号码
var arrDead = []; //记录死亡玩家的身份

//给死亡玩家标记dead属性
for(var a=0;a<data.arrD.length;a++ ){
    $(".name").eq(data.arrD[a]-1).attr("life","dead");
}

//新建状态机，用于杀人页与投票页的切换
var fsmP = new StateMachine({
    init: data.state,
    transitions: [
        { name: 'toVote', from: 'kill', to: 'vote' },
        { name: 'toKill', from: 'vote', to: 'kill' }
    ]
    ,
    methods: {
        onVote:       function()  {
            $(".title").text("投票");
            $(".message").text("发言讨论结束，大家请投票");
            $(".guide").text("点击得票数最多的人的头像");
            $("[life='dead']").css("backgroundColor","#83b09a");
        },
        onKill:       function()  {
            $(".title").text("杀手杀人");
            $(".message").text("杀手请睁眼，杀手请选择要杀的对象");
            $(".guide").text("点击下方玩家头像，对被杀的玩家进行标记");
            $("[life='dead']").css("backgroundColor","#83b09a");
        }
    }
});

console.log(fsmP.state);

//点击身份卡片亮刀并标记"on"
$(".card").click(function(){
    $(".knife").hide().attr("switch","off");
    if($(this).find(".name").attr("life") == "dead") {
        popup(2);
    }else {
        $(this).find(".knife").show().attr("switch","on");
    }
    name = $("[switch='on']").next().html();
    deadIndex = $("[switch='on']").next().next().children("span").html();
});


/*点击确定按钮时，如果是杀手页，则不能杀杀手，杀人后会将死亡玩家号码计入游戏data,并在每轮提交时判定游戏是否结束以及输赢情况*/
$("#submit").click(function(){
    if(fsmP.is("kill")){
        if(name == "杀手"){
            popup(0);
        } else if(name == "平民") {
            judge(data.step+1);
        } else {
            popup(1);
        }
    }
    else {
        judge(data.step+4);
    }
});
//弹窗函数
function popup(n) {
    var arrPop = ["你是杀手不能杀死本职业，请选择其他玩家杀死", "请选择要杀死的玩家", "哥，我已经死了，你换个人杀呗","结束本轮游戏吗？"];
    $(".shade").show();
    $(".clue p").html(arrPop[n]);
    $(".popup").fadeIn(100);
    $(".no").click(function () {
        popupHide();
    });
    $(".yes").click(function () {
        popupHide();
        var tips =$(".clue p").html();
        if(tips == arrPop[3]){
            window.location.href= "task2-1.html";
        }
    });
    function popupHide() {
        $(".shade").hide();
        $(".popup").hide();
    }
}
//页面跳转及判定输赢函数
function judge(n) {
    $("[switch='on']").next().attr("life","dead");
    arrD = data.arrD.concat(deadIndex);  //数组：死亡的玩家号码

    for(var j=0;j<arrD.length;j++) {
        arrDead[j] = data.arr_id[arrD[j]-1];  //数组：死亡的玩家身份
    }
    //通过对死亡玩家数组的迭代生成死亡杀手的数组
    var arrDeadK = arrDead.filter(function(item,index,array){
        return (item === "杀手");
    });
    //如果剩余平民人数等于杀手人数，杀手胜
    if(nK-arrDeadK.length == data.arr_id.length-nK-arrD.length+arrDeadK.length){
        data = {
            "step": n,
            "arr_id": data.arr_id,
            "arrD": arrD,
            "arrDeadK":arrDeadK,
            "winner":"杀手"
        };
        localStorage.setItem("playDate",JSON.stringify(data));
        window.location.href= "task2-7.html";
    }else if(nK-arrDeadK.length ==0 ) {      //如果杀手全部死亡，平民胜
        data = {
            "step": n,
            "arr_id": data.arr_id,
            "arrD": arrD,
            "arrDeadK":arrDeadK,
            "winner":"平民"
        };
        localStorage.setItem("playDate",JSON.stringify(data));
        window.location.href= "task2-7.html";
    } else {  //否则游戏继续执行
        data = {
            "step": n,
            "arr_id": data.arr_id,
            "arrD": arrD,
            "arrDeadK":arrDeadK
        };
        localStorage.setItem("playDate",JSON.stringify(data));
        window.location.href= "task2-5.html";
    }
}
/**
 * Created by xyq on 2018/1/7.
 */
