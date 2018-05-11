const express = require('express');
const dbService = require('../db/dbServices');
const dbPersonalInfo = require('../db/dbPersonalInfo');
const router = express.Router();

router.get('/service', (req, res) => {
  try {
    dbService.getServices(service => {
      res.status(200).json(service);
    });
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/info', (req, res) => {
  try {
    dbPersonalInfo.getPersonalInfo(personalInfo => {
      res.status(200).json(personalInfo);
    });
  } catch (err) {
    res.status(5002).json(err)
  }
});

module.exports = router;
