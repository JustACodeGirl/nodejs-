app.controller('serverController', ['$rootScope', '$state', '$scope', 'server', 'Cache',
    function ($rootScope, $state, $scope, server, Cache) {
        var GetServerList = function () {
            server.list().then(function (response) {
                if (response.status == 200) {
                    $scope.serverList = response.data;
                    $scope.$emit('$fromServerControllerClick','hello');
                }
            })
        }
        GetServerList();
        $scope.thisItem = function (item) {
            $state.go('app.cache', {serverId:item.id,serverName:item.server_name});
        }
        $scope.addServerInfo = function (addserver) {
            server.add(addserver).then(function (response) {
                if (response.status == 200) {
                    GetServerList();
                    $scope.addserver = {};
                }
            })
        };
        $scope.showDeleteItem = function (serverItem, $index) {
            $scope.$index = $index;
            $scope.deleteServerItem = serverItem;
        };
        $scope.showItem = function (serverItem) {
            $scope.editServer = serverItem;
        };
        $scope.cacheList = {}
        $scope.deleteServer = function (serverItem, $index) {
            server.delete(serverItem.id).then(function (response) {
                if (response.status == 200) {
                    GetServerList();
                    $scope.$emit('$fromServerControllerClick','hello');
                }
            })
        };
        $scope.clearServer = function(serverItem){
        };
        $scope.rebuildServer = function(serverItem){
        }
        $scope.editServerInfo = function (serverItem) {
            var params = {
                host:serverItem.host,
                port:serverItem.port,
                clearCacheApi:serverItem.clearCacheApi,
                rebuildCacheApi:serverItem.rebuildCacheApi,
                password:serverItem.password,
                server_name:serverItem.server_name,
                id:serverItem.id,
            }
            server.edit(serverItem).then(function (response) {
                if (response.status == 200) {
                }
            })
        };

    }]);