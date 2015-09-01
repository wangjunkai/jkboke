'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    /*
     onlineEmail:{
     type: String,
     default: '',
     trim: true,
     match: [/.+\@.+\..+/, '请填写正确的电子邮箱']
     },*/
    onlineName: {
        type: String,
        default: '',
        trim: true
    },
    articleId:{
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Comment', CommentSchema);
