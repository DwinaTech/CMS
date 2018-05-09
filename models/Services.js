const mongoose = require('mongoose')
const { Schema } = mongoose;

const serviceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  serviceImage: {
    type: String
  },
  content: {
    type: String,
    required: true
  }
})

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;