const express = require('express');
const router = express.Router();
const dbCategory = require('../../db/dbCategories');
const dbArticles = require('../../db/dbArticles');
const ObjectId = require('mongodb').ObjectID;

/* GET Categories page. */
router.get('/', (req, res) => {
    const callBack = (category, err) => {
        if (err) {
            res.render('categories', {
                error: error
            })
        } else {
            res.render('categories', {
                category
            })
        }
    }
    dbCategory.getCategory(callBack);
})

/* GET Articles under Category */
router.get('/articles/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const callBack = (err, article) => {
        if (err) {
            res.render('category-view', {
                err
            })
        } else {
            res.render('category-view', {
                article
            })
        }
    }
    dbArticles.findArticlesWithCategoryData({category: categoryId}, callBack);
})

/* GET Add Category page. */
router.get('/add', function (req, res, next) {
    res.render('add-and-edit-category', {
        categoryTitle: 'Add'
    });
});

router.post('/add', function (req, res, next) {
    const query = req.body;
    const callBack = data => {
        res.redirect('/admin/categories/')
    }
    dbCategory.addCategory(query, callBack);
});

/* GET Edit Category page. */
router.get('/edit/:id', function (req, res, next) {
    const id = req.params.id;
    const callBack = (err, data) => {
        if (err) {
            res.render('add-and-edit-category', {
                err
            })
        } else {
            res.render('add-and-edit-category', {
                data,
                articleTitle: "Edit"
            })
        }
    }
    dbCategory.findCategoryById(id, callBack)
});

/* GET Edit Category page. */
router.post('/edit/:id', function (req, res, next) {
    const id = req.params.id;
    const query = req.body;
    const callBack = (err, data) => {
        if (err) {
            res.render('add-and-edit-category', {
                err
            })
        } else {
            res.redirect('/admin/categories')
        }
    }
    dbCategory.editCategory(id, query, callBack)
});

module.exports = router;