module.exports.errMessage = {
  invalidName: 'Поле `name` обязательное для заполнения и должно содержать от 2 до 30 символов',
  invalidEmail: 'Поле `email` обязательное для заполнения и должно содержать корректный email',
  invalidPassword: 'Поле `password` обязательное для заполнения и должно содержать корректный password',
  invalidKeyword: 'Некорректный формат ключевых слов',
  invalidTitle: 'Некорректный формат заголовка статьи',
  invalidText: 'Некорректный формат текста статьи',
  invalidDate: 'Некорректный формат даты',
  invalidSource: 'Некорректный формат источника статьи',
  invalidLink: 'Некорректный формат ссылки на статью',
  invalidImage: 'Некорректный формат ссылки на изображение',
  invalidArticleId: 'Некорректный формат id статьи',
  notFoundUser: 'Пользователь с таким id не найден',
  notFoundArticle: 'Статья с таким id не найдена',
  notFound: 'Запрашиваемый ресурс не найден',
  successfulAuth: 'Авторизация прошла успешно',
  unsuccessfulAuth: 'Неверный адрес электронной почты или пароль',
  accessDenied: 'Нельзя удалить статью, сохранённую другим пользователем',
  needLogin: 'Необходима авторизация',
  serverErr: 'На сервере произошла ошибка',
};

module.exports.duplicateKeyException = {
  errMessage: 'Пользователь с данным e-mail уже зарегистрирован',
  errCode: 11000,
};
