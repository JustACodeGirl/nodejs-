/*** Created by nina.zheng on 2016/12/1.*/
app.controller('searchController', ['$rootScope', '$state', '$scope', 'Search', 'Solr',
    function ($rootScope, $state, $scope, Search, Solr) {
        var GetSearchList = function () {
            Search.list().then(function (response) {
                if (response.status == 200) {
                    $scope.searchList = response.data;
                    $scope.$emit('$fromSearchControllerClick','hello');
                }
            })
        }
        GetSearchList();
        $scope.stateItem = function (item) {
            $state.go('app.searchDetail', {id:item.id,name:item.name});
        }
        $scope.addSearchInfo = function (addsearch) {
            Search.add(addsearch).then(function (response) {
                if (response.status == 200) {
                    GetSearchList();
                    $scope.addsearch = {};
                }
            })
        };
        $scope.showDeleteItem = function (serverItem, $index) {
            $scope.$index = $index;
            $scope.deleteSearchItem = serverItem;
        };
        $scope.showItem = function (Item) {
            $scope.editSearch = Item;
        };
        $scope.cacheList = {}
        $scope.deleteSearch = function (searchItem, $index) {
            Search.delete(searchItem.id).then(function (response) {
                if (response.status == 200) {
                    GetSearchList();
                    $scope.$emit('$fromSearchControllerClick','hello');
                }
            })
        };
        $scope.editSearchInfo = function (serverItem) {
            var params = {
                name :serverItem.name,
                solrIndexListApi :serverItem.solrIndexListApi,
                solrAdmin :serverItem.solrAdmin,
                description :serverItem.description,
                id :serverItem.id,
            }
            Search.edit(serverItem).then(function (response) {
                if (response.status == 200) {
                }
            })
        };
    }]);