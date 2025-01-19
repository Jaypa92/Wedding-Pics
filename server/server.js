const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
require("dotenv").config()
const uri = process.env.MONGO_URI;
require("dotenv").config()
const path = require('path')

const UploadRoute = require('./routes/uploadRoute');

const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(UploadRoute);
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));
app.use(express.static(path.join(__dirname, '../client/build')))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../client/build","index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
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

mongoose.connect(uri);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb');
});

db.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})
