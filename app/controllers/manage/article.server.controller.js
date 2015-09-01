'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Article = mongoose.model('Article');

/**
 * Create a article
 */
exports.add = function (req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var article = req.article;

    article.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
    Article.find().sort('-created').populate('user', 'username').exec(function (err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};
exports.articleByCode = function(req,res,next,code){
    var search = {
        title: {$regex: '*' + code + '*', $option: 'si'}
    }
    Article.find(search).sort('-created').exec(function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('没有结果'));
        req.article = article;
        next();
    })
};
/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {
    Article.findById(id).populate([{path: 'user', select: 'username'}]).exec(function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
