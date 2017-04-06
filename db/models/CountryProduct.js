var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var countryProductSchema = new Schema({
    price_date: Date,
    country_id: String,
    product_id: String,
    price_usd: Number,
    price_gbp: Number,
    price_fcfa: Number
});

var CountryProduct = mongoose.model('CountryProduct', countryProductSchema, 'CountryProduct');

module.exports = CountryProduct;