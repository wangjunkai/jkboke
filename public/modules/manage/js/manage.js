/**
 * Created by yuyun on 15/7/29.
 */
// Setting up route
var y = YUYUN;
y.yuyun.appConfig.applicationModuleVendorDependencies.push('ui.bootstrap','ngResource', 'ngCookies');
y.yuyun.appConfig.registerModule('manageApp', y.yuyun.appConfig.applicationModuleVendorDependencies);

var manageApp = angular.module(y.yuyun.appConfig.thisApp);

manageApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/manage');
        $urlRouterProvider.when('', '/manage');
        // Home state routing
        $stateProvider.
            state('home', {
                url: '/manage',
                templateUrl: '/modules/manage/views/home.client.view.html'
            }).
            state('signup', {
                url: '/manage/signup',
                templateUrl: '/modules/manage/views/signup.client.view.html'
            }).
            state('signin', {
                url: '/manage/signin',
                templateUrl: '/modules/manage/views/signin.client.view.html'
            }).
            state('edit-profile', {
                url: '/manage/settings/profile',
                templateUrl: '/modules/manage/views/edit-profile.client.view.html'
            }).
            state('edit-password', {
                url: '/manage/settings/password',
                templateUrl: '/modules/manage/views/edit-password.client.view.html'
            })
    }
]);

