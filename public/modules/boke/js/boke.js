'use strict';

// Setting up route
var y = YUYUN;

y.yuyun.appConfig.registerModule('bokeApp', y.yuyun.appConfig.applicationModuleVendorDependencies);
var bokeApp = angular.module(y.yuyun.appConfig.thisApp);

bokeApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(false);
        // Redirect to home view when route not found
        $urlRouterProvider.when('', '/shouye');
        $urlRouterProvider.otherwise('/shouye');
        //Home state routing
        $stateProvider
            .state('shouye', {
                url: '/shouye',
                views: {
                    'shouye': {
                        templateUrl: 'modules/boke/views/shouye.client.view.html',
                        controller: 'initsectionController'
                    }
                }
            })
            .state('wenzhang', {
                url: '/wenzhang',
                views: {
                    'wenzhang': {
                        templateUrl: 'modules/boke/views/wenzhang.client.view.html',
                        controller: 'initsectionController'
                    }
                }
            })
            .state('jianjie', {
                url: '/jianjie',
                views: {
                    'jianjie': {
                        templateUrl: 'modules/boke/views/jianjie.client.view.html',
                        controller: 'initsectionController'
                    }
                }
            });
    }
]);
