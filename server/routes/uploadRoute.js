const express = require('express');
const uploadMiddleware = require('../middlewares/MulterMiddleware');
const UploadModel = require('../models/UploadModel');
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get('/get', async (req, res) => {
    const allPhotos = await UploadModel.find().sort({createdAt: 'descending'});
    console.log(allPhotos.length);
    res.send(allPhotos);
})

router.post('/api/save', uploadMiddleware.array('photo'), async (req, res) => {
        try{
            if(!req.files || req.files.length === 0){
                return res.status(400).send('No files uploaded');
            }

            const uploadedPhotos = [];

            for (const file of req.files){
                const fileStr = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
            
                const uploadResult= await cloudinary.uploader.upload(fileStr, {
                    folder: "gallery",
                    resource_type: "auto",
                    public_id: uuidv4(),
                });
    
                const savedPhoto = await UploadModel.create({
                    photo: uploadResult.secure_url,
                    fileType: file.mimetype,
                    publicId: uploadResult.public_id,
                });
    
                uploadedPhotos.push(savedPhoto);
            }


            res.status(200).json({
                success: true,
                photos: uploadedPhotos,
            });
            } catch (error) {
                console.error("Error uploading files", error);
                res.status(500).send("Error uploading files");
            }

});

router.delete('/delete/:id', async (req, res) => {
    try{
        const file = await UploadModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found"});

        if(!file.publicId){
            console.warn(`File ${req.params.id} has no publicId`);
        } else {
            try{
                await cloudinary.uploader.destroy(file.publicId, { resource_type: "auto"});
            } catch (cloudErr) {
                console.error("Cloudinary delete error:", cloudErr)
            }
        }

        await file.deleteOne();

        res.json({ success: true, message: "File deleted successfully"});
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Error deleting file"});
    }
})

module.exports = router;