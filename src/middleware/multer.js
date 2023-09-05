const multer = require("multer");
const moment = require("moment");

const fileUploader = ({
  destinationFolder = "",
  prefix = "",
  filetype = "",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/images/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      const fileExtention = file.mimetype.split("/")[1];
      const filename = `${prefix}_${moment().format(
        "YYYY-MM-DD-HH-mm-ss"
      )}.${fileExtention}`;
      console.log(filename);
      cb(null, filename);
    },
  });
  const uploader = multer({
    storage: storageConfig,

    fileFilter: (req, file, cb) => {
      console.log(file);

      if (file.mimetype.split("/")[0] != filetype) {
        return cb(null, false);
      }
      return cb(null, true);
    },
    limits: 100000,
  });
  return uploader;
};

const blobUploader = ({ filetype }) => {
  return multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype.split("/")[0] != filetype) {
        return cb(null, false);
      }
      return cb(null, true);
    },
    limits: 100000,
  });
};

module.exports = { fileUploader, blobUploader };
