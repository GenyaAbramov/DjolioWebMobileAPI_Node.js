var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    language: String,
    description: String,
    image_path: String,
    admin_creator: String,
    is_active: Boolean,
    localize: Object,
    created_at: Date,
    updated_at: Date
});

var Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;