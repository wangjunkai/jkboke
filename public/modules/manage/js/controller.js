/**
 * Created by yuyun on 15/7/28.
 */
'use strict';

manageApp.controller('HeaderController', ['$scope', '$http', '$location', 'Authentication', 'Menus',
    function ($scope, $http, $location, Authentication, Menus) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.signout = function () {
            $http.post('/auth/signout').success(function (response) {
                $location.path('/manage');
            }).error(function (responee) {
                $scope.error = response.message;
            });
        }
    }
]);

manageApp.controller('HomeController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
    }
]);

manageApp.controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function ($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function () {
            $http.post('/auth/signup', $scope.credentials).success(function (response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/manage');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function () {
            $http.post('/auth/signin', $scope.credentials).success(function (response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/manage');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);

manageApp.controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function ($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        // Check if there are additional accounts
        $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
            for (var i in $scope.user.additionalProvidersData) {
                return true;
            }

            return false;
        };

        // Check if provider is already in use with current user
        $scope.isConnectedSocialAccount = function (provider) {
            return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
        };

        // Remove a user social account
        $scope.removeUserSocialAccount = function (provider) {
            $scope.success = $scope.error = null;

            $http.delete('/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function (response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.user = Authentication.user = response;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };

        // Update a user profile
        $scope.updateUserProfile = function (isValid) {
            if (isValid) {
                $scope.success = $scope.error = null;
                var user = new Users($scope.user);

                user.$update(function (response) {
                    $scope.success = true;
                    Authentication.user = response;
                }, function (response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };

        // Change user password
        $scope.changeUserPassword = function () {
            $scope.success = $scope.error = null;

            $http.post('/auth/password', $scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);

manageApp.controller('ArticleController', ['$scope', '$stateParams', '$sce', '$location', 'Authentication', 'Articles', 'Types',
    function ($scope, $stateParams, $sce, $location, Authentication, Articles, Types) {


        $scope.authentication = Authentication;
        $scope.types = Types.list.query();

        $scope.create = function () {
            var article = new Articles.add($scope.article);
            article.$save(function (response) {
                $location.path('/manage/article/list');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (article) {
            if (article) {
                Articles.edit.remove({articleId: article._id}).$promise.then();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function () {
                    $location.path('/manage/article/list');
                });
            }
        };

        $scope.update = function () {
            var article = $scope.article;
            var content = document.querySelector('#content');
            article.content = content.value;
            Articles.edit.update({articleId: article._id}, article, function () {
                $location.path('/manage/article/list');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            /*
             article.$update(function () {
             $location.path('/manage/article/list');
             }, function (errorResponse) {
             $scope.error = errorResponse.data.message;
             });*/
        };

        $scope.find = function () {
            $scope.articles = Articles.list.query();
        };

        $scope.findOne = function () {

            $scope.article = Articles.edit.get({
                articleId: $stateParams.articleId
            }, function () {
                var editor = $('#content').length > 0 ? $('#content').wangEditor() : false;
                editor && editor.html($scope.article.content);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            $sce.trustAsHtml($scope.article.content);
        };
    }
]);

manageApp.controller('TypeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Types',
    function ($scope, $stateParams, $location, Authentication, Types) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var type = new Types.add($scope.type);
            type.$save(function (response) {
                $location.path('/manage/type/list');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (type) {
            if (type) {
                Types.edit.remove({typeId: type._id}).$promise.then();

                for (var i in $scope.types) {
                    if ($scope.types[i] === type) {
                        $scope.types.splice(i, 1);
                    }
                }
            } else {
                $scope.type.$remove(function () {
                    $location.path('/manage/type/list');
                });
            }
        };

        $scope.update = function () {
            var type = $scope.type;
            Types.edit.update({typeId: type._id}, type, function () {
                $location.path('/manage/type/list');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            /*
             article.$update(function () {
             $location.path('/manage/article/list');
             }, function (errorResponse) {
             $scope.error = errorResponse.data.message;
             });*/
        };

        $scope.find = function () {
            $scope.types = Types.list.query();
        };

        $scope.findOne = function () {
            $scope.type = Types.edit.get({
                typeId: $stateParams.typeId
            });
        };
    }
]);
