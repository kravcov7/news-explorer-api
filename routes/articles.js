const router = require('express').Router();
const { createArticleValidation, articleIdValidation } = require('../middlewares/validationArticle');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticleValidation, createArticle);
router.delete('/:id', articleIdValidation, deleteArticle);

module.exports = router;
