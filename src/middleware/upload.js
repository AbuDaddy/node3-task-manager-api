const multer = require('multer')

// Multer file upload settings
const upload = multer({
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file.'))
        }

        cb(undefined, true)
    } 
})

module.exports = upload