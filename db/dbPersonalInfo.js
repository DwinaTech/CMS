require('./dbConection');
const PersonalInfo = require('../models/PersonalInfo');

const addPersonalInfo = (query, callBack) => {
  const personalInfoData = new PersonalInfo(query)
  personalInfoData.save().then(callBack);
}

const getPersonalInfo = (callBack) => {
  PersonalInfo.find({}).then(callBack);
}

const findPersonalInfoById = (id, callBack) => {
  PersonalInfo.findById(id).exec(callBack);
}

const editPersonalInfo = (personalInfoId, query, callBack) => {
  PersonalInfo.findByIdAndUpdate(personalInfoId, query, callBack);
};

const deletePersonalInfo = (id, callBack) => {
  PersonalInfo.findByIdAndRemove(id, callBack);
}

module.exports = {
  addPersonalInfo,
  getPersonalInfo,
  editPersonalInfo,
  findPersonalInfoById,
  deletePersonalInfo
}
