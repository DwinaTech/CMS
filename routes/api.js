const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', (req, res) => {
 res.json({success: true})
});

router.get('/service', (req, res) => {
  res.json({success: true})
})

module.exports = router;
