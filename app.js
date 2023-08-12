const mongoose = require('mongoose');
const express = require('express');
const cookies = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();
const Router = require('./routes');
const { handleRouteError } = require('./errors');
const { requestRateLimiter } = require('./utils/requestRateLimiter');

const { PORT = 3000, URI = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(URI, { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookies());
app.use(errors());
app.use('/', Router);
app.all('*', handleRouteError);
app.use(requestRateLimiter);

app.listen(PORT);
