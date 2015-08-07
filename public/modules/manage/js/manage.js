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
        //$urlRouterProvider.otherwise('/manage');
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
            }).
            state('list-article',{
                url:'/manage/article/list',
                templateUrl:'/modules/manage/views/list-article.client.view.html'
            }).
            state('add-article',{
                url:'/manage/article/add',
                templateUrl:'/modules/manage/views/add-article.client.view.html'
            }).
            state('edit-article',{
                url:'/manage/article/edit/:articleId',
                templateUrl:'/modules/manage/views/edit-article.client.view.html'
            }).
            state('list-type',{
                url:'/manage/type/list',
                templateUrl:'/modules/manage/views/list-type.client.view.html'
            }).
            state('add-type',{
                url:'/manage/type/add',
                templateUrl:'/modules/manage/views/add-type.client.view.html'
            }).
            state('edit-type',{
                url:'/manage/type/edit/:typeId',
                templateUrl:'/modules/manage/views/edit-type.client.view.html'
            })
    }
]);
manageApp.run(['Menus',function(Menus){
    Menus.addMenuItem('topbar', '文章', 'article', 'dropdown', '/article(/create)?');
    Menus.addMenuItem('topbar', '分类', 'type', 'dropdown', '/type(/create)?');
    Menus.addSubMenuItem('topbar', 'article', '文章列表', 'article/list');
    Menus.addSubMenuItem('topbar', 'article', '添加文章', 'article/add');
    Menus.addSubMenuItem('topbar', 'type', '分类列表', 'type/list');
    Menus.addSubMenuItem('topbar', 'type', '添加分类', 'type/add');
}]);

