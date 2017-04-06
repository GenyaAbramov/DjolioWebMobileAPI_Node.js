var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var localizeSchema = new Schema({
    language: {
        type: String,
        required: true,
        unique: true
    },
    localize: Object,
    created_at: Date,
    updated_at: Date
});

var AppLocalize = mongoose.model('AppLocalize', localizeSchema, 'AppLocalizations');

module.exports = AppLocalize;