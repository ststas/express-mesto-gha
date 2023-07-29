const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: true,
    default: 'D. Hockney',
  },
  about: {
    type: String,
    minlength: 0,
    maxlength: 200,
    required: true,
    default: 'Painter',
  },
  avatar: {
    type: String,
    default: 'https://www.hockney.com/img/gallery/digital/ipad/1201.jpg',
    required: true,
  },

});

module.exports = mongoose.model('user', userSchema);
