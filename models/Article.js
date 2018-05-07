const mongoose = require('mongoose')
const Categiry = require('../models/Category');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    articleImage: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    content: {
        type: String,
        required: true
    },
    footer: {
        type: String,
        required: true
    }
})

const Article = mongoose.model('article', articleSchema);

module.exports = Article;