var express = require('express');
var router = express.Router();
const dbArticles = require('../../db/dbArticles');
const dbCategory = require('../../db/dbCategories');
const path = require('path');
const imageUrl = path.dirname(require.main.filename) + '/../public/images';

/* Get articles page */
router.get('/', (req, res) => {
    const callBack = (article, err) => {
        if (err) {
            res.render('articles', {
                err: err
            });
        } else {
            res.render('articles', {
                article
            });
        }
    }
    dbArticles.getArticle(callBack);
})

/////////////////////////////////////////////////
/*********** Add ana Article ****************/
/////////////////////////////////////////////////
router.get('/add', function (req, res, next) {
    const callBackCategories = (categories, err) => {
        if (err) {
            res.render('add-and-edit-article', {
                error: error
            })
        } else {
            res.render('add-and-edit-article', {
                articleTitle: 'Add',
                categories,
                imageTitle: "Add"
            })
        }
    }
    dbCategory.getCategory(callBackCategories);
});

router.post('/add', function (req, res, next) {
    let query = req.body;
    if (Object.keys(req.files).length > 0) 
        query.articleImage = req.files.articleImage.name;
    const callBack = data => {
        if (Object.keys(req.files).length > 0) {
            const articleImage = req.files.articleImage;
            articleImage.mv(`${imageUrl}/${data._id}.png`, function (err) {
                if (err) {
                    console.log(err)
                    res.send(err.message);
                } else {
                    console.log('done');
                }
            });
        }
        res.redirect('/admin/articles');
    }
    dbArticles.addArticle(query, callBack);
});

/////////////////////////////////////////////////
/*********** Edite an Article ****************/
/////////////////////////////////////////////////
router.get('/edit/:articleId', function (req, res, next) {
    console.log(req.body)
    const { articleId } = req.params;
    const callBackCategories = (categories, err) => {
        articleCallback = (error, articleData) => {
            categories.map((category) => {
                if (articleData.category.equals(category._id)) {
                    res.render("add-and-edit-article", {
                        articleTitle: 'edit',
                        categories,
                        articleData,
                        categoryTitle: category.title,
                        imageTitle: "Edit"
                    });
                } 
            })

        };
        dbArticles.findArticleById(articleId, articleCallback);
    }
    dbCategory.getCategory(callBackCategories);
    
});

router.post('/edit/:articleId', function (req, res, next) {
    const { articleId } = req.params;
    let query = req.body;
    if (Object.keys(req.files).length > 0) 
        query.articleImage = req.files.articleImage.name;
    const callBack = data => {
        if (Object.keys(req.files).length > 0) {
            const articleImage = req.files.articleImage;
            articleImage.mv(`${imageUrl}/${articleId}.png`, function (err) {
                if (err) {
                    console.log(err)
                    res.json(err.message);
                } else {
                    console.log('done');
                }
            });
        }
        res.redirect('/admin/articles');
    }
    dbArticles.editArticle(articleId, query, callBack);
});

/////////////////////////////////////////////////
/*********** Delete an Article ****************/
/////////////////////////////////////////////////
router.get('/delete/:articleId', (req, res) => {
    const { articleId } = req.params;
    const callBack = (err) => {
        if (err) {
            res.json(err.message);
        } 
        res.redirect('/admin/articles');
    }
    dbArticles.deleteArticle(articleId, callBack);
})

module.exports = router;