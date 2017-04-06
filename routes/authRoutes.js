var express = require('express');
var auth = express.Router();

var authCtrl = require('../controllers/authCtrl');

auth.post('/web/login', authCtrl.login);

module.exports = auth