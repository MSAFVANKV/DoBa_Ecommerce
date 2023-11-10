const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("Public/Banner/Videos")) {
        fs.mkdirSync("Public/Banner/Videos");
      }
  
      cb(null, "Public/Banner/Videos");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const multerFilter = (req, file, cb) => {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
};

const uploadVideo = multer({
    storage: storage,
    fileFilter: multerFilter,
});

module.exports = uploadVideo;
