var storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "IMG_" + Date.now() + "." + mime.extension(file.mimetype));
  },
});
var upload = multer({ storage: storage });
