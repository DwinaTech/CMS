var express = require('express');
var router = express.Router();

/* GET Admin page. */
router.get('/', function (req, res, next) {
    res.render('admin', { title: 'Admin Dashboard' });
});

module.exports = router;