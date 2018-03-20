//路由配置
app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('','login');

    $stateProvider
        .state("login",{
            url:"/login",
            views: {
                "mainLayer": {
                    templateUrl: "task6-1.html",
                    controller:"loginCtrl"
                }
            },
            resolve:{
                deps:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('js/app-controller/loginCtrl.js');
                }]
            },
            cache: false
        })
        .state("admin", {
            url: "/",
            views: {
                "mainLayer": {
                    templateUrl: "task6-2.html",
                    controller:'admin'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('js/app-controller/admin.js');
                }]
            },
            cache: false
        })
        .state("admin.dashboard",{
            url:"dashboard",
            views: {
                "secondLayer": {
                    templateUrl: "task6-2-1.html"
                }
            },
            cache: false
        })
        .state("admin.articleList",{
            url:"articleList",
            views: {
                "secondLayer": {
                    templateUrl: "task6-2-2.html",
                    controller:'articleList'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('js/app-controller/articleList.js');
                }]
            },
            cache: true
        })
        .state("admin.articleList.page",{
            url:"/:page/:size?type&status&startAt&endAt",
            params:{
                type: null,
                status: null,
                startAt: null,
                endAt: null
            },
            views: {
                "thirdLayer": {
                    templateUrl: "task6-2-2-1.html"
                }
            },
            cache: false
        })
        .state("admin.articleDetail",{
            url:"articleDetail",
            views: {
                "secondLayer": {
                    templateUrl: "task6-2-3.html",
                    controller:'articleDetail'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('js/app-controller/articleDetail.js');
                }]
            },
            cache: false
        })
        .state("admin.articleDetail.edit",{
            url:"?id",
            params:{
                id: null
            },
            views: {
                "secondLayer": {
                    templateUrl: "task6-2-3.html"
                }
            },
            cache: false
        });
}]);

//登录控制
app.run(['$transitions','$rootScope','$state', function($transitions,$rootScope,$state){
    $transitions.onStart({}, function(trans) {
        if(sessionStorage.getItem("id")!='admin'){
            $state.go("login");
        }
    });
}]);
/**
 * Created by xyq on 2018/3/11.
 */
