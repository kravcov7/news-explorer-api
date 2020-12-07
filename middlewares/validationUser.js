const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ErrorBadRequest = require('../errors/errorBadRequest');
const { errMessage } = require('../errors/errorMessage');

const name = Joi.string().trim().min(2)
  .max(30)
  .required()
  .error(() => new ErrorBadRequest(errMessage.invalidName));
const email = Joi.string().trim().required()
  .custom((value, helpers) => (validator.isEmail(value) ? value : helpers.error()))
  .error(() => new ErrorBadRequest(errMessage.invalidEmail));
const password = Joi.string().trim().min(5)
  .required()
  .error(() => new ErrorBadRequest(errMessage.invalidPassword));

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name, email, password,
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email, password,
  }),
});
