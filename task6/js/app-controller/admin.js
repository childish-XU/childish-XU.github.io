//后台页控制器
angular.module('myApp').controller('admin',['$scope','$rootScope','$state','loginService',function($scope,$rootScope,$state,loginService){
    $rootScope.sVar1 = true;
    $rootScope.sVar2 = true;
    $scope.switch = function(s){
        $scope[s] = !$scope[s] ;
    };
    $scope.exit=function(){
        loginService.logout().then(function (res) {
            $state.go('login');
            sessionStorage.removeItem("id");
        });
    };
    $scope.entry=function(){
        $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''},{reload:true});
    }
}]);
/**
 * Created by xyq on 2018/3/13.
 */
