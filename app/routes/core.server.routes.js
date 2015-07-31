'use strict';

module.exports = function(app) {

	var core = require('../../app/controllers/core.server.controller');
	var user = require('../../app/controllers/manage/user.server.controller.js');
	app.route('/').get(core.index);
	app.route('/manage').get(core.manage);

	// 登录注册路由
	app.route('/auth/signup').post(user.signup);
	app.route('/auth/signin').post(user.signin);
	app.route('/auth/signout').post(user.signout);
	// Setting up the users password api

	app.route('/auth/password').post(user.changePassword);
	app.route('/auth/profile').post(user.changeProfile);
	//app.route('/auth/forgot').post(users.forgot);
	//app.route('/auth/reset/:token').get(users.validateResetToken);
	//app.route('/auth/reset/:token').post(users.reset);

};
