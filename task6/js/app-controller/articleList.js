//列表页控制器
angular.module('myApp').controller('articleList',['$scope','$rootScope','$state','$filter','$stateParams','dataService',function ($scope,$rootScope,$state,$filter,$stateParams,dataService) {
    $rootScope.sVar2 = false;
    var params1 ={
        page : $stateParams.page,
        type : $stateParams.type,
        status : $stateParams.status,
        startAt : $stateParams.startAt,
        endAt : $stateParams.endAt
    };
    dataService.getList(params1).then(function (res) {
        $scope.n = res.data;
        $scope.totalItems = $scope.n.data.total;
        $scope.currentPage = $stateParams.page;
        $scope.type = $stateParams.type;
        $scope.status = $stateParams.status;
    });

    $scope.search = function (){
        $scope.currentPage =1;
        $scope.turnPage();
    };

    $scope.turnPage=function(){
        try {
            $scope.timeS = $scope.dat1.valueOf();
            $scope.timeE = $scope.dat2.valueOf()+86399999;
        }catch(err){
            $scope.timeS = '';
            $scope.timeE = '';
        }
        var params2 ={
            "page": $scope.currentPage,
            "startAt":$scope.timeS,
            "endAt":$scope.timeE,
            "type":$scope.type,
            "status":$scope.status
        };
        dataService.getList(params2).then(function (res) {
            $scope.n = res.data;
            $scope.totalItems = $scope.n.data.total;
            $state.go('admin.articleList.page',{"page":$scope.currentPage,"size":10,"type":$scope.type,"status":$scope.status,"startAt":$scope.timeS,"endAt":$scope.timeE});
        });
    };

    //日期组件控制
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.add = function(){
        $state.go('admin.articleDetail');
    };
    $scope.deleteModal = function(i){
        var id = i;
        $scope.delete = function (){
            dataService.deleteId(id).then(function () {
                $('#myModal1').on('hidden.bs.modal', function () {
                    $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''},{reload:true});
                });
            });
        };
    };

    $scope.statusModal = function(i,s){
        var id = i;
        var status = s==1?2:1;
        $scope.changeStatus = function (){
            var params3 = {
                "id": id,
                "status": status
            };
            dataService.statusId(params3).then(function () {
                $('#myModal2').on('hidden.bs.modal', function (e) {
                    $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''},{reload:true});
                });
            });
        };
    };

    $scope.edit = function(i){
        $state.go('admin.articleDetail.edit',{"id":i});
    }
}]);
/**
 * Created by xyq on 2018/3/13.
 */
