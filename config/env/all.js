'use strict';

module.exports = {
	app: {
		title: 'jkboke',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				//'public/lib/bootstrap/dist/css/bootstrap.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/modules/core/css/main.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/jquery/dist/jquery.js',
				//'public/lib/angular-resource/angular-resource.js', 
				//'public/lib/angular-cookies/angular-cookies.js', 
				//'public/lib/angular-animate/angular-animate.js', 
				//'public/lib/angular-touch/angular-touch.js', 
				//'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				//'public/lib/angular-ui-utils/ui-utils.js',
				//'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
				'public/modules/core/js/yuyun.js',
				'public/modules/core/config/core.client.routes.js',
				'public/modules/core/js/main.js',
				'public/modules/core/js/controller.js',
				'public/modules/core/js/directive.js'
			]
		},
		css: [
			//'public/modules/**/css/*.css'
		],
		js: [
			//'public/config.js',
			//'public/application.js',
			//'public/modules/*/*.js',
			//'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
