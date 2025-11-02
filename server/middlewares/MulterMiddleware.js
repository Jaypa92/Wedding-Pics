const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/av1', 'video/mov']
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type'), false);
    }
}

const uploadMiddleware = multer({storage, fileFilter})

module.exports = uploadMiddleware;