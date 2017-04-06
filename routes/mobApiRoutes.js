var express = require('express');
var api = express.Router();

var mobApiCtrl = require('../controllers/mobApiCtrl');

api.get('/', function (req, res) {
    let api_data = {
        'name': 'Mobile API Home Page'
    };
    res.send(api_data);
})

api.use(function checkApiToken(req, res, next) {
    next()
})

api.get('/getcountries', mobApiCtrl.getCountries);
api.get('/getlanguages', mobApiCtrl.getLanguages);
api.get('/getslideimages', mobApiCtrl.getSlideImages);
api.get('/getproducts', mobApiCtrl.getProducts);
api.get('/getproductdetail/:product_id/:country_id', mobApiCtrl.getProductDetail);
api.get('/getlocalization/:language_id', mobApiCtrl.getLocalization);
api.get('/mobileverification/:mobile_number', mobApiCtrl.mobileVerification);
api.get('/registermobileuser/:mobile_number/:pin_number', mobApiCtrl.registerMobileUser);
api.get('/checkmobileuser/:user_token', mobApiCtrl.checkMobileUserExists);
api.get('/getconfig', mobApiCtrl.getConfig);

module.exports = api