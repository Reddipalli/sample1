var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    role_id: Number,
    first_name: String,
    last_name: String,
    Email: String,
    password: String,
    Mobile_number: String,
    gender: String,
});

mongoose.model('users', userSchema);