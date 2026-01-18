const express = require("express");
const connectDB = require("./config/mongoose.config");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
require("dotenv").config()
const path = require('path')
const { v2: cloudinary } = require("cloudinary");

const UploadRoute = require('./routes/uploadRoute');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://wedding-pics.vercel.app",
        "https://wedding-pics-git-main-justins-projects-dbee8e72.vercel.app",
        "https://wedding-pics-gray.vercel.app",
    ],
    credentials: true
}));

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

connectDB();

const User = mongoose.model('User', {
    userId: String,
    lastVisit: Date,
});

app.use(async (req, res, next) => {
    try {
        const userId = req.cookies.userId || createUserId();

        await User.findOneAndUpdate(
            { userId },
            { lastVisit: new Date() },
            { upsert: true }
        );
        res.cookie('userId', userId, {
            maxAge: 900000,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });
    } catch (err) {
        console.error("User tracking error:", err);
    }

    next();
});

function createUserId() {
    return Math.random().toString(36).substring(7);
}

app.use("/api/upload", UploadRoute);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})
