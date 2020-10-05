const Article = require('../models/article');
const ErrorForbidden = require('../errors/errorForbidden');
const ErrorNotFound = require('../errors/errorNotFound');
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
  Article.findById(req.params.id)
    .orFail(new ErrorNotFound(errMessage.notFoundArticle))
    .then((article) => {
      const { owner } = article;
      if (req.user._id !== owner.toString()) {
        throw new ErrorForbidden(errMessage.accessDenied);
      }
      Article.deleteOne(article).then(() => res.send({ message: errMessage.articleDeleted }));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
