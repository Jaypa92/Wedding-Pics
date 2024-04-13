const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const uri = "mongodb+srv://Jaypa92:Iamjaypa92@cluster0.ivw7cmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;"
require("dotenv").config()

const UploadRoute = require('./routes/uploadRoute');

const app = express();


app.use(cookieParser());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(uri);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb');
});

db.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
});

app.use(UploadRoute);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})

const User = mongoose.model('User', {
    userId: String,
    lastVisit: Date,
});

app.use(async (req, res, next) => {
    const userId = req.cookies.userId || createUserId();

    await User.findOneAndUpdate({userId}, {lastVisit: new Date()}, {upsert: true} );
    res.cookie('userId', userId, {maxAge: 900000, httpOnly: true});

    next();
});

function createUserId(){
    return Math.random().toString(36).substring(7);
}