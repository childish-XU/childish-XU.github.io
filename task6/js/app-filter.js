app.filter('arrType',function(){
    return function(str){
        var arrType = ['首页banner','找职位banner','找精英banner','行业大图'];
        return arrType[str];
    }
})
    .filter('arrStatus',function(){
        return function(str) {
            var arrStatus = ['草稿','上线'];
            return arrStatus[str];
        }
    })
    .filter('arrOption',function(){
        return function(str) {
            var arrOption = ['上线','下线'];
            return arrOption[str];
        }
    })
    .filter('errorReport',function($filter){
        return function (err,reg){
            var id ={
                rUser: [
                { name:'default',tips:''},
                { name:'required',tips:'用户名不能为空'},
                { name:'pattern',tips:'用户名必须为字母'}
                ],
                rPwd: [
                    { name:'default',tips:''},
                    { name:'required',tips:'密码不能为空'},
                    { name:'minlength',tips:'密码不少于6位'}
                ]
            };
            for(attr in err){
                if (err[attr]== true ){
                    return $filter('filter')(id[reg],attr)[0].tips;
                }
            }
        }
    })
;

/**
 * Created by xyq on 2018/3/11.
 */
