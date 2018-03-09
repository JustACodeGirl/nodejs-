/**
 * Created by nina.zheng on 2016/12/1.
 */
app.controller('documentController', ['$stateParams', '$scope', 'Solr', '$http',
    function ($stateParams, $scope, Solr, $http) {
        $scope.core = $stateParams.core;
        $scope.updataSolr = function (core,ids) {
            var params = {
                core:core,
                ids:ids,
                solrId:$stateParams.solrId
            };
            Solr.update(params).then(function(response){
                if(response.status == 200){
                    return;
                }
            })
        };
        $scope.deleteSolr = function (core,ids) {
            var params = {
                core:core,
                ids:ids,
                solrId:$stateParams.solrId
            };
            Solr.delete(params).then(function(response){
                if(response.status == 200){
                    return;
                }
            })
        };
        $scope.isShowValueItem = function (type) {
            if (type == 'value') {
                $scope.ShowValue = false;
            }else{
                $scope.ShowValue = true;
            }
        };
        $scope.showItem = function(core,ids){
            $scope.core = core;
            $scope.ids = ids;
        }
        $scope.queryItem = function (key, type) {
            var params = {
                key: key,
                type: type
            };
            Data.list(params).then(function (response) {
                if (response.status == 200) {
                    $scope.dataList = [];
                    if (type == 'map' || type == 'set' || type == 'zset') {
                        angular.forEach(response.data, function (data, index) {
                            var params = {
                                key: index,
                                value: data
                            }
                            $scope.dataList.push(params);
                        })
                    }
                    else if (type == 'value') {
                        $scope.isShowValue = true;
                        $scope.data = response.data;
                    }
                }
            })
        }
    }]);