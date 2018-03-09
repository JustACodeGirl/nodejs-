app.controller('cacheController', ['$stateParams', '$scope', 'Cache', '$state', '$http',
    function ($stateParams, $scope, Cache, $state, $http) {
        var serverId = $stateParams.serverId;
        $scope.serverName = $stateParams.serverName;
        $scope.cacheList = Array();
        var GetCacheList = function () {
            var params = {serverId: $stateParams.serverId,}
            Cache.list(params).then(function (response) {
                if (response.status == 200) {
                    $scope.cacheList = response.data;
                }
            })
        }
        GetCacheList();

        $scope.addCacheInfo = function (addcache) {
            addcache.server_id = $stateParams.serverId;
            Cache.add(addcache).then(function (response) {
                if (response.status == 200) {
                    $scope.cacheList.push(addcache)
                    $scope.newCacheInfo = {};
                }
            })
        };

        $scope.showItem = function (list, $index) {
            $scope.$index = $index;
            $scope.cache = list;
        };

        $scope.editCacheInfo = function (editcache) {
            editcache.server_id = $stateParams.serverId;
            Cache.edit(editcache).then(function (response) {
                if (response.status == 200) {
                }
            })
        };

        $scope.deleteCache = function (deletecache, $index) {
            Cache.delete(deletecache.id).then(function (response) {
                if (response.status == 200) {
                    $scope.cacheList.splice($index, 1)
                }
            })
        };

        $scope.toDate = function (cache) {
            $state.go('app.data', {
                cache_id: cache.id,
                serverId: $stateParams.serverId,
            });
        }
    }]);