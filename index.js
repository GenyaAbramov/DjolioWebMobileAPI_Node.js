const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

var webApiRoutes = require('./routes/webApiRoutes');
var mobApiRoutes = require('./routes/mobApiRoutes');
var authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/data', express.static(path.join(__dirname, 'data')))

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/web', webApiRoutes);
app.use('/api/mob', mobApiRoutes);
app.use('/auth', authRoutes);

const storageProducts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/products/');
    },
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const uploadProduct = multer({
    storage: storageProducts
});

app.post('/api/upload_product_images', uploadProduct.single('file'), (req, res) => {
    const file = req.file;
    if (file.path) {
        res.json({
            "status": 1,
            "image_path": file.path
        });
    } else {
        res.json({
            "status": 0,
            "message": "Unable to upload the image. Please try again"
        });
    }
});


const storageSlides = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/slides/');
    },
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const uploadSlide = multer({
    storage: storageSlides
});

app.post('/api/upload_slide_images', uploadSlide.single('file'), (req, res) => {
    const file = req.file;
    if (file.path) {
        res.json({
            "status": 1,
            "image_path": file.path
        });
    } else {
        res.json({
            "status": 0,
            "message": "Unable to upload the image. Please try again"
        });
    }
});


module.exports = app;