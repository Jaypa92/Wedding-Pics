const express = require('express');
const uploadMiddleware = require('../middlewares/MulterMiddleware');
const UploadModel = require('../models/UploadModel');

const router = express.Router();

router.get('/api/get', async (req, res) => {
    const allPhotos = await UploadModel.find().sort({createdAt: 'descending'});
    res.send(allPhotos);
})

router.post('/api/save', uploadMiddleware.single('photo'), (req, res) => {
    const photo = req.file.filename;

    console.log(photo);

    UploadModel.create({photo})
    .then((data) => {
        console.log('Uploaded Successfully...');
        console.log(data);
        res.send(data);
    })
    .catch((err) => console.log(err));
})

router.delete('/api/delete/:id', async (req, res) => {
    UploadModel.deleteOne({_id:req.params.id})
    .then(pic => res.json(pic))
    .catch((err) => res.status(400).json(err))
})

module.exports = router;