const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const userTest = require('./routes/test');

const { PORT = 3000, ENDPOINT = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.connect(ENDPOINT);

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/user', userTest);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
