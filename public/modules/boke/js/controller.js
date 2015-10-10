'use strict';
/*
 bokeApp.controller('section', ['$scope', function ($scope) {

 }]);*/
bokeApp.controller('initsectionController', ['$scope', function ($scope) {
    //YUYUN.yuyun.bokeinit();
    YUYUN.yuyun.newindex.sectionAnimate.call(YUYUN.yuyun.newindex);
    YUYUN.yuyun.newindex.bdShare.call(YUYUN.yuyun.newindex);
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

bokeApp.controller('ArticleController', ['$scope','$location', '$stateParams', '$sce', '$anchorScroll', 'Articles', 'Comments',
        function ($scope,$location, $stateParams, $sce, $anchorScroll, Articles, Comments) {
            $scope.commentAnchor = 'commentAnchor';
            $scope.find = function () {
                $scope.articles = Articles.list.query(function (response) {
                    $scope.articles = response;
                    for (var i = 0; i < response.length; i++) {
                        var c = function (i) {
                            Comments.list.query({
                                articleId: response[i]._id
                            }, function (newre) {
                                $scope.articles[i].commentCount = newre.length;
                            });
                        }(i);
                    }
                });
            };
            $scope.findOne = function () {
                $scope.article = Articles.edit.get({
                    articleId: $stateParams.articleId
                }, function () {
                    $scope.article.content = $sce.trustAsHtml($scope.article.content);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

            };
            $scope.goto = function(id){
                $location.hash(id);
                $anchorScroll();
            }
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
