var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var mobileUserSchema = new Schema({
    mobile_number: String,
    user_token: String,
    pin_number: String,
    created_at: Date
});

var MobileUser = mongoose.model('MobileUser', mobileUserSchema, 'MobileUsers');

module.exports = MobileUser;