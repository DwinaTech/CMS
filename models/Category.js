const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;