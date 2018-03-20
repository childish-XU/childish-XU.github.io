//登录页控制器
angular.module('myApp').controller('loginCtrl',['$scope','$location','$filter','loginService',function($scope,$location,$filter,loginService){

    $scope.change = function(reg,err){
        $scope.userWrong = "";
        $scope.pwdWrong = "";
        $scope[reg] = $filter('errorReport')(err,reg);
    };

    $scope.check = function(state){
        if(state){
            var params ={
                name: $scope.user,
                pwd: $scope.pwd
            };
            loginService.login(params).then(function (res) {
                if(res.data.code==0){
                    sessionStorage.setItem("id", res.data.data.manager.name);
                    $location.path('/dashboard');
                }else if(res.data.code==-5003){
                    $scope.userWrong = res.data.message;
                }else if(res.data.code==-5004){
                    $scope.pwdWrong = res.data.message;
                }
            });
        }
    };
}]);
/**
 * Created by xyq on 2018/3/13.
 */
