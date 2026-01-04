const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'video/mp4',
        'video/quicktime'
    ];

    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type'), false);
    }
}

const uploadMiddleware = multer({storage, limits: { fileSize: 10 * 1024 * 1024},
    fileFilter})

module.exports = uploadMiddleware;