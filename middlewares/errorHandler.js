const { isCelebrate } = require('celebrate');
const { errMessage } = require('../errors/rorMessage');

module.exports = ((err, req, res, next) => {
  const { statusCode = isCelebrate(err) ? 400 : 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? errMessage.serverErr : message,
    });
  return next();
});
