const Article = require('../models/article');
const ErrorForbidden = require('../errors/errorForbidden');
const { errMessage } = require('../errors/errorMessage');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById({ _id: articleId, owner: userId })
    .orFail().remove()
    .then((article) => {
      if (!article) {
        throw new ErrorForbidden(errMessage.accessDenied);
      }
      res.send({ data: article });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
