var multer = require('multer');
var storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, './public/images/background');
  },
  filename(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

function getUpload(fieldname){
  return multer({storage}).single(fieldname);
}

module.exports = getUpload;
