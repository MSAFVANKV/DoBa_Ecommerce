const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const uploadBanner = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = uploadBanner;
