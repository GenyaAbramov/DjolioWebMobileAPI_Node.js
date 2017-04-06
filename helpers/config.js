var database_name = "eatables";
var database_local_connection = "127.0.0.1";
var database_test_connection = "35.157.241.224";
var current_connection = "local";

module.exports.getConfig = function () {
    return {
        database_name: database_name,
        database_local_connection: database_local_connection,
        database_test_connection: database_test_connection,
        current_connection: current_connection
    }
}
