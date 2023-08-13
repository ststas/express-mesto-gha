const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();
const Router = require('./routes');
const { requestRateLimiter } = require('./utils/requestRateLimiter');

const { PORT = 3000, URI = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(URI, { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestRateLimiter);
app.use('/', Router);
app.use(errors());
app.listen(PORT);
