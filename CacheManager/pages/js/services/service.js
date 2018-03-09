var serverUrl = "/cache";
app.factory('server', ['$http', function ($http) {
    return {
        list: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/servers/list"
            });
        },
        add: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/servers/add",
                data :params
            });
        },
        edit: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/servers/edit",
                data :params
            });
        },
        delete: function (id) {
            return $http({
                method: 'POST',
                url: serverUrl + "/servers/delete",
                data :{id:id}
            });
        },
    };
}]);
app.factory('Cache', ['$http', function ($http) {
    return {
        list: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/caches/list",
                data:params
            });
        },
        item: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/caches/item",
                data:params
            });
        },
        add: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/caches/add",
                data :params
            });
        },
        edit: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/caches/edit",
                data :params
            });
        },
        delete: function (id) {
            return $http({
                method: 'POST',
                url: serverUrl + "/caches/delete",
                data:{id:id}
            });
        }
    };
}]);
app.factory('Data', ['$http', function ($http) {
    return {
        list: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/datas/list",
                data:params
            });
        },
        edit: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/datas/edit",
                data:params
            });
        },
        delete: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/datas/delete",
                data:params
            });
        },
    };
}]);
app.factory('Search', ['$http', function ($http) {
    return {
        list: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/search/list"
            });
        },
        add: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/search/add",
                data :params
            });
        },
        edit: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/search/edit",
                data :params
            });
        },
        delete: function (id) {
            return $http({
                method: 'POST',
                url: serverUrl + "/search/delete",
                data :{id:id}
            });
        },
    };
}]);
app.factory('Solr', ['$http', function ($http) {
    return {
        list: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl +"/solr/index/cores",
                data:params
            });
        },
        edit: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/solr/index/edit",
                data :params
            });
        },
        clear: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/solr/index/deleteAll",
                data:params
            });
        },
        rebuild: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/solr/index/rebuild",
                data:params
            });
        },
        update: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/solr/index/update",
                data:params
            });
        },
        delete: function (params) {
            return $http({
                method: 'POST',
                url: serverUrl + "/solr/index/delete",
                data:params
            });
        }
    };
}]);

