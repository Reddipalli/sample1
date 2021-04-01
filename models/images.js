var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    student_obj: {},
    image_path: String,
});

mongoose.model('images', imageSchema);