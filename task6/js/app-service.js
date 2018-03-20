app.factory('loginService', function ($http) {
    return {
        login: function (params) {
            return $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/login',
                params: params
            })
        },
        logout: function () {
            return $http.post('/carrots-admin-ajax/a/logout');
        }
    }
})
    .factory('dataService', function ($http){
        return {
            getList: function (params) {
                return $http({
                    method: 'GET',
                    url: '/carrots-admin-ajax/a/article/search',
                    params: params
                })
            },
            deleteId: function (id) {
                return $http({
                    method: 'delete',
                    url: '/carrots-admin-ajax/a/u/article/'+id
                })
            },
            statusId: function (params) {
                return $http({
                    method: 'PUT',
                    url: '/carrots-admin-ajax/a/u/article/status',
                    params: params
                })
            },
            getId: function (id) {
                return $http({
                    method: 'get',
                    url: '/carrots-admin-ajax/a/article/'+id
                })
            },
            editId: function (params,id) {
                return $http({
                    method: 'PUT',
                    url: '/carrots-admin-ajax/a/u/article/'+id,
                    params: params
                })
            },
            createId: function (params) {
                return $http({
                    method: 'POST',
                    url: '/carrots-admin-ajax/a/u/article',
                    params: params
                })
            }
        }
    });


/**
 * Created by xyq on 2018/3/11.
 */
