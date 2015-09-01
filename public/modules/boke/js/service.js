/**
 * Created by yuyun on 15/8/10.
 */

bokeApp.factory('Articles', ['$resource',
    function ($resource) {
        return {
            list: $resource('/article/list', {}, {
                update: {
                    method: 'GET'
                }
            }),
            edit: $resource('/article/edit/:articleId', {
                articleId: '@_id'
            }, {
                update: {
                    method: 'POST'
                }
            }),
            search: $resource('/article/search/:keyCode', {
                keyCode: '@_code'
            }, {
                update: {
                    method: 'GET'
                }
            })
            ,
            add: $resource('/article/add', {}, {
                update: {
                    method: 'POST'
                }
            })
        }
    }
]);


bokeApp.factory('Comments', ['$resource',
    function ($resource) {
        return {
            list: $resource('/comment/list', {}, {
                update: {
                    method: 'GET'
                }
            }),
            add: $resource('/comment/add', {}, {
                save: {
                    method: 'POST',
                    isArray: true
                }
            })
        }
    }
]);
