var dbHandler = require('../db/dbHandler');
var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports.login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    dbHandler.getSiteUserByName(username, function (data) {
        if (data['status']) {
            if (data['data'][0]) {
                if (bcrypt.compareSync(password, data['data'][0].password)) {
                    let token = crypto.randomBytes(Math.ceil(48 / 2)).toString('hex').slice(0, 48);
                    var nextfourhours = new Date(new Date().getTime() + (4 * 60 * 60 * 1000)).getTime();
                    res.json({
                        "status": 1,
                        "message": "Login Done",
                        "token": token,
                        "expiry_token": nextfourhours,
                        "data": data['data'][0]
                    })
                } else {
                    res.json({
                        status: 0,
                        message: "Password is not correct"
                    });
                }
            } else {
                res.json({
                    status: 0,
                    message: "User does not exist"
                });
            }
        } else {
            res.json(data);
        }
    });
};