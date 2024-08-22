var multer = require("multer");
const path = require("node:path");
var dest = "./public/images";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, "IMG_" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage });

module.exports = upload;
