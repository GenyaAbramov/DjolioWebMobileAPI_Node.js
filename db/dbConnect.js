var mongoose = require('mongoose');
var config = require('../helpers/config');
var generalConfig = config.getConfig()

if (generalConfig.current_connection == "local") {
    mongoose.connect('mongodb://' + generalConfig.database_local_connection + '/' + generalConfig.database_name);
} else if (generalConfig.current_connection == "test") {
    mongoose.connect('mongodb://' + generalConfig.database_test_connection + '/' + generalConfig.database_name);
}

module.exports = mongoose;