const express = require('express');
const api_key = process.env.KEY_NAME;
const DOMAIN = process.env.DOMAIN_NAME;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });
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

router.post('/contact', (req, res) => {
  const { email, fullname, tel, message } = req.body;
  const myEmail = process.env.MY_EMAIL;
  const data = {
    from: `<${email}>`,
    to: `Mr Dwina, <${myEmail}>`,
    subject: 'DwinaTech Customer',
    text: 'www.dwinaTech.com!',
    html: `<html>
      <h4>Name: ${fullname}</h4>
      <h5>Tel: ${tel}</h5>
      <p>Message: ${message}</p>
    </html>`,
  };

  mailgun.messages().send(data, function (body) {
    if (!body || body.length === 0) {
      res.status(502).json({
        success: false,
        message: "Sorry there is an error occurred, please try again",
      })
    }
    res.json({
      success: true,
      message: "Thank you I will reply as soon as possible!",
    });
  });
})

module.exports = router;
