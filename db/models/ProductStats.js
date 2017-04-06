var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var productStatSchema = new Schema({
    product_id : String,
    view_count: { type: Number, default: 0 }
});

var ProductStat = mongoose.model('ProductStat', productStatSchema, 'ProductStats');

module.exports = ProductStat;