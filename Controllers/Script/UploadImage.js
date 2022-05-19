const multer = require("multer");
const path = require('path')


const CatImage = multer({
    storage:multer.diskStorage({
        destination: function (request, file, callback) {
          callback(null,path.join(__dirname,'../../Public/Image/CatImage'));
        },
        filename: function (request, file, callback) {
          callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
      })
})

const ProImage = multer({
    storage:multer.diskStorage({
        destination: function (request, file, callback) {
          callback(null,path.join(__dirname,'../../Public/Image/ProImage'));
        },
        filename: function (request, file, callback) {
          callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
      })
})

const OtherImage = multer({
    storage:multer.diskStorage({
        destination: function (request, file, callback) {
          callback(null,path.join(__dirname,'../../Public/Image/OtherImage'));
        },
        filename: function (request, file, callback) {
          callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
      })
})

module.exports = {
    CatImage,
    ProImage,
    OtherImage
}