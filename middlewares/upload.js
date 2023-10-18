const multer = require("multer");
const path = require("path");

const rootPath = process.cwd();
const tempDir = path.join(rootPath, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
