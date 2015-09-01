'use strict';

module.exports = {
	app: {
		title: '前端技术博客',
		description: '王俊凯个人前端技术博客，个人生活日志',
		keywords: 'MongoDB, Express, AngularJS, Node.js,前端,js,html,css'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	managesets:{
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/modules/manage/css/core.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',

				'public/modules/yuyun.js',
				'public/modules/manage/js/main.js',
				'public/modules/manage/js/manage.js',
				'public/modules/manage/js/controller.js',
				'public/modules/manage/js/service.js',
				//'public/modules/users/*/*.js'
			]
		}
	},
	assets: {
		lib: {
			css: [
				'public/modules/boke/css/main.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/modules/yuyun.js',
				'public/modules/boke/js/main.js',
				'public/modules/boke/js/boke.js',
				'public/modules/boke/js/controller.js',
				'public/modules/boke/js/service.js',
			]
		}
	}
};
