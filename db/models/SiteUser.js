var mongoose = require('../dbConnect');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: String,
    email: String,
    is_active: Boolean,
    created_at: Date,
    updated_at: Date
});

var SiteUser = mongoose.model('SiteUser', userSchema, 'SiteUsers');

module.exports = SiteUser;