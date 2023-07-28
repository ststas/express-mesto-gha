const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, ENDPOINT = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.connect(ENDPOINT);

const app = express();

app.listen(PORT, () => {console.log(`App listening on port ${PORT}`)});