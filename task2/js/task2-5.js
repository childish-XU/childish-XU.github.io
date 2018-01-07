//取出用json格式存放的游戏数据并解析为原生JavaScript值
var data =JSON.parse(localStorage.getItem("playDate"));
console.log(localStorage);

//传入fsm的step要执行次数
var x = data.step;

//设置“关闭”按钮的执行动作
$(".close").click(function(){
    popup(4);
});
$(".btn__again").click(function(){
    popup(4);
});
$(".btn__log").click(function(){
    window.location.href= "task2-4.html";
});


//根据step的执行次数生成对应天数的日程表
var arrDate = ["二","三","四","五","六","七","八"];
for(var s=0;s<Math.floor(x/5);s++) {
    $("#main").append($(".day:first").clone());
    $(".date_num").eq(s+1).html(arrDate[s]);
}

//设置点击日期标题可将日程折叠或展开
$(".date").click(function(){
    if($(this).next().attr("onOff")=="on"){
        $(this).next().attr("onOff","off").hide();

    }else {
        $(this).next().attr("onOff","on").show();
    }
});

//生成状态机，分别对应每天日程的5个状态
var i = 0;
var fsm = new StateMachine({
    init: 'begin',
    transitions: [
        { name: 'step', from: 'begin', to: 'killed' },
        { name: 'step', from: 'killed', to: 'words' },
        { name: 'step', from: 'words', to: 'speak' },
        { name: 'step', from: 'speak', to: 'voted' },
        { name: 'reset', from: '*', to: 'begin' }
    ]
    ,
    methods: {
        //设置状态变化过程中执行的动作
        onStep:     function() {
            $(".list__item p").eq(i).css("backgroundColor","#83b09a");
            $(".triangle--blue").eq(i).css("borderRightColor","#83b09a");
            i++;},
        onBegin:   function() {
            $(".schedule").attr("onOff","off").hide();
            $(".schedule").eq(Math.floor(x/5)).attr("onOff","on").show();
        },
        onKilled:   function() {
            var y = Math.floor(i/4)*2;
            $(".list__hide").eq(y).show();
            $(".list__hide .num").eq(y).html(data.arrD[y]);
            $(".list__hide .identity").eq(y).html(data.arr_id[data.arrD[y]-1]);
        },
        onVoted:   function() {
            var z = Math.floor(i/4)*2+1;
            $(".list__hide").eq(z).show();
            $(".list__hide .num").eq(z).html(data.arrD[z]);
            $(".list__hide .identity").eq(z).html(data.arr_id[data.arrD[z]-1]);
        }
    }
});

/*每天由5个状态组成，每次刷新页面时从localStorage取出当前已执行到的step总数，并执行相应次数的状态推进，每逢第五个状态就执行循环复位到第一个状态*/
for(var h=0;h<x;h++){
    if((h+1)%5 ==0){
        fsm.reset();
        console.log("reset"+h);
    }else {
        fsm.step();
        console.log("step"+h);
    }
}
console.log(fsm.state);

//设置根据不同状态，日程中点击各步骤的执行动作
$(".list__item").click(function(){
    var btn =$("ul .list__item");
    if (fsm.is("begin")){
        if (btn.index(this) == x-Math.floor(x/5)){
            data = {
                "state": "kill",
                "step": data.step,
                "arr_id": data.arr_id,
                "arrD": data.arrD
            };
            localStorage.setItem("playDate",JSON.stringify(data));
            window.location.href= "task2-6.html";
        }else {
            popup(2);
        }
    } else if (fsm.is("killed")) {
        if (btn.index(this) == x-Math.floor(x/5)){
            popup(0);
        } else if(btn.index(this) < x-Math.floor(x/5)) {
            popup(3);
        } else {
            popup(2);
        }
    } else if (fsm.is("words")) {
        if (btn.index(this) == x-Math.floor(x/5)+1){
            popup(1);
        } else if(btn.index(this) < x-Math.floor(x/5)+1) {
            popup(3);
        } else {
            popup(2);
        }
    } else if (fsm.is("speak")) {
        if (btn.index(this) == x-Math.floor(x/5)+2){
            data = {
                "state": "vote",
                "step": data.step,
                "arr_id": data.arr_id,
                "arrD": data.arrD
            };
            localStorage.setItem("playDate",JSON.stringify(data));
            window.location.href= "task2-6.html";
        } else if(btn.index(this) < x-Math.floor(x/5)+2) {
            popup(3);
        } else {
            popup(2);
        }
    }
});

//设置弹窗函数，通过传参设置不同触发条件下内容和按钮功能不同
var arrPop = ["请死者亮明身份并且发表遗言","玩家依次发言讨论","请按顺序执行","请继续下一项","结束本轮游戏吗？"];
function popup(n) {
    $(".shade").show();
    $(".clue p").html(arrPop[n]);
    $(".popup").fadeIn(100);
}
$(".no").click(function() {
    popupHide();
});
$(".yes").click(function () {
    popupHide();
    var tips =$(".clue p").html();
    if(tips == arrPop[0]||tips == arrPop[1]){
        fsm.step();
    }else if(tips == arrPop[4]) {
        window.location.href= "task2-1.html";
    }
});
function popupHide(){
    $(".shade").hide();
    $(".popup").hide();
}
/**
 * Created by xyq on 2018/1/7.
 */
