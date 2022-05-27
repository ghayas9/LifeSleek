const multer = require("multer");
const path = require('path')
module.exports = {
  CatImage: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '../../Public/Image/CatImage'));
      },
      filename: function (request, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
    })
  }),
  ProImage: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '../../Public/Image/ProImage'));
      },
      filename: function (request, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
    })
  }),
  OtherImage: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '../../Public/Image/OtherImage'));
      },
      filename: function (request, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
    })
  })
}