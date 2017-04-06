var SiteUser = require('./models/SiteUser');
var Language = require('./models/Language');
var Country = require('./models/Country');
var Product = require('./models/Product');
var Slide = require('./models/Slide');
var AppWord = require('./models/AppWord');
var AppLocalize = require('./models/AppLocalize');
var CountryProduct = require('./models/CountryProduct');
var ProductLocalize = require('./models/ProductLocalize');
var ProductStat = require('./models/ProductStats');
var MobileUser = require('./models/MobileUser');
var MobilePin = require('./models/MobilePin');
var Config = require('./models/Config');

var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');

module.exports.addSiteUser = function (user_data, cb) {

    var newUser = new SiteUser(user_data);

    newUser.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "User Already Exists with same username"
            });
        }
        cb({
            status: 1,
            message: 'User Added'
        });
    });
}

module.exports.getSiteUserByName = function (name, cb) {
    SiteUser.find({
        username: name
    }, function (err, user) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: user
        });
    });
}

module.exports.editSiteUser = function (data, cb) {
    SiteUser.findById(new ObjectId(data['id']), function (err, user) {
        if (err) throw err;
        user.name = data['name'];
        user.type = data['type'];
        user.is_active = data['is_active'];
        user.updated_at = new Date();
        user.save(function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.getAllSiteUsers = function (cb) {
    SiteUser.find({}, function (err, users) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: users
        });
    });
}

module.exports.deleteSiteUserById = function (id, cb) {
    SiteUser.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "User Deleted !"
        });
    });
}

module.exports.addLanguage = function (lang_data, cb) {

    var newLang = new Language(lang_data);

    newLang.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Language Already Exists"
            });
        }
        cb({
            status: 1,
            message: 'Language Added'
        });
    });
}

module.exports.editLanguage = function (data, cb) {
    Language.findById(new ObjectId(data['id']), function (err, lang) {
        if (err) throw err;
        lang.is_active = data['is_active'];
        lang.updated_at = new Date();
        lang.save(function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.getAllLanguages = function (query, cb) {
    Language.find(query, function (err, langs) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: langs
        });
    });
}

module.exports.deleteLanguageById = function (id, cb) {
    Language.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "Language Deleted !"
        });
    });
}

module.exports.addCountry = function (country_data, cb) {
    var newCountry = new Country(country_data);

    newCountry.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Country Already Exists"
            });
        }
        cb({
            status: 1,
            message: 'Country Added'
        });
    });
}

module.exports.editCountry = function (data, cb) {
    Country.findById(new ObjectId(data['id']), function (err, con) {
        if (err) throw err;
        con.is_active = data['is_active'];
        con.updated_at = new Date();
        con.save(function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.getAllCountries = function (query, cb) {
    Country.find(query, function (err, couns) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: couns
        });
    });
}

module.exports.deleteCountryById = function (id, cb) {
    Country.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "Country Deleted !"
        });
    });
}

module.exports.addProduct = function (product_data, cb) {

    var newProduct = new Product(product_data);

    newProduct.save(function (err, product) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Product Already Exists"
            });
        }
        let product_stat_data = {
            product_id: product._id,
            view_count: 0
        };
        var newProductStat = new ProductStat(product_stat_data);

        newProductStat.save(function (err) {});

        cb({
            status: 1,
            message: 'Product Added',
            product: product
        });
    });
}

module.exports.editProduct = function (data, cb) {
    Product.findById(new ObjectId(data['id']), function (err, product) {
        if (err) throw err;
        product.is_active = data['is_active'];
        product.updated_at = new Date();
        product.save(function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.getAllProducts = function (query, cb) {
    Product.find(query, function (err, products) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: products
        });
    });
}

module.exports.deleteProductById = function (id, cb) {
    Product.findById(new ObjectId(id), function (err, data) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };

        let file_path = data.image_path;
        fs.unlink(file_path);

        CountryProduct.findOneAndRemove({
            product_id: id
        }, function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            };
        });

        Product.findByIdAndRemove(new ObjectId(id), function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            };
            cb({
                status: 1,
                message: "Product Deleted !"
            });
        });
    });
}

module.exports.addSlideImage = function (slide_img_data, cb) {

    var newSlide = new Slide(slide_img_data);

    newSlide.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Slide Already Exists"
            });
        }
        cb({
            status: 1,
            message: 'Slide Added'
        });
    });
}

module.exports.getAllSlideImages = function (cb) {
    Slide.find().sort({
        sequence_number: 1
    }).exec(function (err, slides) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: slides
        });
    });
}

module.exports.deleteSlideImageById = function (id, cb) {

    Slide.findById(new ObjectId(id), function (err, data) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };

        let file_path = data.image_path;
        fs.unlink(file_path);

        Slide.findByIdAndRemove(new ObjectId(id), function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            };
            cb({
                status: 1,
                message: "Slide Image Deleted !"
            });
        });
    });
}

module.exports.changeSlideSequence = function (data, cb) {
    Slide.findById(new ObjectId(data['id']), function (err, slide) {
        if (err) throw err;
        slide.sequence_number = data['value'];
        slide.updated_at = new Date();
        slide.save(function (err) {
            if (err) throw err;
            cb({
                status: 1
            });
        });
    });
}

module.exports.addAppWord = function (app_word_data, cb) {

    var newAppWord = new AppWord(app_word_data);

    newAppWord.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "App Word Already Exists"
            });
        }
        cb({
            status: 1,
            message: 'App Word Added'
        });
    });
}

module.exports.getAllAppWords = function (cb) {
    AppWord.find({}, function (err, words) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: words
        });
    });
}

module.exports.deleteAppWordById = function (id, cb) {
    AppWord.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "App Word Deleted !"
        });
    });
}

module.exports.editAppWord = function (data, cb) {
    AppWord.findById(new ObjectId(data['id']), function (err, word) {
        if (err) throw err;
        word.word = data['value'];
        word.wslug = data['slug'];
        word.updated_at = new Date();
        word.save(function (err) {
            if (err && err.code == 11000) {
                return cb({
                    status: 0,
                    message: "App word is already exists"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.addAppLocalize = function (app_localize_data, cb) {

    var newAppLocalize = new AppLocalize(app_localize_data);

    newAppLocalize.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "App Localization for same language already exists"
            });
        }
        cb({
            status: 1,
            message: 'App Localize Added'
        });
    });
}

module.exports.getAllAppLocalize = function (cb) {
    AppLocalize.find({}, function (err, locs) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: locs
        });
    });
}

module.exports.deleteAppLocalizeById = function (id, cb) {
    AppLocalize.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "App Localize Deleted !"
        });
    });
}

module.exports.editAppLocalize = function (data, cb) {
    AppLocalize.findById(new ObjectId(data['id']), function (err, loc) {
        if (err) throw err;
        loc.language = data['language'];
        loc.localize = data['localize'];
        loc.updated_at = new Date();
        loc.save(function (err) {
            if (err && err.code == 11000) {
                return cb({
                    status: 0,
                    message: "App Localization is already exists"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.addProductPriceByCountry = function (country_product_data, cb) {

    var newCountryProduct = new CountryProduct(country_product_data);

    newCountryProduct.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Already Exists For Today"
            });
        }
        cb({
            status: 1,
            message: 'Country Product Price Added'
        });
    });
}

module.exports.getAllProductPricesByCountry = function (cb) {
    CountryProduct.find({}, function (err, conpro) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: conpro
        });
    });
}

module.exports.deleteProductPriceById = function (id, cb) {
    CountryProduct.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "Price for that product deleted !"
        });
    });
}

module.exports.getLanguageById = function (id, cb) {
    Language.findById(new ObjectId(id), function (err, language) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: language
        });
    });
}

module.exports.getCountryById = function (id, cb) {
    Country.findById(new ObjectId(id), function (err, country) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: country
        });
    });
}

module.exports.getProductById = function (id, cb) {
    Product.findById(new ObjectId(id), function (err, product) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: product
        });
    });
}

module.exports.getProductPriceById = function (id, cb) {
    CountryProduct.findById(new ObjectId(id), function (err, product_price) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: product_price
        });
    });
}

module.exports.editProductPrice = function (data, cb) {
    CountryProduct.findById(new ObjectId(data['id']), function (err, cp) {
        if (err) throw err;
        cp.price_usd = data['price1'];
        cp.price_gbp = data['price2'];
        cp.price_fcfa = data['price3'];
        cp.save(function (err) {
            if (err && err.code == 11000) {
                return cb({
                    status: 0,
                    message: "Price for product is already exists"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.addProductLocalize = function (product_localize_data, cb) {

    var newProductLocalize = new ProductLocalize(product_localize_data);

    newProductLocalize.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Localization exists for same product"
            });
        }
        cb({
            status: 1,
            message: 'Product Localize Added'
        });
    });
}

module.exports.getProductLocalizeByProductId = function (id, cb) {
    ProductLocalize.find({
        product_id: id
    }, function (err, product_localize) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: product_localize
        });
    });
}

module.exports.editProductLocalize = function (data, cb) {
    ProductLocalize.findById(new ObjectId(data['id']), function (err, ploc) {
        if (err) throw err;
        ploc.localize = data['localize'];
        ploc.updated_at = new Date();
        ploc.save(function (err) {
            if (err && err.code == 11000) {
                return cb({
                    status: 0,
                    message: "Localization for product is already exists"
                });
            }
            Product.findById(new ObjectId(data['product_id']), function (err, product) {
                if (err) throw err;
                product.localize = data['localize'];
                product.save(function (err) {});
                cb({
                    status: 1
                });
            });
        });
    });
}

module.exports.getAllMobileUsers = function (cb) {
    MobileUser.find({}, function (err, mobileusers) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: mobileusers
        });
    });
}

module.exports.deleteMobileUserById = function (id, cb) {
    MobileUser.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "Mobile User Deleted !"
        });
    });
}

module.exports.getProductsCount = function (cb) {
    Product.count({}, function (err, product_count) {
        CountryProduct.count({}, function (err, price_count) {
            Language.count({}, function (err, lang_count) {
                Country.count({}, function (err, country_count) {
                    SiteUser.count({}, function (err, siteuser_count) {
                        MobileUser.count({}, function (err, mobileuser_count) {
                            cb({
                                status: 1,
                                data: {
                                    product_count: product_count,
                                    price_count: price_count,
                                    lang_count: lang_count,
                                    country_count: country_count,
                                    siteuser_count: siteuser_count,
                                    mobileuser_count: mobileuser_count
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

// Mobile APIs related handlers

module.exports.getProductDetail = function (data, cb) {
    let query = data;
    CountryProduct.find(data, function (err, conpro) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        ProductStat.find({
            product_id: data.product_id
        }, function (err, product) {
            let producta = product[0];
            if (err) throw err;
            producta.view_count += 1;
            producta.save(function (err, productd) {
                if (err) {
                    return cb({
                        status: 0,
                        message: "Something went wrong"
                    });
                };
                cb({
                    status: 1,
                    data: conpro,
                    view_count: productd.view_count
                });
            });
        });
    });
}

module.exports.getLocalization = function (data, cb) {
    Language.findById(new ObjectId(data['lang_id']), function (err, language) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        AppLocalize.find({
            language: language.name
        }, function (err, applocalize) {
            if (applocalize.length > 0) {
                let localize = applocalize[0].localize;
                AppWord.find({}, function (err, appwords) {
                    if (err) {
                        return cb({
                            status: 0,
                            message: "Something went wrong"
                        });
                    };
                    if (appwords.length > 0) {
                        let localization = {}
                        for (var i = 0; i < appwords.length; i++) {
                            let appword = appwords[i];
                            localization[appword.wslug] = {
                                "word": appword.word,
                                "localize": localize[appword._id]
                            };
                        }
                        cb({
                            status: 1,
                            words: appwords,
                            localization: localization
                        });
                    } else {
                        cb({
                            status: 0,
                            message: "No Localization Found For This Language"
                        });
                    }
                });
            } else {
                cb({
                    status: 0,
                    message: "No Localization Found For This Language"
                });
            }
        });
    });
}

module.exports.saveMobileVerificationPin = function (data, cb) {
    var newMobilePin = new MobilePin(data);
    newMobilePin.save(function (err, mobile_pin) {
        cb({
            status: 1,
            message: 'Mobile Pin Generated',
            data: mobile_pin
        });
    });
}

module.exports.checkForMobileUser = function (data, cb) {
    MobilePin.find(data, function (err, mobilepin) {
        if (mobilepin.length > 0) {
            MobileUser.find(data, function (err, mobileuser) {
                if (mobileuser.length > 0) {
                    cb({
                        status: 0
                    });
                } else {
                    cb({
                        status: 1
                    });
                }
            });
        } else {
            cb({
                status: 0
            });
        }
    });
}

module.exports.addMobileUser = function (data, cb) {
    var newMobileUser = new MobileUser(data);
    newMobileUser.save(function (err, mobile_user) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong. Please try again."
            });
        };
        cb({
            status: 1,
            message: 'Mobile User Created',
            data: mobile_user
        });
    });
}

module.exports.checkMobileUserExists = function (data, cb) {
    MobileUser.find(data, function (err, mobileuser) {
        if (mobileuser.length > 0) {
            cb({
                status: 1
            });
        } else {
            cb({
                status: 0
            });
        }
    });
}

module.exports.addConfig = function (config_data, cb) {
    var newConfig = new Config(config_data);

    newConfig.save(function (err) {
        if (err && err.code == 11000) {
            return cb({
                status: 0,
                message: "Config Already Exists"
            });
        }
        cb({
            status: 1,
            message: 'Config Data Added'
        });
    });
}

module.exports.getAllConfig = function (cb) {
    Config.find({}, function (err, configs) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: configs
        });
    });
}

module.exports.editConfig = function (data, cb) {
    Config.findById(new ObjectId(data['id']), function (err, config) {
        if (err) throw err;
        config.item = data['item'];
        config.cvalue = data['cvalue'];
        config.save(function (err) {
            if (err) {
                return cb({
                    status: 0,
                    message: "Something went wrong"
                });
            }
            cb({
                status: 1
            });
        });
    });
}

module.exports.getConfigById = function (id, cb) {
    Config.findById(new ObjectId(id), function (err, config) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            data: config
        });
    });
}

module.exports.deleteConfigById = function (id, cb) {
    Config.findByIdAndRemove(new ObjectId(id), function (err) {
        if (err) {
            return cb({
                status: 0,
                message: "Something went wrong"
            });
        };
        cb({
            status: 1,
            message: "Config Removed From System !"
        });
    });
}