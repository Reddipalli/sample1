var mongoose = require('mongoose');
var LoginSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  mongoose.model('login',LoginSchema);