const router = require('express').Router();

const routerUsers = require('./users');
const routerArticles = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { createUserValidation, loginValidation } = require('../middlewares/validationUser');
const errMessage = require('../errMessage');

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/users', routerUsers);
router.use('/articles', routerArticles);
router.use((req, res, next) => next(new ErrorNotFound(errMessage.notFound)));

module.exports = router;
