'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Comment = mongoose.model('Comment');

/**
 * Create a Comment
 */
exports.add = function (req, res, next) {
    var comment = new Comment(req.body.comment);
    comment.user = req.user;
    comment.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.query.articleId = comment.articleId;
            next();
        }
    });
};

/**
 * Show the current Comment
 */
exports.read = function (req, res) {
    res.json(req.comment);
};

/**
 * Update a Comment
 */
exports.update = function (req, res) {
    var comment = req.comment;

    comment = _.extend(comment, req.body);

    comment.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(comment);
        }
    });
};

/**
 * Delete an Comment
 */
exports.delete = function (req, res) {
    var comment = req.comment;

    comment.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(comment);
        }
    });
};

/**
 * List of Comments
 */
exports.list = function (req, res) {
    Comment.find({'articleId': req.query.articleId}).sort('-created').exec(function (err, Comments) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(Comments);
        }
    });
};
exports.commentByArticleID = function (req, res, next, id) {
    req.articleId = id;
};
/**
 * Comment middleware
 */
exports.CommentByID = function (req, res, next, id) {
    Comment.findById(id).populate([{path: 'user', select: 'username'}]).exec(function (err, Comment) {
        if (err) return next(err);
        if (!Comment) return next(new Error('Failed to load Comment ' + id));
        req.Comment = Comment;
        next();
    });
};

/**
 * Comment authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.comment.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
