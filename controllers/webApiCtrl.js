var dbHandler = require('../db/dbHandler');
var bcrypt = require('bcrypt');
var countries = require('country-data').countries;

module.exports.AddSiteUser = function (req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let type = req.body.type;
    let is_active = req.body.is_active;
    let email = req.body.email;
    let created_at = new Date();
    let updated_at = new Date();

    if (password && password != "")
        password = bcrypt.hashSync(password, 8);

    let user_data = {
        name: name,
        username: username,
        password: password,
        type: type,
        email: email,
        is_active: is_active,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addSiteUser(user_data, function (data) {
        res.json(data);
    });
}

module.exports.editSiteUser = function (req, res) {
    let siteuser = req.body.siteuser;
    dbHandler.editSiteUser(siteuser, function (data) {
        res.json(data);
    });
}

module.exports.getAllSiteUsers = function (req, res) {
    dbHandler.getAllSiteUsers(function (data) {
        res.json(data);
    });
}

module.exports.deleteSiteUser = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteSiteUserById(id, function (data) {
        res.json(data);
    });
}

module.exports.AddLanguage = function (req, res) {
    let name = req.body.name;
    let is_active = req.body.is_active;
    let created_at = new Date();
    let updated_at = new Date();

    let lang_data = {
        name: name,
        is_active: is_active,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addLanguage(lang_data, function (data) {
        res.json(data);
    });
}

module.exports.editLanguage = function (req, res) {
    let language = req.body.language;
    dbHandler.editLanguage(language, function (data) {
        res.json(data);
    });
}

module.exports.getAllLanguages = function (req, res) {
    let query = {};
    dbHandler.getAllLanguages(query, function (data) {
        res.json(data);
    });
}

module.exports.deleteLanguage = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteLanguageById(id, function (data) {
        res.json(data);
    });
}

module.exports.getAllDefaultCountries = function (req, res) {
    let arrCouns = countries.all.filter((data) => {
        return data.status != "deleted" && data.countryCallingCodes.length > 0;
    });

    res.json(arrCouns);
}

module.exports.AddCountry = function (req, res) {
    let name = req.body.name;
    let is_active = req.body.is_active;
    let flag_path = req.body.flag_path;
    let calling_code = req.body.calling_code;
    let country_alpha = req.body.country_alpha;
    let created_at = new Date();
    let updated_at = new Date();

    let country_data = {
        name: name,
        is_active: is_active,
        flag_path: flag_path,
        calling_code: calling_code,
        country_alpha: country_alpha,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addCountry(country_data, function (data) {
        res.json(data);
    });
}

module.exports.editCountry = function (req, res) {
    let country = req.body.country;
    dbHandler.editCountry(country, function (data) {
        res.json(data);
    });
}

module.exports.getAllCountries = function (req, res) {
    let query = {};
    dbHandler.getAllCountries(query, function (data) {
        res.json(data);
    });
}

module.exports.deleteCountry = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteCountryById(id, function (data) {
        res.json(data);
    });
}

module.exports.AddProduct = function (req, res) {
    let name = req.body.name;
    let is_active = req.body.is_active;
    let image_path = req.body.image_path;
    let category = req.body.category;
    let language = req.body.language;
    let localize = req.body.localize;
    let description = req.body.description;
    let admin_creator = req.body.admin_creator;
    let created_at = new Date();
    let updated_at = new Date();

    let product_data = {
        name: name,
        is_active: is_active,
        image_path: image_path,
        category: category,
        language: language,
        localize: localize,
        description: description,
        admin_creator: admin_creator,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addProduct(product_data, function (data) {
        res.json(data);
    });
}

module.exports.editProduct = function (req, res) {
    let product = req.body.product;
    dbHandler.editProduct(product, function (data) {
        res.json(data);
    });
}

module.exports.getAllProducts = function (req, res) {
    let query = {};
    dbHandler.getAllProducts(query, function (data) {
        res.json(data);
    });
}

module.exports.getCategories = function (req, res) {
    let categories = ["Fruit", "Vegetable", "Meat", "Fish"];
    res.json(categories);
}

module.exports.deleteProduct = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteProductById(id, function (data) {
        res.json(data);
    });
}

module.exports.AddSlideImage = function (req, res) {
    let image_path = req.body.image_path;
    let sequence_number = req.body.sequence_number;
    let created_at = new Date();
    let updated_at = new Date();

    let slide_data = {
        image_path: image_path,
        sequence_number: sequence_number,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addSlideImage(slide_data, function (data) {
        res.json(data);
    });
}

module.exports.getAllSlideImages = function (req, res) {
    dbHandler.getAllSlideImages(function (data) {
        res.json(data);
    });
}

module.exports.deleteSlideImage = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteSlideImageById(id, function (data) {
        res.json(data);
    });
}

module.exports.changeSlideSequence = function (req, res) {
    let slides = req.body;
    let c = slides.length;
    for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        dbHandler.changeSlideSequence(slide, function (data) {
            if (!data.status) {
                return res.json(data);
            }
            if (--c === 0)
                res.json(data);
        });
    }
}

module.exports.AddAppWord = function (req, res) {
    let word = req.body.word;
    let created_at = new Date();
    let updated_at = new Date();

    let slug = word.split(" ").join('-').toLowerCase();
    let app_word_data = {
        word: word,
        wslug: slug,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addAppWord(app_word_data, function (data) {
        res.json(data);
    });
}

module.exports.getAllAppWords = function (req, res) {
    dbHandler.getAllAppWords(function (data) {
        res.json(data);
    });
}

module.exports.deleteAppWord = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteAppWordById(id, function (data) {
        res.json(data);
    });
}

module.exports.editAppWord = function (req, res) {
    let word = req.body.word;
    word['slug'] = word.value.split(" ").join('-').toLowerCase();
    dbHandler.editAppWord(word, function (data) {
        res.json(data);
    });
}

module.exports.AddAppLocalize = function (req, res) {
    let language = req.body.language;
    let localize = req.body.localize;
    let created_at = new Date();
    let updated_at = new Date();

    let app_localize_data = {
        language: language,
        localize: localize,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addAppLocalize(app_localize_data, function (data) {
        res.json(data);
    });
}

module.exports.getAllAppLocalize = function (req, res) {
    dbHandler.getAllAppLocalize(function (data) {
        res.json(data);
    });
}

module.exports.deleteAppLocalize = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteAppLocalizeById(id, function (data) {
        res.json(data);
    });
}

module.exports.editAppLocalize = function (req, res) {
    let word = req.body.localize;
    dbHandler.editAppLocalize(word, function (data) {
        res.json(data);
    });
}

module.exports.AddProductPriceByCountry = function (req, res) {
    let country_id = req.body.country_id;
    let product_id = req.body.product_id;
    let price_date = req.body.price_date;
    let price1 = req.body.price1;
    let price2 = req.body.price2;
    let price3 = req.body.price3;

    let product_country_data = {
        country_id: country_id,
        product_id: product_id,
        price_date: price_date,
        price_usd: price1,
        price_gbp: price2,
        price_fcfa: price3
    };

    dbHandler.addProductPriceByCountry(product_country_data, function (data) {
        res.json(data);
    });
}

module.exports.getAllProductPriceByCountry = function (req, res) {
    dbHandler.getAllProductPricesByCountry(function (data) {
        res.json(data);
    });
}

module.exports.deleteProductPrice = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteProductPriceById(id, function (data) {
        res.json(data);
    });
}

module.exports.getLanguageById = function (req, res) {
    let id = req.params.id;
    dbHandler.getLanguageById(id, function (data) {
        res.json(data);
    });
}

module.exports.getCountryById = function (req, res) {
    let id = req.params.id;
    dbHandler.getCountryById(id, function (data) {
        res.json(data);
    });
}

module.exports.getProductById = function (req, res) {
    let id = req.params.id;
    dbHandler.getProductById(id, function (data) {
        res.json(data);
    });
}

module.exports.getProductPriceById = function (req, res) {
    let id = req.params.id;
    dbHandler.getProductPriceById(id, function (data) {
        res.json(data);
    });
}

module.exports.editProductPrice = function (req, res) {
    let product_price = req.body.product_price;
    dbHandler.editProductPrice(product_price, function (data) {
        res.json(data);
    });
}

module.exports.AddProductLocalize = function (req, res) {
    let product_id = req.body.product_id;
    let localize = req.body.localize;
    let created_at = new Date();
    let updated_at = new Date();

    let product_localize_data = {
        product_id: product_id,
        localize: localize,
        created_at: created_at,
        updated_at: updated_at
    };

    dbHandler.addProductLocalize(product_localize_data, function (data) {
        res.json(data);
    });
}

module.exports.getProductLocalizeByProductId = function (req, res) {
    let id = req.params.id;
    dbHandler.getProductLocalizeByProductId(id, function (data) {
        res.json(data);
    });
}

module.exports.editProductLocalize = function (req, res) {
    let product_localize = req.body.product_localize;
    dbHandler.editProductLocalize(product_localize, function (data) {
        res.json(data);
    });
}

module.exports.getMobileUsers = function (req, res) {
    dbHandler.getAllMobileUsers(function (data) {
        res.json(data);
    });
}

module.exports.deleteMobileUser = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteMobileUserById(id, function (data) {
        res.json(data);
    });
}

module.exports.getProductCount = function (req, res) {
    dbHandler.getProductsCount(function (data) {
        res.json(data);
    });
}

module.exports.AddConfig = function (req, res) {
    let config_data = req.body.config;
    dbHandler.addConfig(config_data, function (data) {
        res.json(data);
    });
}

module.exports.getConfig = function (req, res) {
    dbHandler.getAllConfig(function (data) {
        res.json(data);
    });
}

module.exports.editConfig = function (req, res) {
    let config_data = req.body.config;
    dbHandler.editConfig(config_data, function (data) {
        res.json(data);
    });
}

module.exports.getConfigById = function (req, res) {
    let id = req.params.id;
    dbHandler.getConfigById(id, function (data) {
        res.json(data);
    });
}

module.exports.deleteConfig = function (req, res) {
    let id = req.body.id;
    dbHandler.deleteConfigById(id, function (data) {
        res.json(data);
    });
}