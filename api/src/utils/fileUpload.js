const path = require('path');
const fs = require('fs');

const multer = require('multer');
const { v4 } = require('uuid');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${v4()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter });

const clearImage = (filePathImg) => {
  const filePath = path.join(__dirname, '..', '..', 'images', filePathImg);
  fs.unlink(filePath, (err) => {});
};

module.exports = { upload, clearImage };
