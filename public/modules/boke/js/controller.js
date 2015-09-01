'use strict';
/*
 bokeApp.controller('section', ['$scope', function ($scope) {

 }]);*/
bokeApp.controller('initsectionController', ['$scope', function ($scope) {
    //YUYUN.yuyun.bokeinit();
    YUYUN.yuyun.newindex.sectionAnimate.call(YUYUN.yuyun.newindex);
}]);

bokeApp.controller('SearchController', ['$scope', '$location', '$stateParams', 'Articles',
    function ($scope, $location, $stateParams, Articles) {
        $scope.keyenter = function (event) {
            var keycode = event.which;
            var value = event.target.value;
            if (keycode == 13) {
                $location.path('/wenzhang/search/' + value);
            }
        };
        $scope.find = function () {
            $scope.keywords = $stateParams.code;
            $scope.articles = Articles.search.query({
                keyCode: $stateParams.code
            });
        }
    }
]);

bokeApp.controller('ArticleController', ['$scope', '$stateParams', 'Articles',
        function ($scope, $stateParams, Articles) {
            $scope.find = function () {
                $scope.articles = Articles.list.query();
            };
            $scope.findOne = function () {
                $scope.article = Articles.edit.get({
                    articleId: $stateParams.articleId
                });
            };
        }]
);

bokeApp.controller('CommentController', ['$scope', '$stateParams', 'Articles', 'Comments',
        function ($scope, $stateParams, Articles, Comments) {
            $scope.find = function () {
                $scope.comment = {
                    content: ''
                };
                $scope.comments = Comments.list.query({
                    articleId: $stateParams.articleId
                });
            };
            $scope.findOne = function () {
                $scope.article = Articles.edit.get({
                    articleId: $stateParams.articleId
                });
            };

            $scope.create = function () {
                $scope.comment.articleId = $stateParams.articleId;
                $scope.comments = Comments.add.save({comment: $scope.comment}, function (response) {
                    $scope.comments = response;
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
                /*
                 comment.$toSave(function (response) {
                 $scope.comments = response;
                 }, function (errorResponse) {
                 $scope.error = errorResponse.data.message;
                 })*/
            };
            $scope.setatUser = function ($event) {
                $scope.comment.content += '@' + $event.target.innerHTML + ' ';
            };
        }]
);
