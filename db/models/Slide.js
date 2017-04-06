var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var slideSchema = new Schema({
    image_path: String,
    sequence_number: Number,
    created_at: Date,
    updated_at: Date
});

var Slide = mongoose.model('Slide', slideSchema, 'Slides');

module.exports = Slide;