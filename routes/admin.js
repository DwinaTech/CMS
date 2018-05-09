const express = require('express');
const router = express.Router();

/* GET Admin page. */
router.get('/', function (req, res, next) {
    res.render('admin', { title: 'Admin Dashboard' });
});

module.exports = router;
