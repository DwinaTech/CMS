require('./dbConection');
const Service = require('../models/Services');

const addService = (query, callBack) => {
  const serviceData = new Service(query)
  serviceData.save().then(callBack);
}

const getServices = (callBack) => {
  Service.find({}).then(callBack);
}

const findServiceById = (id, callBack) => {
  Service.findById(id).exec(callBack);
}

const editService = (serviceId, query, callBack) => {
  Service.findByIdAndUpdate(serviceId, query, callBack);
};

const deleteService = (id, callBack) => {
  Service.findByIdAndRemove(id, callBack);
}

module.exports = {
  addService,
  getServices,
  editService,
  findServiceById,
  deleteService
}
