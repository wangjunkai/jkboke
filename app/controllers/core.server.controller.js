'use strict';

/**
 * 首页
 */
exports.index = function(req, res) {
	res.render('boke', {
		user: req.user || null,
		request: req
	});
};
//后台
exports.manage = function(req, res) {
	res.render('manage', {
		user: req.user || null,
		request: req
	});
};
