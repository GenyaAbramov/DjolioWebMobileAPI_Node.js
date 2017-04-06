var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var productLocalizeSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    localize: Object,
    created_at: Date,
    updated_at: Date
});

var ProductLocalize = mongoose.model('ProductLocalize', productLocalizeSchema, 'ProductLocalizations');

module.exports = ProductLocalize;