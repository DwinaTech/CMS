const express = require('express');
const router = express.Router();
const dbPersonalInfo = require('../../db/dbPersonalInfo');

router.get('/', (req, res) => {
  try {
    dbPersonalInfo.getPersonalInfo(personalInfo => {
      res.render('personalInfoPage', {
        personalInfo
      });
    });
  } catch (err) {
    res.render('personalInfoPage', {
      message: "an error occurred!",
      success: false,
      err
    })
  }
});

router.get('/add', (req, res) => {
  res.render('about', {
    aboutTitle: "Add"
  })
});

router.post('/add', (req, res) => {
  let query = req.body;
  try {
    dbPersonalInfo.addPersonalInfo(query, () => {
      res.redirect('/admin/personalInfo')
    });
  } catch (err) {
    res.render('about', {
      message: "The personal info did not save!",
      success: false,
      err
    })
  }
});

router.get('/edit/:personalId', (req, res) => {
  const { personalId } = req.params;
  try {
    dbPersonalInfo.findPersonalInfoById(personalId, (err, personalInfo) => {
      res.render("about", {
        personalInfo,
        aboutTitle: 'Edit'
      });
    });
  } catch (err) {
    res.render('about', {
      message: "an error occurred!",
      success: false,
      err
    })
  }
});

router.post('/edit/:personalId', (req, res) => {
  const { personalId } = req.params;
  let query = req.body;
  try {
    dbPersonalInfo.editPersonalInfo(personalId, query, () => {
      res.redirect('/admin/personalInfo')
    });
  } catch (err) {
    res.render('about', {
      message: "The personal info did not update!",
      success: false,
      err
    })
  }
});

router.get('/delete/:personalId', (req, res) => {
  const { personalId } = req.params;
  try {
    dbPersonalInfo.deletePersonalInfo(personalId, () => {
      res.redirect('/admin/personalInfo');
    });
  } catch (err) {
    res.render('about', {
      message: "an error occurred",
      success: false,
      err
    });
  }
});

module.exports = router;
