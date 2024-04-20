const express = require('express');
const uploadMiddleware = require('../middlewares/MulterMiddleware');
const UploadModel = require('../models/UploadModel');

const router = express.Router();

router.get('/api/get', async (req, res) => {
    // const allPhotos = await UploadModel.find().sort({createdAt: 'descending'});
    // console.log(allPhotos.length);
    res.send("Hello World");
})

router.post('/api/save', uploadMiddleware.array('photo'), async (req, res) => {
        try{
            if(!req.files || req.files.length === 0){
                return res.status(400).send('No files uploaded');
            }

            req.files.forEach(file => {
                const photo = file.filename;
                UploadModel.create({photo});
            })
            res.status(200).send("Uploaded successfully");
        } catch (error) {
            console.error("Error uploading files", error);
            res.status(500).send("Error!");
        }
})

router.delete('/api/delete/:id', async (req, res) => {
    UploadModel.deleteOne({_id:req.params.id})
    .then(pic => res.json(pic))
})

module.exports = router;