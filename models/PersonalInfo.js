const mongoose = require('mongoose')
const { Schema } = mongoose;

const personalInfoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  infoDate: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;