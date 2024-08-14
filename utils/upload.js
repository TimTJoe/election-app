var multer = require("multer");
var path = require("path");
var crypto = require("node:crypto");
var dest = "./public/uploads";

const storage = multer.diskStorage({
  destination: dest,
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(8, (err, raw) => {
      if (err) return cb(err);
      let filename =
        "IMG_" + raw.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Initialize Multer with the storage engine
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
