'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Type = mongoose.model('Type');

/**
 * Create a article
 */
exports.add = function(req, res) {
	var type = new Type(req.body);
	type.user = req.user;

	type.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(type);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.type);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var type = req.type;

	type = _.extend(type, req.body);

	type.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(type);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var type = req.type;

	type.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(type);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Type.find().sort('-created').populate('user', 'username').exec(function(err, types) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(types);
		}
	});
};

/**
 * Article middleware
 */
exports.typeByID = function(req, res, next, id) {
	Type.findById(id).populate('user', 'username').exec(function(err, type) {
		if (err) return next(err);
		if (!type) return next(new Error('Failed to load article ' + id));
		req.type = type;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.type.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
