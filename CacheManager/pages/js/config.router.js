'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/app/server');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'views/app.html'
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                //signin
                .state('app.server', {
                    url: '/server',
                    templateUrl: 'views/server.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/server.js');
                            }]
                    }
                })
                .state('app.cache', {
                    url: '/cache/:serverId,:serverName',
                    templateUrl: 'views/cache.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/cache.js');
                            }]
                    }
                })
                .state('app.data', {
                    url: '/data/:cache_id,:serverId',
                    templateUrl: 'views/data.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/data.js');
                            }]
                    }
                })
                .state('app.search', {
                    url: '/search',
                    templateUrl: 'views/searchManage.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/search.js');
                            }]
                    }
                })
                .state('app.searchDetail', {
                    url: '/searchDetail/:id,:name',
                    templateUrl: 'views/searchDetail.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/searchDetail.js');
                            }]
                    }
                })
                .state('app.document', {
                    url: '/document/:core,:solrId',
                    templateUrl: 'views/document.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/document.js');
                            }]
                    }
                })

        }
    ]
);