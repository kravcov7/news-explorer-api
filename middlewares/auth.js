const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { JWT_SECRET } = require('../config');
const { errMessage } = require('../errMessage');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized(errMessage.needLogin);
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized(errMessage.needLogin);
  }
  req.user = payload;

  return next();
};
