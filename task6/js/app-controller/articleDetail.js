//新增页控制器
angular.module('myApp').controller('articleDetail',['$scope','FileUploader','$state','$stateParams','dataService',function ($scope,FileUploader,$state,$stateParams,dataService) {
    if($stateParams.id){
        dataService.getId($stateParams.id).then(function (res) {
            $scope.n = res.data.data.article;
            $scope.title = $scope.n.title;
            $scope.type = $scope.n.type+'';
            $scope.industry = $scope.n.industry+'';
            $scope.content = $scope.n.content;
            $scope.url = $scope.n.url;
            $scope.imageSrc = $scope.n.img;
        });
    }
    $scope.uploader = new FileUploader();
    var uploader=$scope.uploader;/*实例化一个FileUploader对象*/
    uploader.url='/carrots-admin-ajax/a/u/img/task';/*以下是设置了两个必须的属性*/
    uploader.queue=[];

    uploader.onSuccessItem = function(fileItem, response) {
        $scope.imageSrc = response.data.url;
    };

    $scope.cancel=function(){
        $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''});
    };

    $scope.uploading = function(status){
        if($stateParams.id){
            var params4 ={
                "id":$stateParams.id,
                "type":$scope.type,
                "img":$scope.imageSrc,
                "title":$scope.title,
                "order":$scope.n.order,
                "author":$scope.n.anchor,
                "source":$scope.n.source,
                "url":$scope.url,
                "content":$scope.content,
                "summary": $scope.n.summary,
                "createBy": $scope.n.createBy,
                "updateBy": $scope.n.updateBy,
                "publishat": $scope.n.publishat,
                "updateAt": new Date().valueOf(),
                "createAt": $scope.n.createAt,
                "status": status,
                "industry": $scope.industry?$scope.industry:''
            };
            dataService.editId(params4,$stateParams.id).then(function () {
                $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''},{reload:true});
            });
        }else {
            var params5 ={
                "type":$scope.type,
                "img":$scope.imageSrc,
                "title":$scope.title,
                "url":$scope.url,
                "content":$scope.content,
                "status": status,
                "industry": $scope.industry?$scope.industry:''
            };
            dataService.createId(params5).then(function (){
                $state.go('admin.articleList.page',{"page":1,"size":10,"type":'',"status":'',startAt:'',"endAt":''},{reload:true});
            });
        }
    }
}]);
/**
 * Created by xyq on 2018/3/11.
 */
/**
 * Created by xyq on 2018/3/13.
 */
