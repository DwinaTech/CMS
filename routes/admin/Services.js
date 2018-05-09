const express = require('express');
const router = express.Router();
const dbService = require('../../db/dbServices');

router.get('/', (req, res) => {
  try {
    dbService.getServices(service => {
      res.render('servicesPage', {
        service
      });
    });
  } catch (err) {
    res.render('servicesPage', {
      message: "The service data did not!",
      success: false,
      err
    })
  }
});

router.get('/add', (req, res) => {
  res.render('service', {
    serviceTitle: "Add",
    imageTitle: "Add"
  })
});

router.post('/add', (req, res) => {
  let query = req.body;
  try {
    dbService.addService(query, () => {
      res.redirect('/admin/service')
    });
  } catch (err) {
    res.render('service', {
      message: "The service data did not save!",
      success: false,
      err
    })
  }
});

router.get('/edit/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  try {
    dbService.findServiceById(serviceId, (err, service) => {
      res.render("service", {
        serviceTitle: 'edit',
        service,
        imageTitle: "Edit"
      });
    });
  } catch (err) {
    res.render('service', {
      message: "The service data did not!",
      success: false,
      err
    })
  }
});

router.post('/edit/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  let query = req.body;
  try {
    dbService.editService(serviceId, query, () => {
      res.redirect('/admin/service')
    });
  } catch (err) {
    res.render('service', {
      message: "The service data did not update!",
      success: false,
      err
    })
  }
});

router.get('/delete/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  try {
    dbService.deleteService(serviceId, () => {
      res.redirect('/admin/service');
    });
  } catch (err) {
    res.render('servicesPage', {
      message: "Acured an error",
      success: false,
      err
    });
  }
});

module.exports = router;
