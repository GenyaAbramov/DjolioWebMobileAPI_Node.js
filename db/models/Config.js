var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var configSchema = new Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    cvalue: String
});

var Config = mongoose.model('Config', configSchema, 'Configuration');

module.exports = Config;