/**
 * Created by nina.zheng on 2016/12/1.
 */
app.controller('solrQAController', ['$stateParams', '$scope', 'Solr', '$state', '$http',
    function ($stateParams, $scope, Solr, $state, $http) {
        var id = $stateParams.id;
        $scope.name = $stateParams.name;
        $scope.cacheList = Array();
        var GetCacheList = function () {
            var params = {solrId: $stateParams.id};
            Solr.list(params).then(function (response) {
                $scope.solrList = response.data;
            })
        }
        GetCacheList();
        $scope.addCacheInfo = function (addcache) {
            addcache.server_id = $stateParams.serverId;
            Solr.add(addcache).then(function (response) {
                if (response.status == 200) {
                    $scope.cacheList.push(addcache)
                    $scope.newCacheInfo = {};
                }
            })
        }
        $scope.showItem = function (list) {
            $scope.item = list;
        };
        $scope.editSolr = function (item) {
            var params = {
                name:item.name,
                clear_api:item.clear_api,
                rebuild_api:item.rebuild_api,
                update_api:item.update_api,
                delete_api:item.delete_api,
                id:item.id,
            }
            Solr.edit(item).then(function (response) {
                if (response.status == 200) {
                    GetCacheList();
                }
            })
        };

        $scope.clear = function (item) {
            var params = {
                core: item.name,
                solrId: $stateParams.id,
                clear_api: item.clear_api
            }
            $http.get(item.clear_api).success(function(){
                GetCacheList();
            })
        }
        $scope.rebuild = function (item) {
            var params = {
                core: item.name,
                solrId: $stateParams.id
            }
            $http.get(item.rebuild_api).success(function(){
                GetCacheList();
            })
        }
        $scope.toDocument = function (core) {
            $state.go('app.document', {core: core.name,solrId:core.id});
        }
    }]);