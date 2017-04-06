var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    flag_path: String,
    calling_code : String,
    country_alpha : String,
    is_active: Boolean,
    created_at: Date,
    updated_at: Date
});

var Country = mongoose.model('Country', countrySchema, 'Countries');

module.exports = Country;