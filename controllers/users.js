const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ErrorConflict = require('../errors/errorConflict');
const ErrorUnauthorized = require('../errors/errorUnauthorized');
const { duplicateKeyException, errMessage } = require('../errors/errorMessage');

const { JWT_SECRET } = require('../config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      let error;
      if (err.name === 'MongoError' && err.code === duplicateKeyException.errCode) {
        error = new ErrorConflict(duplicateKeyException.errMessage);
        return next(error);
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).end(errMessage.successfulAuth);
      return res.send({ token });
    })
    .catch((err) => {
      let error;
      if (err.name === 'Error') {
        error = new ErrorUnauthorized(errMessage.unsuccessfulAuth);
        return next(error);
      }
      return next(err);
    });
};

const exit =  (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 0, httpOnly: true, sameSite: true }).end(errMessage.successfulAuth);
      return res.send({ token });
    })
    .catch((err) => {
      let error;
      if (err.name === 'Error') {
        error = new ErrorUnauthorized(errMessage.unsuccessfulAuth);
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  login,
  exit,
};
