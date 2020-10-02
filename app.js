require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {
  PORT, MONGO_URL, mongooseConfig,
} = require('./config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(MONGO_URL, mongooseConfig);

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
