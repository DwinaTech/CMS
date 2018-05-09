const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../login/ensureAuthenticated');
const dbCategory = require('../db/dbCategories');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    const callBack = (category, err) => {
      if (err) {
        res.render('index', {
          error: error
        })
      } else {
        res.render('index', {
          category
        })
      }
    }
    dbCategory.getCategory(callBack);
});

module.exports = router;
