/* подключаем пакеты */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

/* импортируем модули */
const {
  PORT, BD_URL, mongooseConfig,
} = require('./config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://www.news-card.site/',
    'https://news-card.site/',
    'http://www.news-card.site/',
    'http://news-card.site/',
    'https://kravcov7.github.io/news-explorer-frontend/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};

/* приложение */
const app = express();

mongoose.connect(BD_URL, mongooseConfig);

app.use(limiter);
app.use(helmet());
app.use('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
