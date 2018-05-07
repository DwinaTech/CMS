require('./dbConection');
const Categiry = require('../models/Category');
const ObjectId = require('mongodb').ObjectID;

const addCategory = (query, callBack) => {
    const categoryData = new Categiry(query)
    categoryData.save().then(callBack);
}

const getCategory = (callBack) => {
    Categiry.find({}).then(callBack);
}

const findCategoryById = (id, callBack) => {
    Categiry.findById(id).exec(callBack);
}

const editCategory = (categoryId, query, callBack) => {
    Categiry.update({ "_id": ObjectId(categoryId) }, query, callBack);
};

module.exports = {
    addCategory,
    getCategory,
    findCategoryById,
    editCategory
}
