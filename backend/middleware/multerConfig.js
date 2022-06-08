const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
      var err = new Error();
      err.code = "filetype";
      return cb(err);
    } else {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  },
});
const upload = multer({
  storage: storage,
});

export default upload;
