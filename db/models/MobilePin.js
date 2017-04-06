var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var mobilePinSchema = new Schema({
    mobile_number: String,
    pin_number: Number
});

var MobilePin = mongoose.model('MobilePin', mobilePinSchema, 'MobilePins');

module.exports = MobilePin;