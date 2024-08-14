const multer = require("multer");
const path = require("path");
var dest = "/public/uploads";

const storage = multer.diskStorage({
  destination: dest,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    const newFilename = req.body.name + "-" + uniqueSuffix + extname;

    // Attach the new filename to the request object
    req.new_file_name = newFilename;
    console.log("Generated filename:", req.new_file_name);

    cb(null, newFilename);
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
