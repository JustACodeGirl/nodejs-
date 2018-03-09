'use strict';

angular.module('app')
    .controller('AppCtrl', ['$rootScope', '$scope', '$window', '$state', '$http', 'server', 'Search',
        function ($rootScope, $scope, $window, $state, $http, server, Search) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            $scope.app = {
                name: '管理系统',
                version: '1.0.0',
                settings: {
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            };
            $scope.$on('$fromServerControllerClick', function(e,data){
                //console.log(data); // hello
                GetServerList();
            });
            $scope.$on('$fromSearchControllerClick', function(e,data){
                //console.log(data); // hello
                GetSearchList();
            });
            var searchItem = {};
            var GetServerList = function () {
                server.list().then(function (response) {
                    if (response.status == 200) {
                        $scope.serverList = response.data;
                    }
                })
            }
            GetServerList();
            var GetSearchList = function () {
                Search.list().then(function (response) {
                    if (response.status == 200) {
                        $scope.searchList = response.data;
                    }
                })
            }
            GetSearchList();
            $scope.thisItem = function (item) {
                $state.go('app.cache', {serverId: item.id,serverName:item.server_name});
            }
            $scope.stateItem = function (item) {
                $state.go('app.searchDetail', {id:item.id,name:item.name});
            }
            $scope.login = function (admin, form) {
                $state.go('app.server');
            };
            $scope.back = function(){
                window.history.back(-1);
            }
            function isSmartDevice($window) {
                var ua = $window['navigator']['userAgent'] || $window['navigator']['js'] || $window['opera'];
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
        }]);
