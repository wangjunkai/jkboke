'use strict';

// Setting up route
var y = YUYUN;
var bokeApp = YUYUN.yuyun.bokeApp();
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
                        templateUrl: 'modules/core/views/shouye.client.view.html',
                        controller:'initsectionController'
                    }
                }
            })
            .state('wenzhang', {
                url: '/wenzhang',
                views: {
                    'wenzhang': {
                        templateUrl: 'modules/core/views/wenzhang.client.view.html',
                        controller:'initsectionController'
                    }
                }
            })
            .state('jianjie', {
                url: '/jianjie',
                views: {
                    'jianjie': {
                        templateUrl: 'modules/core/views/jianjie.client.view.html',
                        controller:'initsectionController'
                    }
                }
            });
    }
]);
