'use strict';

module.exports = function(app) {

	var core = require('../../app/controllers/core.server.controller');
	var user = require('../../app/controllers/manage/user.server.controller');
	var article = require('../../app/controllers/manage/article.server.controller');
	var type = require('../../app/controllers/manage/type.server.controller');
	app.route('/').get(core.index);
	app.route('/manage').get(core.manage);

	// 登录注册路由
	app.route('/auth/signup').post(user.signup);
	app.route('/auth/signin').post(user.signin);
	app.route('/auth/signout').post(user.signout);
	// Setting up the users password api

	app.route('/auth/password').post(user.changePassword);
	app.route('/auth/profile').post(user.changeProfile);

	//设置文章路由
	app.route('/article/list').get(article.list);
	app.route('/article/add').post(user.requiresLogin, article.add);

	app.route('/article/edit/:articleId')
		.get(article.read)
		.post(user.requiresLogin, article.hasAuthorization, article.update)
		.delete(user.requiresLogin, article.hasAuthorization, article.delete);

	// 映射文章ID
	app.param('articleId', article.articleByID);

	//设置文章类别路由
	app.route('/type/list').get(type.list);
	app.route('/type/add').post(user.requiresLogin, type.add);

	app.route('/type/edit/:typeId')
		.get(type.read)
		.post(user.requiresLogin, type.hasAuthorization, type.update)
		.delete(user.requiresLogin, type.hasAuthorization, type.delete);

	// 映射文章类别ID
	app.param('typeId', type.typeByID);
};
