const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('validator');

const ErrorBadRequest = require('../errors/errorBadRequest');
const { errMessage } = require('../errors/errorMessage');

module.exports.createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .error(() => new ErrorBadRequest(errMessage.invalidKeyword)),
    title: Joi.string().required().trim()
      .error(() => new ErrorBadRequest(errMessage.invalidTitle)),
    text: Joi.string().required().trim()
      .error(() => new ErrorBadRequest(errMessage.invalidText)),
    date: Joi.string().required().trim()
      .error(() => new ErrorBadRequest(errMessage.invalidDate)),
    source: Joi.string().required().trim()
      .error(() => new ErrorBadRequest(errMessage.invalidSource)),
    link: Joi.string().required().trim()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new ErrorBadRequest(errMessage.invalidLink)),
    image: Joi.string().required().trim()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new ErrorBadRequest(errMessage.invalidImage)),
  }),
});

module.exports.articleIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId()
      .error(() => new ErrorBadRequest(errMessage.invalidArticleId)),
  }),
});
