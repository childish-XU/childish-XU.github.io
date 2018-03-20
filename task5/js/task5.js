/**
 * Created by xyq on 2018/1/20.
 */
var notice = document.getElementById("notice");
var submit = document.getElementById("submit");
var na = document.getElementById("na");
var pwd = document.getElementById("pwd");


submit.onclick = function(){
    if(na.value == ""){
        notice.innerHTML= "请输入用户名";
    }else if(pwd.value == ""){
        notice.innerHTML= "请输入密码";
    }else {
        var x = na.value;
        var y = pwd.value;
        console.log(x);
        console.log(y);

        var formData = new FormData();

        formData.append('name', x);
        formData.append('pwd', y);

        var xhr = new XMLHttpRequest();
        xhr.open('post','/carrots-admin-ajax/a/login','true');

        xhr.send(formData);
        //xhr.responseType = "json";
        xhr.onload = function () {
            console.log(xhr.response);
            if(xhr.response.code === 0){
                notice.innerHTML= "";
                window.location.href= "task5-2.html";
            }else if(xhr.response.code !== 0){
                notice.innerHTML= xhr.response.message;
            }
        }
    }
}