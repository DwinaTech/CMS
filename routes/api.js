const express = require('express');
const dbService = require('../db/dbServices');
const router = express.Router();

router.get('/service', (req, res) => {
  try {
    dbService.getServices(service => {
      res.json(service);
    });
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
