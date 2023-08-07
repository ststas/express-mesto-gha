const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const { handleRouteError } = require('./errors');
const Router = require('./routes');

const { PORT = 3000, URI = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(URI, { useNewUrlParser: true });

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64ca4ad673983ca0897e2b45',
  };
  next();
});

app.use('/', Router);
app.all('*', handleRouteError);

app.listen(PORT);
