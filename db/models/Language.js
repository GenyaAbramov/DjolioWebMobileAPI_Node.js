var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var langSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    is_active: Boolean,
    created_at: Date,
    updated_at: Date
});

var Language = mongoose.model('Language', langSchema, 'Languages');

module.exports = Language;