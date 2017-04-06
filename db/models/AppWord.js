var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var appWordSchema = new Schema({
    word: String,
    wslug: {
        type: String,
        required: true,
        unique: true
    },
    created_at: Date,
    updated_at: Date
});

var AppWord = mongoose.model('AppWord', appWordSchema, 'AppWords');

module.exports = AppWord;