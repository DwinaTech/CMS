require('./dbConection');
const Article = require('../models/Article');
//const ObjectId = require('mongodb').ObjectID;

const addArticle = (query, callBack) => {
    const articleData = new Article(query)
    articleData.save().then(callBack);
}

const findArticlesWithCategoryData = (query, callBack) => {
    Article.find(query).populate("category").exec(callBack);
}

const getArticle = (callBack) => {
    Article.find({}).then(callBack);
}

const findArticleById = (id, callBack) => {
    Article.findById(id).exec(callBack);
}

const editArticle = (articleId, query, callBack) => {
    Article.findByIdAndUpdate(articleId, query, callBack);
};

const deleteArticle = (id, callBack) => {
    Article.findByIdAndRemove(id, callBack);
}

module.exports = {
    addArticle,
    getArticle,
    editArticle,
    findArticleById,
    findArticlesWithCategoryData,
    deleteArticle
}