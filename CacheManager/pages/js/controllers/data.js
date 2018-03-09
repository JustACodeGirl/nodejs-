app.controller('dataController', ['$stateParams', '$scope', 'Cache', 'Data', '$http',
    function ($stateParams, $scope, Cache, Data, $http) {
        $scope.isShowBtn = true;
        $scope.ShowValue = true;
        $scope.isShowValue = true;
        $scope.isNoDataShow = false;
        $scope.isShowZset = false;
        $scope.cacheList = Array();
        $scope.sortOrder = [
            {order : "升序", boolean : "false"},
            {order : "降序", boolean : "true"}
        ];
        var GetCacheItem = function () {
            var param = {
                cache_id: $stateParams.cache_id,
            }
            Cache.item(param).then(function (response) {
                if (response.status == 200) {
                    $scope.cache_name = response.data[0].cache_name;
                    $scope.pattern_key = response.data[0].pattern_key;
                    $scope.type = response.data[0].type;
                }
            })
        }
        GetCacheItem();
        var GetCacheList = function () {
            var params = {serverId: $stateParams.serverId,}
            Cache.list(params).then(function (response) {
                if (response.status == 200) {
                    $scope.cacheList = response.data;
                }
            })
        }
        GetCacheList();

        $scope.checkedItem = function (cache) {
            var params = {
                serverId: $stateParams.serverId
            }
            Cache.list(params).then(function (response) {
                if (response.status == 200) {
                    angular.forEach(response.data, function (res) {
                        if (res.cache_name == cache) {
                            $scope.pattern_key = res.pattern_key;
                            $scope.type = res.type;
                        }
                    })
                }
            })
        };
        $scope.isShowValueItem = function (type) {
            if (type == 'value') {
                $scope.ShowValue = false;
            } else {
                $scope.ShowValue = true;
            }
        };
        $scope.showDateItem = function (pattern_key, type) {
            $scope.pattern_key = pattern_key;
            $scope.type = type;
        }
        $scope.queryItem = function (key, type,isdownItem) {
            var params = {
                key: key,
                type: type,
                isdownItem: isdownItem,
                serverId: $stateParams.serverId,
            };
            $scope.isNoDataShow = false;
            Data.list(params).then(function (response) {
                if (response.status == 200) {
                    $scope.dataList = [];
                    if (type == 'map') {
                        if (response.data == {} || response.data == "") {
                            $scope.isNoDataShow = true;
                        } else {
                            $scope.isShowValue = false;
                            $scope.isShowModifyBtn = true;
                            $scope.isShowZset = false;
                            angular.forEach(response.data, function (data, index) {
                                var params = {
                                    key: index,
                                    value: data
                                }
                                $scope.dataList.push(params);
                            })
                        }
                    } else if (type == 'set') {
                        if (response.data.length == 0) {
                            $scope.isNoDataShow = true;
                        } else {
                            $scope.isShowValue = false;
                            $scope.isShowModifyBtn = true;
                            $scope.isShowZset = false;
                            angular.forEach(response.data, function (data, index) {
                                var params = {
                                    key: index,
                                    value: data
                                }
                                $scope.dataList.push(params);
                            })
                        }
                    } else if (type == 'zset') {
                        if (response.data.length == 0) {
                            $scope.isNoDataShow = true;
                        } else {
                            $scope.isShowValue = false;
                            $scope.isShowModifyBtn = true;
                            $scope.isShowZset = true;
                            for (var i = 0; i < response.data.length; i++, i++) {
                                var params = {
                                    key: response.data[i + 1],
                                    value: response.data[i]
                                }
                                $scope.dataList.push(params);
                            }
                        }
                    }
                    else if (type == 'value') {
                        if (response.data == " ") {
                            $scope.isNoDataShow = true;
                            $scope.isShowModifyBtn = false;
                        } else {
                            $scope.isShowModifyBtn = true;
                            $scope.isShowValue = true;
                            $scope.data = response.data;
                        }
                    }
                }
            })
        }

        $scope.deleteItem = function (key, type) {
            var params = {
                key: key,
                type: type,
                serverId: $stateParams.serverId,
            }
            Data.delete(params).then(function (response) {
                if (response.status == 200) {
                    return;
                }
            })
        }
        $scope.editDate = function (key, item, type) {
            if (type == 'map') {
                var value = {};
                angular.forEach(item, function (data) {
                    value[data.key] = data.value;
                })
                var params = {
                    key: key,
                    value: value,
                    type: type,
                    serverId: $stateParams.serverId,
                }
                Data.edit(params).then(function (response) {
                })
            }
            else if (type == 'value') {
                var params = {
                    key: key,
                    value: item,
                    type: type,
                    serverId: $stateParams.serverId,
                }
                Data.edit(params).success(function (response) {
                })
            }
            else if (type == 'set' || type == 'zset') {
                var value = [];
                angular.forEach(item, function (data) {
                    value.push(data.value);
                })
                var params = {
                    key: key,
                    value: value,
                    type: type,
                    serverId: $stateParams.serverId,
                }
                Data.edit(params).success(function (response) {
                })
            }
        }
    }
]);