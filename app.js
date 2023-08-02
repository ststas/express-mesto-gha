const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT, ENDPOINT } = process.env;

mongoose.connect(ENDPOINT, { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64ca4ad673983ca0897e2b45',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT);
