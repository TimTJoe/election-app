var multer = require("multer");
var path = require("path")
var crypto = require("crypto")
var dest = "./public/uploads";

// var storage = multer.memoryStorage({
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(8, function crypt(err, raw) {
      if (err) return cb(err);
      cb(null, "IMG_" + raw.toString("hex") + path.extname(file.originalname));
    });
  },
});
var upload = multer({ storage: storage });

module.exports = upload;