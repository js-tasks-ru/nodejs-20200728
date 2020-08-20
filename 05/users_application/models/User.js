const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 'такой email уже есть',
    validate: [{
      validator: value => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'email некорректный',
    }]
  },
  name: {
    type: String,
    index: true,
  },
});

schema.index({name: 1, email: 1});
// User.find({name: "", email: ""});

module.exports = connection.model('User', schema);
